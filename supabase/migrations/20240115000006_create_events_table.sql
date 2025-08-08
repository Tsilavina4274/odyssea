-- Créer le type enum pour les types d'événement
CREATE TYPE event_type AS ENUM (
    'open_day', 'conference', 'webinar', 'deadline', 'exam', 'interview', 'other'
);

-- Créer la table des événements
CREATE TABLE IF NOT EXISTS public.events (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    event_type event_type NOT NULL,
    start_date TIMESTAMP WITH TIME ZONE NOT NULL,
    end_date TIMESTAMP WITH TIME ZONE,
    location TEXT,
    is_online BOOLEAN DEFAULT false,
    meeting_url TEXT,
    max_participants INTEGER,
    current_participants INTEGER DEFAULT 0,
    organizer_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    university_id UUID REFERENCES public.universities(id),
    formation_id UUID REFERENCES public.formations(id),
    is_public BOOLEAN DEFAULT true,
    registration_required BOOLEAN DEFAULT false,
    registration_deadline TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Créer la table des inscriptions aux événements
CREATE TABLE IF NOT EXISTS public.event_registrations (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    event_id UUID REFERENCES public.events(id) ON DELETE CASCADE,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    registered_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    status VARCHAR(20) DEFAULT 'registered', -- registered, attended, cancelled
    UNIQUE(event_id, user_id)
);

-- Index pour les performances
CREATE INDEX idx_events_start_date ON public.events(start_date);
CREATE INDEX idx_events_organizer_id ON public.events(organizer_id);
CREATE INDEX idx_events_university_id ON public.events(university_id);
CREATE INDEX idx_events_type ON public.events(event_type);
CREATE INDEX idx_events_is_public ON public.events(is_public);
CREATE INDEX idx_event_registrations_event_id ON public.event_registrations(event_id);
CREATE INDEX idx_event_registrations_user_id ON public.event_registrations(user_id);

-- Activer Row Level Security
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.event_registrations ENABLE ROW LEVEL SECURITY;

-- Politiques pour les événements
CREATE POLICY "Public events are viewable by everyone" 
ON public.events FOR SELECT 
USING (is_public = true);

CREATE POLICY "Users can view events they organize" 
ON public.events FOR SELECT 
USING (organizer_id = auth.uid());

CREATE POLICY "Universities can view their events" 
ON public.events FOR SELECT 
USING (
    university_id IN (
        SELECT u.id FROM universities u, profiles p 
        WHERE p.user_id = auth.uid() 
        AND p.institution = u.name 
        AND p.user_type = 'universite'
    )
);

CREATE POLICY "Users can create events" 
ON public.events FOR INSERT 
WITH CHECK (organizer_id = auth.uid());

CREATE POLICY "Users can update their events" 
ON public.events FOR UPDATE 
USING (organizer_id = auth.uid());

-- Politiques pour les inscriptions
CREATE POLICY "Users can view registrations for events they organize" 
ON public.event_registrations FOR SELECT 
USING (
    event_id IN (
        SELECT id FROM events WHERE organizer_id = auth.uid()
    )
);

CREATE POLICY "Users can view their own registrations" 
ON public.event_registrations FOR SELECT 
USING (user_id = auth.uid());

CREATE POLICY "Users can register for events" 
ON public.event_registrations FOR INSERT 
WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can cancel their registrations" 
ON public.event_registrations FOR UPDATE 
USING (user_id = auth.uid());

-- Triggers
CREATE TRIGGER update_events_updated_at BEFORE UPDATE ON public.events
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Fonction pour gérer les inscriptions aux événements
CREATE OR REPLACE FUNCTION handle_event_registration()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'INSERT' THEN
        -- Incrémenter le nombre de participants
        UPDATE events 
        SET current_participants = current_participants + 1 
        WHERE id = NEW.event_id;
        
        -- Créer une notification
        INSERT INTO notifications (user_id, type, title, message, related_id)
        VALUES (
            NEW.user_id,
            'event_reminder',
            'Inscription confirmée',
            'Votre inscription à l\'événement a été confirmée',
            NEW.event_id
        );
        
    ELSIF TG_OP = 'DELETE' THEN
        -- Décrémenter le nombre de participants
        UPDATE events 
        SET current_participants = current_participants - 1 
        WHERE id = OLD.event_id;
        
    END IF;
    
    RETURN COALESCE(NEW, OLD);
END;
$$ language 'plpgsql';

CREATE TRIGGER event_registration_management 
    AFTER INSERT OR DELETE ON public.event_registrations
    FOR EACH ROW EXECUTE FUNCTION handle_event_registration();
