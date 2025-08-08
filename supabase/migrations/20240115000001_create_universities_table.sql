-- Créer la table des universités
CREATE TABLE IF NOT EXISTS public.universities (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    city VARCHAR(100) NOT NULL,
    address TEXT,
    type VARCHAR(50) DEFAULT 'Public', -- Public, Privé
    website VARCHAR(255),
    email VARCHAR(255),
    phone VARCHAR(50),
    established_year INTEGER,
    student_count INTEGER DEFAULT 0,
    rating DECIMAL(2,1) DEFAULT 0.0,
    image_url TEXT,
    logo_url TEXT,
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    accreditations TEXT[], -- Array de certifications
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Créer un index sur la ville pour les recherches
CREATE INDEX idx_universities_city ON public.universities(city);
CREATE INDEX idx_universities_type ON public.universities(type);

-- Activer Row Level Security
ALTER TABLE public.universities ENABLE ROW LEVEL SECURITY;

-- Politique pour permettre la lecture à tous
CREATE POLICY "Universities are viewable by everyone" 
ON public.universities FOR SELECT 
USING (true);

-- Politique pour permettre la modification aux utilisateurs université
CREATE POLICY "Universities can be updated by their owners" 
ON public.universities FOR UPDATE 
USING (auth.uid() IN (
    SELECT user_id FROM profiles WHERE institution = universities.name AND user_type = 'universite'
));

-- Fonction pour mettre à jour updated_at automatiquement
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = TIMEZONE('utc'::text, NOW());
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger pour la table universities
CREATE TRIGGER update_universities_updated_at BEFORE UPDATE ON public.universities
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
