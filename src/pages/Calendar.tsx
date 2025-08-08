
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar as CalendarIcon, Clock, AlertCircle, CheckCircle } from 'lucide-react';

const Calendar = () => {
  const events = [
    {
      id: 1,
      title: 'Ouverture des candidatures',
      date: '2024-01-15',
      type: 'deadline',
      description: 'Début de la période de candidature pour toutes les formations',
      status: 'passed'
    },
    {
      id: 2,
      title: 'Date limite candidatures',
      date: '2024-03-14',
      type: 'deadline',
      description: 'Fin de la période de saisie des vœux',
      status: 'upcoming'
    },
    {
      id: 3,
      title: 'Confirmation des vœux',
      date: '2024-04-03',
      type: 'action',
      description: 'Date limite pour confirmer vos vœux',
      status: 'upcoming'
    },
    {
      id: 4,
      title: 'Début des réponses',
      date: '2024-05-30',
      type: 'response',
      description: 'Les établissements commencent à répondre aux candidatures',
      status: 'future'
    },
    {
      id: 5,
      title: 'Phase principale d\'admission',
      date: '2024-06-01',
      type: 'phase',
      description: 'Début de la phase principale d\'admission',
      status: 'future'
    },
    {
      id: 6,
      title: 'Phase complémentaire',
      date: '2024-06-23',
      type: 'phase',
      description: 'Ouverture de la phase complémentaire',
      status: 'future'
    }
  ];

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'deadline':
        return <AlertCircle className="h-4 w-4" />;
      case 'action':
        return <Clock className="h-4 w-4" />;
      case 'response':
        return <CheckCircle className="h-4 w-4" />;
      case 'phase':
        return <CalendarIcon className="h-4 w-4" />;
      default:
        return <CalendarIcon className="h-4 w-4" />;
    }
  };

  const getEventColor = (status: string) => {
    switch (status) {
      case 'passed':
        return 'secondary';
      case 'upcoming':
        return 'destructive';
      case 'future':
        return 'outline';
      default:
        return 'outline';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'passed':
        return 'Passé';
      case 'upcoming':
        return 'Urgent';
      case 'future':
        return 'À venir';
      default:
        return status;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Calendrier des Admissions</h1>
          <p className="text-muted-foreground">
            Suivez toutes les dates importantes de votre processus d'admission
          </p>
        </div>
        <Button>
          <CalendarIcon className="h-4 w-4 mr-2" />
          Exporter
        </Button>
      </div>

      <div className="grid gap-4">
        {events.map((event) => (
          <Card key={event.id} className={`hover:shadow-md transition-shadow ${
            event.status === 'upcoming' ? 'border-red-200 bg-red-50' : ''
          }`}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-full ${
                    event.status === 'passed' ? 'bg-gray-100' :
                    event.status === 'upcoming' ? 'bg-red-100' : 'bg-blue-100'
                  }`}>
                    {getEventIcon(event.type)}
                  </div>
                  <div>
                    <CardTitle className="text-lg">{event.title}</CardTitle>
                    <CardDescription className="text-base">
                      {formatDate(event.date)}
                    </CardDescription>
                  </div>
                </div>
                <Badge variant={getEventColor(event.status)}>
                  {getStatusLabel(event.status)}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{event.description}</p>
              {event.status === 'upcoming' && (
                <div className="mt-4 p-3 bg-orange-50 border border-orange-200 rounded-lg">
                  <p className="text-sm font-medium text-orange-800">
                    ⚠️ Action requise bientôt
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Rappels personnalisés</CardTitle>
          <CardDescription>
            Configurez vos notifications pour ne rien manquer
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Rappels par email</p>
              <p className="text-sm text-muted-foreground">
                Recevoir un email 7 jours avant chaque échéance
              </p>
            </div>
            <Button variant="outline" size="sm">
              Configurer
            </Button>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Notifications push</p>
              <p className="text-sm text-muted-foreground">
                Notifications sur votre appareil mobile
              </p>
            </div>
            <Button variant="outline" size="sm">
              Activer
            </Button>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Synchronisation calendrier</p>
              <p className="text-sm text-muted-foreground">
                Exporter vers Google Calendar ou Outlook
              </p>
            </div>
            <Button variant="outline" size="sm">
              Synchroniser
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Calendar;
