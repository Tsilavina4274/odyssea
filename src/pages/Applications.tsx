
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import ApplicationForm from '@/components/ApplicationForm';
import ApplicationCard from '@/components/ApplicationCard';

const Applications = () => {
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [applications, setApplications] = useState([
    {
      id: 1,
      formation: "Licence Informatique",
      university: "Université Paris-Saclay",
      status: "accepted",
      priority: 1,
      submittedAt: "2024-01-15",
      response: "Félicitations ! Votre candidature a été acceptée.",
    },
    {
      id: 2,
      formation: "DUT Génie Électrique",
      university: "IUT de Cachan",
      status: "waiting",
      priority: 2,
      submittedAt: "2024-01-12",
      response: "Votre candidature est en liste d'attente (Position: 15/120)",
    },
    {
      id: 3,
      formation: "BTS Informatique",
      university: "Lycée Technique Saint-Louis",
      status: "pending",
      priority: 3,
      submittedAt: "2024-01-20",
      response: "En cours d'examen par l'établissement",
    },
    {
      id: 4,
      formation: "Prépa MPSI",
      university: "Lycée Louis-le-Grand",
      status: "rejected",
      priority: 4,
      submittedAt: "2024-01-10",
      response: "Candidature non retenue pour cette session.",
    },
  ]);

  const handleAddApplication = (newApplication: any) => {
    setApplications([...applications, newApplication]);
    setIsDialogOpen(false);
  };

  const handleConfirmAcceptance = (id: number) => {
    setApplications(apps => 
      apps.map(app => 
        app.id === id 
          ? { ...app, status: 'confirmed', response: 'Vous avez confirmé votre inscription pour cette formation.' }
          : app
      )
    );
    toast({
      title: "Candidature confirmée",
      description: "Vous avez confirmé votre acceptation pour cette formation.",
    });
  };

  const handleDeclineOffer = (id: number) => {
    setApplications(apps => 
      apps.map(app => 
        app.id === id 
          ? { ...app, status: 'declined', response: 'Vous avez décliné cette offre d\'admission.' }
          : app
      )
    );
    toast({
      title: "Offre déclinée",
      description: "Vous avez décliné cette offre d'admission.",
    });
  };

  const handleDeleteApplication = (id: number) => {
    setApplications(apps => apps.filter(app => app.id !== id));
    toast({
      title: "Candidature supprimée",
      description: "La candidature a été supprimée avec succès.",
    });
  };

  const handleViewApplication = (id: number) => {
    toast({
      title: "Détails de la candidature",
      description: "Fonctionnalité à implémenter : vue détaillée de la candidature.",
    });
  };

  const handleEditApplication = (id: number) => {
    toast({
      title: "Modification de candidature",
      description: "Fonctionnalité à implémenter : modification de la candidature.",
    });
  };

  const usedSlots = applications.length;
  const maxSlots = 10;

  const filterApplications = (status: string) => {
    if (status === 'all') return applications;
    return applications.filter(app => app.status === status);
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Mes Candidatures</h1>
          <p className="text-muted-foreground">
            Gérez vos candidatures et suivez leur progression
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button disabled={usedSlots >= maxSlots}>
              <Plus className="h-4 w-4 mr-2" />
              Nouvelle candidature
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Nouvelle candidature</DialogTitle>
              <DialogDescription>
                Ajoutez une nouvelle formation à vos vœux
              </DialogDescription>
            </DialogHeader>
            <ApplicationForm 
              onSubmit={handleAddApplication}
              onCancel={() => setIsDialogOpen(false)}
            />
          </DialogContent>
        </Dialog>
      </div>

      {/* Indicateur de progression */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Vos vœux</span>
            <span className="text-sm font-normal text-muted-foreground">
              {usedSlots}/{maxSlots} vœux utilisés
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Progress value={(usedSlots / maxSlots) * 100} className="w-full" />
          <p className="text-sm text-muted-foreground mt-2">
            Vous pouvez formuler jusqu'à {maxSlots} vœux au total
          </p>
        </CardContent>
      </Card>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">Toutes ({applications.length})</TabsTrigger>
          <TabsTrigger value="accepted">
            Acceptées ({filterApplications('accepted').length})
          </TabsTrigger>
          <TabsTrigger value="pending">
            En attente ({filterApplications('pending').length})
          </TabsTrigger>
          <TabsTrigger value="waiting">
            Liste d'attente ({filterApplications('waiting').length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          {applications.map((app) => (
            <ApplicationCard
              key={app.id}
              application={app}
              onConfirm={handleConfirmAcceptance}
              onDecline={handleDeclineOffer}
              onEdit={handleEditApplication}
              onDelete={handleDeleteApplication}
              onView={handleViewApplication}
            />
          ))}
        </TabsContent>

        <TabsContent value="accepted" className="space-y-4">
          {filterApplications('accepted').map((app) => (
            <ApplicationCard
              key={app.id}
              application={app}
              onConfirm={handleConfirmAcceptance}
              onDecline={handleDeclineOffer}
            />
          ))}
        </TabsContent>

        <TabsContent value="pending" className="space-y-4">
          {filterApplications('pending').map((app) => (
            <ApplicationCard
              key={app.id}
              application={app}
              onEdit={handleEditApplication}
              onDelete={handleDeleteApplication}
              onView={handleViewApplication}
            />
          ))}
        </TabsContent>

        <TabsContent value="waiting" className="space-y-4">
          {filterApplications('waiting').map((app) => (
            <ApplicationCard
              key={app.id}
              application={app}
              onView={handleViewApplication}
            />
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Applications;
