-- Créer le type enum pour les types de ressource
CREATE TYPE resource_type AS ENUM ('pdf', 'video', 'audio', 'image', 'link', 'document');

-- Créer la table des ressources d'étude
CREATE TABLE IF NOT EXISTS public.study_resources (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    resource_type resource_type NOT NULL,
    category VARCHAR(100) NOT NULL, -- Cours, Exercices, etc.
    subject VARCHAR(100) NOT NULL, -- Mathématiques, Physique, etc.
    file_url TEXT,
    thumbnail_url TEXT,
    file_size BIGINT, -- Taille en bytes
    duration INTEGER, -- Durée en secondes pour les vidéos/audio
    download_count INTEGER DEFAULT 0,
    rating DECIMAL(3,2) DEFAULT 0.0,
    rating_count INTEGER DEFAULT 0,
    uploader_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    university_id UUID REFERENCES public.universities(id),
    formation_id UUID REFERENCES public.formations(id),
    is_public BOOLEAN DEFAULT true,
    is_approved BOOLEAN DEFAULT false,
    tags TEXT[],
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Créer la table des favoris de ressources
CREATE TABLE IF NOT EXISTS public.resource_favorites (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    resource_id UUID REFERENCES public.study_resources(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    UNIQUE(user_id, resource_id)
);

-- Créer la table des évaluations de ressources
CREATE TABLE IF NOT EXISTS public.resource_ratings (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    resource_id UUID REFERENCES public.study_resources(id) ON DELETE CASCADE,
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    comment TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    UNIQUE(user_id, resource_id)
);

-- Index pour les performances
CREATE INDEX idx_study_resources_category ON public.study_resources(category);
CREATE INDEX idx_study_resources_subject ON public.study_resources(subject);
CREATE INDEX idx_study_resources_type ON public.study_resources(resource_type);
CREATE INDEX idx_study_resources_uploader_id ON public.study_resources(uploader_id);
CREATE INDEX idx_study_resources_is_public ON public.study_resources(is_public);
CREATE INDEX idx_study_resources_is_approved ON public.study_resources(is_approved);
CREATE INDEX idx_study_resources_rating ON public.study_resources(rating);
CREATE INDEX idx_resource_favorites_user_id ON public.resource_favorites(user_id);
CREATE INDEX idx_resource_ratings_resource_id ON public.resource_ratings(resource_id);

-- Activer Row Level Security
ALTER TABLE public.study_resources ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.resource_favorites ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.resource_ratings ENABLE ROW LEVEL SECURITY;

-- Politiques pour les ressources
CREATE POLICY "Public approved resources are viewable by everyone" 
ON public.study_resources FOR SELECT 
USING (is_public = true AND is_approved = true);

CREATE POLICY "Users can view their own resources" 
ON public.study_resources FOR SELECT 
USING (uploader_id = auth.uid());

CREATE POLICY "Users can upload resources" 
ON public.study_resources FOR INSERT 
WITH CHECK (uploader_id = auth.uid());

CREATE POLICY "Users can update their own resources" 
ON public.study_resources FOR UPDATE 
USING (uploader_id = auth.uid());

-- Politiques pour les favoris
CREATE POLICY "Users can view their own favorites" 
ON public.resource_favorites FOR SELECT 
USING (user_id = auth.uid());

CREATE POLICY "Users can manage their own favorites" 
ON public.resource_favorites FOR ALL 
USING (user_id = auth.uid());

-- Politiques pour les évaluations
CREATE POLICY "Users can view all ratings" 
ON public.resource_ratings FOR SELECT 
USING (true);

CREATE POLICY "Users can manage their own ratings" 
ON public.resource_ratings FOR ALL 
USING (user_id = auth.uid());

-- Triggers
CREATE TRIGGER update_study_resources_updated_at BEFORE UPDATE ON public.study_resources
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_resource_ratings_updated_at BEFORE UPDATE ON public.resource_ratings
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Fonction pour mettre à jour la note moyenne d'une ressource
CREATE OR REPLACE FUNCTION update_resource_rating()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE study_resources 
    SET 
        rating = (
            SELECT AVG(rating)::DECIMAL(3,2) 
            FROM resource_ratings 
            WHERE resource_id = COALESCE(NEW.resource_id, OLD.resource_id)
        ),
        rating_count = (
            SELECT COUNT(*) 
            FROM resource_ratings 
            WHERE resource_id = COALESCE(NEW.resource_id, OLD.resource_id)
        )
    WHERE id = COALESCE(NEW.resource_id, OLD.resource_id);
    
    RETURN COALESCE(NEW, OLD);
END;
$$ language 'plpgsql';

CREATE TRIGGER update_resource_rating_stats 
    AFTER INSERT OR UPDATE OR DELETE ON public.resource_ratings
    FOR EACH ROW EXECUTE FUNCTION update_resource_rating();

-- Fonction pour incrémenter le compteur de téléchargements
CREATE OR REPLACE FUNCTION increment_download_count(resource_id UUID)
RETURNS BOOLEAN AS $$
BEGIN
    UPDATE study_resources 
    SET download_count = download_count + 1 
    WHERE id = resource_id;
    
    RETURN FOUND;
END;
$$ language 'plpgsql' SECURITY DEFINER;
