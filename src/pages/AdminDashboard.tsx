
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Shield, Users, Building2, FileText, AlertTriangle, Settings, Database, BarChart3 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import Counter from '@/components/Counter';

const AdminDashboard = () => {
  const { user, isAuthenticated } = useAuth();

  // Redirection si non connecté ou pas admin (simulé)
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="p-6 text-center">
            <h2 className="text-xl font-semibold mb-4">Accès administrateur requis</h2>
            <p className="text-muted-foreground mb-4">
              Cette page est réservée aux administrateurs de la plateforme.
            </p>
            <Link to="/login">
              <Button className="odyssea-gradient">Se connecter</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }
  const platformStats = [
    { label: 'Utilisateurs totaux', value: 15687, change: '+234', icon: Users },
    { label: 'Établissements', value: 145, change: '+5', icon: Building2 },
    { label: 'Candidatures totales', value: 89456, change: '+1.2k', icon: FileText },
    { label: 'Alertes actives', value: 8, change: '-2', icon: AlertTriangle },
  ];

  const recentAlerts = [
    { id: 1, type: 'security', message: 'Tentative de connexion suspecte détectée', severity: 'high', time: '2 min' },
    { id: 2, type: 'system', message: 'Maintenance programmée ce soir à 22h', severity: 'medium', time: '1h' },
    { id: 3, type: 'user', message: '15 nouveaux comptes créés aujourd\'hui', severity: 'low', time: '3h' },
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'destructive';
      case 'medium': return 'secondary';
      case 'low': return 'outline';
      default: return 'outline';
    }
  };

  const getSeverityLabel = (severity: string) => {
    switch (severity) {
      case 'high': return 'Critique';
      case 'medium': return 'Moyen';
      case 'low': return 'Faible';
      default: return severity;
    }
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Administration Odysséa</h1>
          <p className="text-muted-foreground">
            Gestion globale de la plateforme
          </p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Database className="h-4 w-4 mr-2" />
            Sauvegarde
          </Button>
          <Button variant="outline">
            <Settings className="h-4 w-4 mr-2" />
            Configuration
          </Button>
        </div>
      </div>

      {/* Statistiques de la plateforme */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {platformStats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.label}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                <Counter end={stat.value} />
              </div>
              <p className="text-xs text-muted-foreground">
                {stat.change} aujourd'hui
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
          <TabsTrigger value="users">Utilisateurs</TabsTrigger>
          <TabsTrigger value="establishments">Établissements</TabsTrigger>
          <TabsTrigger value="moderation">Modération</TabsTrigger>
          <TabsTrigger value="reports">Rapports</TabsTrigger>
          <TabsTrigger value="system">Système</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Alertes récentes</CardTitle>
                <CardDescription>Événements nécessitant votre attention</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {recentAlerts.map((alert) => (
                  <div key={alert.id} className="flex items-start justify-between p-3 border rounded-lg">
                    <div className="flex-1">
                      <p className="text-sm font-medium">{alert.message}</p>
                      <p className="text-xs text-muted-foreground">Il y a {alert.time}</p>
                    </div>
                    <Badge variant={getSeverityColor(alert.severity)} className="ml-2">
                      {getSeverityLabel(alert.severity)}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Activité système</CardTitle>
                <CardDescription>Performance et utilisation</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Charge serveur</span>
                    <span>65%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '65%' }}></div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Utilisation base de données</span>
                    <span>78%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: '78%' }}></div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Bande passante</span>
                    <span>45%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-orange-500 h-2 rounded-full" style={{ width: '45%' }}></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="users" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Gestion des utilisateurs</CardTitle>
                  <CardDescription>Rechercher et gérer les comptes utilisateurs</CardDescription>
                </div>
                <Button>Nouvel utilisateur</Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex space-x-4 mb-4">
                <Input placeholder="Rechercher un utilisateur..." className="flex-1" />
                <Select>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tous</SelectItem>
                    <SelectItem value="candidate">Candidats</SelectItem>
                    <SelectItem value="establishment">Établissements</SelectItem>
                    <SelectItem value="admin">Administrateurs</SelectItem>
                  </SelectContent>
                </Select>
                <Button>Rechercher</Button>
              </div>
              
              <div className="space-y-2">
                {[
                  { name: 'Jean Dupont', email: 'jean.dupont@email.com', type: 'Candidat', status: 'Actif' },
                  { name: 'Université Paris-Saclay', email: 'contact@u-psud.fr', type: 'Établissement', status: 'Actif' },
                  { name: 'Marie Martin', email: 'marie.martin@admin.fr', type: 'Admin', status: 'Actif' },
                ].map((user, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex-1">
                      <h4 className="font-medium">{user.name}</h4>
                      <p className="text-sm text-muted-foreground">{user.email}</p>
                    </div>
                    <div className="flex items-center space-x-4">
                      <Badge variant="outline">{user.type}</Badge>
                      <Badge variant="default">{user.status}</Badge>
                      <Button size="sm" variant="outline">Modifier</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="establishments" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Établissements partenaires</CardTitle>
              <CardDescription>Gérer les établissements de la plateforme</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { name: 'Université Paris-Saclay', formations: 45, candidates: 2340, status: 'Actif' },
                  { name: 'IUT de Cachan', formations: 12, candidates: 567, status: 'Actif' },
                  { name: 'École Polytechnique', formations: 8, candidates: 1234, status: 'En attente' },
                ].map((establishment, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <h4 className="font-medium">{establishment.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        {establishment.formations} formations • {establishment.candidates} candidatures
                      </p>
                    </div>
                    <div className="flex items-center space-x-4">
                      <Badge variant={establishment.status === 'Actif' ? 'default' : 'secondary'}>
                        {establishment.status}
                      </Badge>
                      <Button size="sm" variant="outline">Gérer</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="moderation" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Modération de contenu</CardTitle>
              <CardDescription>Gérer les signalements et contenus inappropriés</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">Signalement de profil</p>
                    <p className="text-sm text-muted-foreground">Utilisateur: jean.dupont@email.com</p>
                  </div>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline">Ignorer</Button>
                    <Button size="sm" variant="destructive">Suspendre</Button>
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">Contenu inapproprié</p>
                    <p className="text-sm text-muted-foreground">Formation: "Licence Informatique"</p>
                  </div>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline">Examiner</Button>
                    <Button size="sm" variant="destructive">Supprimer</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Rapports d'activité</CardTitle>
                <CardDescription>Génération de rapports personnalisés</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button className="w-full" variant="outline">
                  Rapport mensuel des admissions
                </Button>
                <Button className="w-full" variant="outline">
                  Statistiques d'utilisation
                </Button>
                <Button className="w-full" variant="outline">
                  Rapport de sécurité
                </Button>
                <Button className="w-full" variant="outline">
                  Analyse des performances
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Analytics</CardTitle>
                <CardDescription>Métriques de la plateforme</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center text-muted-foreground">
                  Graphiques d'analytics (à implémenter avec Recharts)
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="system" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Configuration système</CardTitle>
                <CardDescription>Paramètres globaux de la plateforme</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button className="w-full" variant="outline">
                  Gestion des calendriers
                </Button>
                <Button className="w-full" variant="outline">
                  Paramètres d'authentification
                </Button>
                <Button className="w-full" variant="outline">
                  Configuration des notifications
                </Button>
                <Button className="w-full" variant="outline">
                  Maintenance programmée
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Logs système</CardTitle>
                <CardDescription>Journal des événements</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm font-mono">
                  <div className="p-2 bg-muted rounded">
                    [2024-01-15 14:30] User login: admin@odyssea.fr
                  </div>
                  <div className="p-2 bg-muted rounded">
                    [2024-01-15 14:25] Database backup completed
                  </div>
                  <div className="p-2 bg-muted rounded">
                    [2024-01-15 14:20] New application received
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminDashboard;
