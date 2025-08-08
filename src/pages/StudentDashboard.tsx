
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { useAuth } from '@/hooks/useAuth';
import { 
  BookOpen, 
  Calendar, 
  MapPin, 
  Star, 
  TrendingUp, 
  Users, 
  Clock,
  CheckCircle,
  AlertCircle,
  FileText,
  Award
 } from 'lucide-react';
import { Link } from 'react-router-dom';
import Counter from '@/components/Counter';

const StudentDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const { user, isAuthenticated } = useAuth();

  // Redirection si non connecté
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="p-6 text-center">
            <h2 className="text-xl font-semibold mb-4">Accès restreint</h2>
            <p className="text-muted-foreground mb-4">
              Vous devez être connecté pour accéder à cette page.
            </p>
            <Link to="/login">
              <Button className="odyssea-gradient">Se connecter</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  const applications = [
    {
      id: 1,
      university: 'Université Paris Descartes',
      formation: 'Médecine',
      status: 'En cours',
      statusColor: 'bg-yellow-500',
      date: '15 Mars 2024',
      progress: 75
    },
    {
      id: 2,
      university: 'INSA Lyon',
      formation: 'Informatique',
      status: 'Accepté',
      statusColor: 'bg-green-500',
      date: '10 Mars 2024',
      progress: 100
    },
    {
      id: 3,
      university: 'Sorbonne',
      formation: 'Droit',
      status: 'En attente',
      statusColor: 'bg-blue-500',
      date: '20 Mars 2024',
      progress: 50
    }
  ];

  const events = [
    {
      id: 1,
      title: 'Journée Portes Ouvertes - Paris Descartes',
      date: '25 Mars 2024',
      time: '14:00',
      type: 'Portes ouvertes'
    },
    {
      id: 2,
      title: 'Conférence Informatique - INSA Lyon',
      date: '28 Mars 2024',
      time: '10:00',
      type: 'Conférence'
    }
  ];

  const stats = [
    { label: 'Candidatures', value: 3, icon: FileText, color: 'text-blue-600' },
    { label: 'Acceptations', value: 1, icon: CheckCircle, color: 'text-green-600' },
    { label: 'En cours', value: 1, icon: Clock, color: 'text-yellow-600' },
    { label: 'Événements', value: 2, icon: Calendar, color: 'text-purple-600' }
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* En-tête du dashboard */}
        <div className="mb-8 animate-fade-in">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Bonjour, {user?.firstName} {user?.lastName}
          </h1>
          <p className="text-muted-foreground">
            Bienvenue sur votre tableau de bord Odysséa - {user?.institution}
          </p>
        </div>

        {/* Statistiques */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={stat.label} className="hover-lift animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
              <CardContent className="flex items-center p-6">
                <div className={`p-3 rounded-full bg-muted mr-4`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    {stat.label}
                  </p>
                  <p className="text-2xl font-bold">
                    <Counter end={stat.value} duration={1500} />
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
            <TabsTrigger value="applications">Candidatures</TabsTrigger>
            <TabsTrigger value="events">Événements</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Candidatures récentes */}
            <Card className="animate-slide-up">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Candidatures récentes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {applications.slice(0, 2).map((app) => (
                    <div key={app.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                      <div className="flex-1">
                        <h3 className="font-semibold">{app.university}</h3>
                        <p className="text-sm text-muted-foreground">{app.formation}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <div className={`w-2 h-2 rounded-full ${app.statusColor}`}></div>
                          <span className="text-sm">{app.status}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground">{app.date}</p>
                        <Progress value={app.progress} className="w-20 mt-2" />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4">
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => setActiveTab('applications')}
                  >
                    Voir toutes les candidatures
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Événements à venir */}
            <Card className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Événements à venir
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {events.map((event) => (
                    <div key={event.id} className="flex items-center gap-4 p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                      <div className="flex flex-col items-center justify-center w-12 h-12 bg-primary/10 rounded-lg">
                        <span className="text-xs text-primary font-medium">
                          {new Date(event.date).getDate()}
                        </span>
                        <span className="text-xs text-primary">
                          {new Date(event.date).toLocaleDateString('fr-FR', { month: 'short' })}
                        </span>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold">{event.title}</h3>
                        <p className="text-sm text-muted-foreground">{event.time}</p>
                        <Badge variant="outline" className="mt-1">
                          {event.type}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4">
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => setActiveTab('events')}
                  >
                    Voir tous les événements
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="applications" className="space-y-6">
            <Card className="animate-fade-in">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Mes candidatures</CardTitle>
                <Link to="/universities">
                  <Button className="odyssea-gradient">
                    Nouvelle candidature
                  </Button>
                </Link>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {applications.map((app, index) => (
                    <Card key={app.id} className="animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <h3 className="text-lg font-semibold">{app.university}</h3>
                            <p className="text-muted-foreground">{app.formation}</p>
                          </div>
                          <div className="text-right">
                            <div className="flex items-center gap-2 mb-2">
                              <div className={`w-2 h-2 rounded-full ${app.statusColor}`}></div>
                              <span className="font-medium">{app.status}</span>
                            </div>
                            <p className="text-sm text-muted-foreground">{app.date}</p>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Progression</span>
                            <span>{app.progress}%</span>
                          </div>
                          <Progress value={app.progress} />
                        </div>
                        <div className="flex gap-2 mt-4">
                          <Button variant="outline" size="sm">
                            Voir détails
                          </Button>
                          <Button variant="outline" size="sm">
                            Messages
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="events" className="space-y-6">
            <Card className="animate-fade-in">
              <CardHeader>
                <CardTitle>Événements et rendez-vous</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {events.map((event, index) => (
                    <Card key={event.id} className="animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <div className="flex flex-col items-center justify-center w-16 h-16 bg-primary/10 rounded-lg">
                            <span className="text-lg font-bold text-primary">
                              {new Date(event.date).getDate()}
                            </span>
                            <span className="text-sm text-primary">
                              {new Date(event.date).toLocaleDateString('fr-FR', { month: 'short' })}
                            </span>
                          </div>
                          <div className="flex-1">
                            <h3 className="text-lg font-semibold mb-2">{event.title}</h3>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                              <div className="flex items-center gap-1">
                                <Clock className="w-4 h-4" />
                                {event.time}
                              </div>
                              <Badge variant="outline">
                                {event.type}
                              </Badge>
                            </div>
                            <div className="flex gap-2">
                              <Button size="sm" className="odyssea-gradient">
                                S'inscrire
                              </Button>
                              <Button variant="outline" size="sm">
                                Plus d'infos
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default StudentDashboard;
