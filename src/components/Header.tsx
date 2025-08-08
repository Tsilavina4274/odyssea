import { Button } from '@/components/ui/button';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Bell, User, Menu, LogOut, MessageCircle } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { AppNavigationMenu } from './NavigationMenu';
import { UserProfile } from './UserProfile';
import NotificationDropdown from './NotificationDropdown';

const Header = () => {
  const location = useLocation();
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogout = () => {
    logout();
    navigate('/');
    toast({
      title: "Déconnexion",
      description: "Vous avez été déconnecté avec succès.",
    });
  };

  const getPageTitle = () => {
    switch (location.pathname) {
      case '/':
        return 'Accueil';
      case '/profile':
        return 'Mon Profil';
      case '/applications':
        return 'Mes Candidatures';
      case '/calendar':
        return 'Calendrier';
      case '/universities':
        return 'Universités';
      case '/dashboard':
        return 'Tableau de Bord';
      case '/search-university':
        return 'Recherche de Formations';
      case '/create-application':
        return 'Créer une Candidature';
      case '/track-applications':
        return 'Suivi des Candidatures';
      case '/messages':
        return 'Messages';
      case '/notifications':
        return 'Notifications';
      case '/study-resources':
        return 'Ressources d\'étude';
      case '/online-assistance':
        return 'Assistance en Ligne';
      case '/orientation-guide':
        return 'Guide d\'Orientation';
      case '/blog':
        return 'Blog';
      case '/establishment-dashboard':
        return 'Tableau de Bord Établissement';
      case '/manage-formations':
        return 'Gestion des Formations';
      case '/received-applications':
        return 'Candidatures Reçues';
      case '/evaluations':
        return 'Évaluations';
      case '/statistics':
        return 'Statistiques';
      case '/admin-dashboard':
        return 'Administration';
      case '/user-management':
        return 'Gestion des Utilisateurs';
      case '/moderation':
        return 'Modération';
      case '/reports':
        return 'Rapports';
      case '/support':
        return 'Support';
      case '/gdpr':
        return 'RGPD';
      default:
        return 'Odysséa';
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center justify-between px-6">
        {/* Trigger de la sidebar et titre */}
        <div className="flex items-center space-x-4">
          <SidebarTrigger />

          <div className="hidden md:block">
            <h2 className="text-lg font-semibold">
              {getPageTitle()}
            </h2>
          </div>
        </div>

        {/* Actions à droite */}
        <div className="flex items-center space-x-3">
          {isAuthenticated && (
            <>
              <Link to="/messages">
                <Button variant="ghost" size="sm" className="relative">
                  <MessageCircle className="w-5 h-5" />
                </Button>
              </Link>
              <NotificationDropdown />
            </>
          )}

          {isAuthenticated ? (
            <UserProfile />
          ) : (
            <div className="flex items-center space-x-2">
              <Link to="/login">
                <Button variant="ghost" size="sm">
                  Connexion
                </Button>
              </Link>
              <Link to="/register">
                <Button size="sm" className="odyssea-gradient">
                  Inscription
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
