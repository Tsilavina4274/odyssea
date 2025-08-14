-- Créer le type enum pour le statut des candidatures
CREATE TYPE application_status AS ENUM (
    'draft', 'submitted', 'under_review', 'accepted', 'rejected', 'waitlisted'
);

-- Créer la table des candidatures
CREATE TABLE IF NOT EXISTS public.applications (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    student_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    formation_id UUID REFERENCES public.formations(id) ON DELETE CASCADE,
    status application_status DEFAULT 'draft',
    priority INTEGER DEFAULT 1, -- Ordre de préférence
    motivation_letter TEXT,
    additional_documents TEXT[], -- URLs des documents
    grade_average DECIMAL(4,2), -- Moyenne générale
    submitted_at TIMESTAMP WITH TIME ZONE,
    reviewed_at TIMESTAMP WITH TIME ZONE,
    reviewer_id UUID REFERENCES auth.users(id),
    review_notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    UNIQUE(student_id, formation_id) -- Un étudiant ne peut candidater qu'une fois par formation
);

-- Index pour les performances
CREATE INDEX idx_applications_student_id ON public.applications(student_id);
CREATE INDEX idx_applications_formation_id ON public.applications(formation_id);
CREATE INDEX idx_applications_status ON public.applications(status);
CREATE INDEX idx_applications_submitted_at ON public.applications(submitted_at);

-- Activer Row Level Security
ALTER TABLE public.applications ENABLE ROW LEVEL SECURITY;

-- Politique pour que les étudiants voient leurs candidatures
CREATE POLICY "Students can view their own applications" 
ON public.applications FOR SELECT 
USING (student_id = auth.uid());

-- Politique pour que les étudiants créent/modifient leurs candidatures
CREATE POLICY "Students can manage their own applications" 
ON public.applications FOR ALL 
USING (student_id = auth.uid());

-- Politique pour que les universités voient les candidatures à leurs formations
CREATE POLICY "Universities can view applications to their formations" 
ON public.applications FOR SELECT 
USING (
    formation_id IN (
        SELECT f.id FROM formations f, universities u, profiles p 
        WHERE f.university_id = u.id 
        AND p.user_id = auth.uid() 
        AND p.institution = u.name 
        AND p.user_type = 'universite'
    )
);

-- Politique pour que les universités modifient les candidatures à leurs formations
CREATE POLICY "Universities can update applications to their formations" 
ON public.applications FOR UPDATE 
USING (
    formation_id IN (
        SELECT f.id FROM formations f, universities u, profiles p 
        WHERE f.university_id = u.id 
        AND p.user_id = auth.uid() 
        AND p.institution = u.name 
        AND p.user_type = 'universite'
    )
);

-- Trigger pour la table applications
CREATE TRIGGER update_applications_updated_at BEFORE UPDATE ON public.applications
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Note: Le trigger pour les notifications sera ajouté après la création de la table notifications
