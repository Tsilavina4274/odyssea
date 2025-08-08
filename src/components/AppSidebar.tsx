import { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from '@/components/ui/sidebar';
import {
  Home,
  Search,
  FileText,
  BarChart3,
  Users,
  Settings,
  HelpCircle,
  User,
  GraduationCap,
  Building2,
  Shield,
  MessageSquare,
  Calendar,
  BookOpen,
  Map,
  Trophy,
  ClipboardList,
  Library,
  MessageCircle,
  Bell,
} from 'lucide-react';

const candidateItems = [
  { title: 'Accueil', url: '/', icon: Home },
  { title: 'Mon Profil', url: '/profile', icon: User },
  { title: 'Rechercher Formations', url: '/search-university', icon: Search },
  { title: 'Mes Candidatures', url: '/applications', icon: FileText },
  { title: 'Suivi Admissions', url: '/track-applications', icon: BarChart3 },
  { title: 'Messages', url: '/messages', icon: MessageCircle },
  { title: 'Ressources', url: '/study-resources', icon: Library },
  { title: 'Calendrier', url: '/calendar', icon: Calendar },
  { title: 'Universités', url: '/universities', icon: Building2 },
];

const establishmentItems = [
  { title: 'Tableau de Bord', url: '/establishment-dashboard', icon: BarChart3 },
  { title: 'Mes Formations', url: '/manage-formations', icon: GraduationCap },
  { title: 'Candidatures Reçues', url: '/received-applications', icon: ClipboardList },
  { title: 'Évaluations', url: '/evaluations', icon: Trophy },
  { title: 'Statistiques', url: '/statistics', icon: BarChart3 },
];

const adminItems = [
  { title: 'Administration', url: '/admin-dashboard', icon: Shield },
  { title: 'Gestion Utilisateurs', url: '/user-management', icon: Users },
  { title: 'Modération', url: '/moderation', icon: Settings },
  { title: 'Rapports', url: '/reports', icon: BarChart3 },
];

const commonItems = [
  { title: 'Assistance', url: '/online-assistance', icon: MessageSquare },
  { title: 'Guide', url: '/orientation-guide', icon: BookOpen },
  { title: 'Blog', url: '/blog', icon: Map },
  { title: 'Support', url: '/support', icon: HelpCircle },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const { user, isAuthenticated } = useAuth();
  const [userType, setUserType] = useState<'candidate' | 'establishment' | 'admin'>('candidate');

  // Synchroniser le type d'utilisateur avec l'authentification
  useEffect(() => {
    if (isAuthenticated && user) {
      if (user.userType === 'lyceen') {
        setUserType('candidate');
      } else if (user.userType === 'universite') {
        setUserType('establishment');
      }
    }
  }, [isAuthenticated, user]);

  const isActive = (path: string) => location.pathname === path;

  const getNavClassName = (path: string) => {
    return isActive(path)
      ? 'bg-primary text-primary-foreground'
      : 'hover:bg-muted';
  };

  return (
    <Sidebar className="border-r">
      <SidebarHeader className="p-4">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-lg odyssea-gradient flex items-center justify-center">
            <span className="text-white font-bold text-sm">O</span>
          </div>
          {state === 'expanded' && (
            <span className="text-xl font-bold odyssea-text-gradient">Odysséa</span>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent>
        {/* Sélecteur de type d'utilisateur */}
        <SidebarGroup>
          <SidebarGroupLabel>Type d'utilisateur</SidebarGroupLabel>
          <SidebarGroupContent>
            <div className="flex flex-col space-y-1 p-2">
              <button
                onClick={() => setUserType('candidate')}
                className={`text-left px-2 py-1 rounded text-sm ${
                  userType === 'candidate' ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'
                }`}
              >
                {state === 'expanded' ? 'Candidat' : 'C'}
              </button>
              <button
                onClick={() => setUserType('establishment')}
                className={`text-left px-2 py-1 rounded text-sm ${
                  userType === 'establishment' ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'
                }`}
              >
                {state === 'expanded' ? 'Établissement' : 'E'}
              </button>
              <button
                onClick={() => setUserType('admin')}
                className={`text-left px-2 py-1 rounded text-sm ${
                  userType === 'admin' ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'
                }`}
              >
                {state === 'expanded' ? 'Admin' : 'A'}
              </button>
            </div>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Menu principal selon le type d'utilisateur */}
        {userType === 'candidate' && (
          <SidebarGroup>
            <SidebarGroupLabel>Candidat</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {candidateItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <NavLink to={item.url} className={getNavClassName(item.url)}>
                        <item.icon className="h-4 w-4" />
                        {state === 'expanded' && <span>{item.title}</span>}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}

        {userType === 'establishment' && (
          <SidebarGroup>
            <SidebarGroupLabel>Établissement</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {establishmentItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <NavLink to={item.url} className={getNavClassName(item.url)}>
                        <item.icon className="h-4 w-4" />
                        {state === 'expanded' && <span>{item.title}</span>}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}

        {userType === 'admin' && (
          <SidebarGroup>
            <SidebarGroupLabel>Administration</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {adminItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <NavLink to={item.url} className={getNavClassName(item.url)}>
                        <item.icon className="h-4 w-4" />
                        {state === 'expanded' && <span>{item.title}</span>}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}

        {/* Menu commun */}
        <SidebarGroup>
          <SidebarGroupLabel>Aide & Support</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {commonItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} className={getNavClassName(item.url)}>
                      <item.icon className="h-4 w-4" />
                      {state === 'expanded' && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4">
        <div className="flex items-center justify-between">
          <SidebarTrigger />
          {isAuthenticated && state === 'expanded' && (
            <div className="flex items-center space-x-2">
              <span className="text-sm text-muted-foreground">
                {user?.firstName}
              </span>
            </div>
          )}
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
