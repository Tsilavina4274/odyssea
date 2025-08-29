-- Ajouter les politiques RLS complexes après que toutes les tables soient créées

-- Politique pour permettre la modification des universités aux utilisateurs université
CREATE POLICY "Universities can be updated by their owners" 
ON public.universities FOR UPDATE 
USING (auth.uid() IN (
    SELECT user_id FROM public.profiles 
    WHERE institution = universities.name 
    AND user_type = 'universite'
));

-- Politique pour permettre la modification des formations aux universités propriétaires
CREATE POLICY "Formations can be managed by university owners" 
ON public.formations FOR ALL 
USING (
    university_id IN (
        SELECT u.id FROM public.universities u, public.profiles p 
        WHERE p.user_id = auth.uid() 
        AND p.institution = u.name 
        AND p.user_type = 'universite'
    )
);

-- Politique pour que les universités voient les candidatures à leurs formations
CREATE POLICY "Universities can view applications to their formations" 
ON public.applications FOR SELECT 
USING (
    formation_id IN (
        SELECT f.id FROM public.formations f, public.universities u, public.profiles p 
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
        SELECT f.id FROM public.formations f, public.universities u, public.profiles p 
        WHERE f.university_id = u.id 
        AND p.user_id = auth.uid() 
        AND p.institution = u.name 
        AND p.user_type = 'universite'
    )
);

-- Politique pour que les admins puissent tout voir (optionnel)
CREATE POLICY "Admins can view all universities" 
ON public.universities FOR SELECT 
USING (
    EXISTS (
        SELECT 1 FROM public.profiles 
        WHERE user_id = auth.uid() 
        AND user_type = 'admin'
    )
);

CREATE POLICY "Admins can manage all universities" 
ON public.universities FOR ALL 
USING (
    EXISTS (
        SELECT 1 FROM public.profiles 
        WHERE user_id = auth.uid() 
        AND user_type = 'admin'
    )
);
