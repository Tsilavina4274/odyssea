
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { BarChart3, Users, GraduationCap, FileText, TrendingUp, AlertCircle, Calendar, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import Counter from '@/components/Counter';

const EstablishmentDashboard = () => {
  const { user, isAuthenticated } = useAuth();

  // Redirection si non connecté ou mauvais type
  if (!isAuthenticated || user?.userType !== 'universite') {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="p-6 text-center">
            <h2 className="text-xl font-semibold mb-4">Accès restreint</h2>
            <p className="text-muted-foreground mb-4">
              Cette page est réservée aux établissements partenaires.
            </p>
            <Link to="/login">
              <Button className="odyssea-gradient">Se connecter</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }
  const stats = [
    { label: 'Candidatures reçues', value: 1247, change: '+12%', icon: FileText },
    { label: 'Formations proposées', value: 23, change: '+2', icon: GraduationCap },
    { label: 'Places disponibles', value: 456, change: '-8%', icon: Users },
    { label: 'Taux d\'acceptation', value: 78, change: '+5%', icon: TrendingUp, suffix: '%' },
  ];

  const recentApplications = [
    { id: 1, student: 'Marie Dubois', formation: 'Licence Informatique', status: 'pending', score: 16.5 },
    { id: 2, student: 'Pierre Martin', formation: 'Master IA', status: 'review', score: 18.2 },
    { id: 3, student: 'Sophie Laurent', formation: 'DUT Réseaux', status: 'accepted', score: 17.8 },
    { id: 4, student: 'Thomas Bernard', formation: 'Licence Mathématiques', status: 'pending', score: 15.9 },
  ];

  const formations = [
    { name: 'Licence Informatique', capacity: 120, applications: 340, filled: 85 },
    { name: 'Master Intelligence Artificielle', capacity: 30, applications: 89, filled: 28 },
    { name: 'DUT Réseaux et Télécoms', capacity: 60, applications: 156, filled: 45 },
    { name: 'Licence Mathématiques', capacity: 80, applications: 123, filled: 62 },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'accepted': return 'default';
      case 'pending': return 'secondary';
      case 'review': return 'outline';
      case 'rejected': return 'destructive';
      default: return 'outline';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'accepted': return 'Accepté';
      case 'pending': return 'En attente';
      case 'review': return 'En révision';
      case 'rejected': return 'Refusé';
      default: return status;
    }
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Tableau de Bord Établissement</h1>
          <p className="text-muted-foreground">
            {user?.institution} - Vue d'ensemble des admissions
          </p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Calendar className="h-4 w-4 mr-2" />
            Calendrier
          </Button>
          <Button variant="outline">
            <Settings className="h-4 w-4 mr-2" />
            Paramètres
          </Button>
        </div>
      </div>

      {/* Statistiques principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.label}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                <Counter end={stat.value} suffix={stat.suffix} />
              </div>
              <p className="text-xs text-muted-foreground">
                {stat.change} par rapport au mois dernier
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
          <TabsTrigger value="applications">Candidatures récentes</TabsTrigger>
          <TabsTrigger value="formations">Mes formations</TabsTrigger>
          <TabsTrigger value="analytics">Analyses</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Activité récente</CardTitle>
                <CardDescription>Les dernières actions sur votre tableau de bord</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm">15 nouvelles candidatures reçues</p>
                    <p className="text-xs text-muted-foreground">Il y a 2 heures</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm">Commission d'admission planifiée</p>
                    <p className="text-xs text-muted-foreground">Il y a 4 heures</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm">8 étudiants ont confirmé leur inscription</p>
                    <p className="text-xs text-muted-foreground">Hier</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Alertes importantes</CardTitle>
                <CardDescription>Points nécessitant votre attention</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start space-x-3 p-3 bg-orange-50 rounded-lg">
                  <AlertCircle className="h-4 w-4 text-orange-500 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Date limite approche</p>
                    <p className="text-xs text-muted-foreground">
                      La commission d'admission doit se réunir avant le 15 mars
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
                  <AlertCircle className="h-4 w-4 text-blue-500 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Formations presque complètes</p>
                    <p className="text-xs text-muted-foreground">
                      3 formations ont atteint plus de 90% de leur capacité
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="applications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Candidatures récentes</CardTitle>
              <CardDescription>Les dernières candidatures reçues</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentApplications.map((app) => (
                  <div key={app.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <h4 className="font-medium">{app.student}</h4>
                      <p className="text-sm text-muted-foreground">{app.formation}</p>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <p className="text-sm font-medium">{app.score}/20</p>
                        <p className="text-xs text-muted-foreground">Score</p>
                      </div>
                      <Badge variant={getStatusColor(app.status)}>
                        {getStatusLabel(app.status)}
                      </Badge>
                      <Button size="sm" variant="outline">
                        Examiner
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="formations" className="space-y-4">
          <div className="grid gap-4">
            {formations.map((formation, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{formation.name}</CardTitle>
                      <CardDescription>
                        {formation.applications} candidatures pour {formation.capacity} places
                      </CardDescription>
                    </div>
                    <Button size="sm" variant="outline">
                      Gérer
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span>Places occupées</span>
                      <span>{formation.filled}/{formation.capacity}</span>
                    </div>
                    <Progress value={(formation.filled / formation.capacity) * 100} />
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>Taux de remplissage: {Math.round((formation.filled / formation.capacity) * 100)}%</span>
                      <span>Ratio: {(formation.applications / formation.capacity).toFixed(1)}/1</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Évolution des candidatures</CardTitle>
                <CardDescription>Nombre de candidatures par mois</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center text-muted-foreground">
                  Graphique des candidatures (à implémenter avec Recharts)
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Répartition par formation</CardTitle>
                <CardDescription>Distribution des candidatures</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center text-muted-foreground">
                  Graphique en secteurs (à implémenter avec Recharts)
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EstablishmentDashboard;
