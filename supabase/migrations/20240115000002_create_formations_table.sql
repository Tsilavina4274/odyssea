-- Créer la table des formations
CREATE TABLE IF NOT EXISTS public.formations (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    university_id UUID REFERENCES public.universities(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    level VARCHAR(50) NOT NULL, -- Licence, Master, Doctorat, etc.
    domain VARCHAR(100) NOT NULL, -- Médecine, Informatique, etc.
    duration_years INTEGER NOT NULL,
    total_places INTEGER DEFAULT 0,
    available_places INTEGER DEFAULT 0,
    requirements TEXT,
    admission_criteria TEXT,
    application_deadline DATE,
    tuition_fee DECIMAL(10,2),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Index pour les recherches
CREATE INDEX idx_formations_university_id ON public.formations(university_id);
CREATE INDEX idx_formations_domain ON public.formations(domain);
CREATE INDEX idx_formations_level ON public.formations(level);
CREATE INDEX idx_formations_active ON public.formations(is_active);

-- Activer Row Level Security
ALTER TABLE public.formations ENABLE ROW LEVEL SECURITY;

-- Politique pour permettre la lecture à tous
CREATE POLICY "Formations are viewable by everyone" 
ON public.formations FOR SELECT 
USING (is_active = true);

-- Politique pour permettre la modification aux universités propriétaires
CREATE POLICY "Formations can be managed by university owners" 
ON public.formations FOR ALL 
USING (
    university_id IN (
        SELECT u.id FROM universities u, profiles p 
        WHERE p.user_id = auth.uid() 
        AND p.institution = u.name 
        AND p.user_type = 'universite'
    )
);

-- Trigger pour la table formations
CREATE TRIGGER update_formations_updated_at BEFORE UPDATE ON public.formations
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
