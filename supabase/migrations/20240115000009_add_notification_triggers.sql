-- Ajouter les triggers de notification après que toutes les tables soient créées

-- Fonction pour envoyer une notification quand le statut d'une application change
CREATE OR REPLACE FUNCTION notify_application_status_change()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.status != OLD.status THEN
        INSERT INTO public.notifications (user_id, type, title, message, related_id)
        VALUES (
            NEW.student_id,
            'application_update',
            'Mise à jour de candidature',
            'Le statut de votre candidature a changé: ' || NEW.status,
            NEW.id
        );
    END IF;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger pour les notifications de changement de statut d'application
DROP TRIGGER IF EXISTS application_status_notification ON public.applications;
CREATE TRIGGER application_status_notification AFTER UPDATE ON public.applications
    FOR EACH ROW EXECUTE FUNCTION notify_application_status_change();

-- Fonction pour nettoyer les anciennes notifications (optionnel)
CREATE OR REPLACE FUNCTION cleanup_old_notifications()
RETURNS void AS $$
BEGIN
    DELETE FROM public.notifications 
    WHERE created_at < NOW() - INTERVAL '90 days';
END;
$$ language 'plpgsql';
