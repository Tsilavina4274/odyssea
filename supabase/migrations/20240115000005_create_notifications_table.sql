-- Créer le type enum pour les types de notification
CREATE TYPE notification_type AS ENUM (
    'message', 'application_update', 'event_reminder', 'system', 'reminder'
);

-- Créer le type enum pour la priorité
CREATE TYPE notification_priority AS ENUM ('low', 'medium', 'high');

-- Créer la table des notifications
CREATE TABLE IF NOT EXISTS public.notifications (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    type notification_type NOT NULL,
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    priority notification_priority DEFAULT 'medium',
    is_read BOOLEAN DEFAULT false,
    action_url TEXT, -- URL vers l'action liée
    related_id UUID, -- ID de l'entité liée (message, application, etc.)
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    read_at TIMESTAMP WITH TIME ZONE
);

-- Index pour les performances
CREATE INDEX idx_notifications_user_id ON public.notifications(user_id);
CREATE INDEX idx_notifications_is_read ON public.notifications(is_read);
CREATE INDEX idx_notifications_type ON public.notifications(type);
CREATE INDEX idx_notifications_created_at ON public.notifications(created_at);

-- Activer Row Level Security
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

-- Politique pour que les utilisateurs voient leurs notifications
CREATE POLICY "Users can view their own notifications" 
ON public.notifications FOR SELECT 
USING (user_id = auth.uid());

-- Politique pour que les utilisateurs modifient leurs notifications
CREATE POLICY "Users can update their own notifications" 
ON public.notifications FOR UPDATE 
USING (user_id = auth.uid());

-- Politique pour créer des notifications (système)
CREATE POLICY "System can create notifications" 
ON public.notifications FOR INSERT 
WITH CHECK (true);

-- Fonction pour marquer une notification comme lue
CREATE OR REPLACE FUNCTION mark_notification_as_read(notification_id UUID)
RETURNS BOOLEAN AS $$
BEGIN
    UPDATE notifications 
    SET is_read = true, read_at = TIMEZONE('utc'::text, NOW())
    WHERE id = notification_id AND user_id = auth.uid();
    
    RETURN FOUND;
END;
$$ language 'plpgsql' SECURITY DEFINER;

-- Fonction pour marquer toutes les notifications comme lues
CREATE OR REPLACE FUNCTION mark_all_notifications_as_read()
RETURNS INTEGER AS $$
DECLARE
    affected_count INTEGER;
BEGIN
    UPDATE notifications 
    SET is_read = true, read_at = TIMEZONE('utc'::text, NOW())
    WHERE user_id = auth.uid() AND is_read = false;
    
    GET DIAGNOSTICS affected_count = ROW_COUNT;
    RETURN affected_count;
END;
$$ language 'plpgsql' SECURITY DEFINER;
