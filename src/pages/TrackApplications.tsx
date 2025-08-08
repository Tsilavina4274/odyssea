import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Clock, CheckCircle, XCircle, AlertCircle, Eye, Download, MessageSquare } from 'lucide-react';

const TrackApplications = () => {
  const [applications] = useState([
    {
      id: 1,
      formation: 'Médecine',
      university: 'Université Paris Descartes',
      status: 'en-cours',
      submittedDate: '2024-01-15',
      progress: 75,
      nextStep: 'Entretien prévu le 25 janvier',
      documents: ['CV', 'Lettre de motivation', 'Relevé de notes']
    },
    {
      id: 2,
      formation: 'Informatique',
      university: 'INSA Lyon',
      status: 'accepte',
      submittedDate: '2024-01-10',
      progress: 100,
      nextStep: 'Inscription confirmée',
      documents: ['CV', 'Lettre de motivation', 'Relevé de notes', 'Portfolio']
    },
    {
      id: 3,
      formation: 'Droit',
      university: 'Université Panthéon-Sorbonne',
      status: 'refuse',
      submittedDate: '2024-01-08',
      progress: 100,
      nextStep: 'Candidature non retenue',
      documents: ['CV', 'Lettre de motivation']
    },
    {
      id: 4,
      formation: 'Commerce',
      university: 'ESSEC Business School',
      status: 'attente',
      submittedDate: '2024-01-20',
      progress: 50,
      nextStep: 'En attente de validation des documents',
      documents: ['CV', 'Lettre de motivation']
    }
  ]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'en-cours':
        return <Clock className="w-4 h-4 text-blue-500" />;
      case 'accepte':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'refuse':
        return <XCircle className="w-4 h-4 text-red-500" />;
      case 'attente':
        return <AlertCircle className="w-4 h-4 text-yellow-500" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'en-cours':
        return <Badge className="bg-blue-100 text-blue-800">En cours</Badge>;
      case 'accepte':
        return <Badge className="bg-green-100 text-green-800">Accepté</Badge>;
      case 'refuse':
        return <Badge className="bg-red-100 text-red-800">Refusé</Badge>;
      case 'attente':
        return <Badge className="bg-yellow-100 text-yellow-800">En attente</Badge>;
      default:
        return <Badge variant="secondary">Inconnu</Badge>;
    }
  };

  const getProgressColor = (status: string) => {
    switch (status) {
      case 'accepte':
        return 'bg-green-500';
      case 'refuse':
        return 'bg-red-500';
      case 'en-cours':
        return 'bg-blue-500';
      case 'attente':
        return 'bg-yellow-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <section className="bg-gradient-to-br from-primary/10 to-purple-100/20 py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4 animate-fade-in">
              Suivre mes candidatures
            </h1>
            <p className="text-xl text-muted-foreground mb-8 animate-slide-up">
              Consulte l'état d'avancement de tes candidatures
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-4xl mx-auto space-y-6">
          {applications.map((application, index) => (
            <Card 
              key={application.id} 
              className="hover:shadow-lg transition-all duration-300 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {getStatusIcon(application.status)}
                    <div>
                      <CardTitle className="text-xl">{application.formation}</CardTitle>
                      <p className="text-muted-foreground">{application.university}</p>
                    </div>
                  </div>
                  {getStatusBadge(application.status)}
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>Soumis le {new Date(application.submittedDate).toLocaleDateString('fr-FR')}</span>
                  <span>{application.nextStep}</span>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>Progression</span>
                    <span>{application.progress}%</span>
                  </div>
                  <Progress value={application.progress} className="h-2" />
                </div>
                
                <div className="space-y-2">
                  <h4 className="font-medium text-sm">Documents soumis :</h4>
                  <div className="flex flex-wrap gap-2">
                    {application.documents.map((doc, docIndex) => (
                      <Badge key={docIndex} variant="outline" className="text-xs">
                        {doc}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div className="flex gap-2 pt-4">
                  <Button variant="outline" size="sm" className="flex items-center gap-1">
                    <Eye className="w-3 h-3" />
                    Voir détails
                  </Button>
                  <Button variant="outline" size="sm" className="flex items-center gap-1">
                    <Download className="w-3 h-3" />
                    Télécharger
                  </Button>
                  <Button variant="outline" size="sm" className="flex items-center gap-1">
                    <MessageSquare className="w-3 h-3" />
                    Contacter
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default TrackApplications;
