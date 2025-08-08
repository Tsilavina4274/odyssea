
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle, AlertTriangle, Clock, Eye, Edit, Trash2 } from 'lucide-react';

interface Application {
  id: number;
  formation: string;
  university: string;
  status: string;
  priority: number;
  submittedAt: string;
  response: string;
}

interface ApplicationCardProps {
  application: Application;
  onConfirm?: (id: number) => void;
  onDecline?: (id: number) => void;
  onEdit?: (id: number) => void;
  onDelete?: (id: number) => void;
  onView?: (id: number) => void;
}

const ApplicationCard = ({ 
  application, 
  onConfirm, 
  onDecline, 
  onEdit, 
  onDelete, 
  onView 
}: ApplicationCardProps) => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'accepted':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'rejected':
        return <XCircle className="h-4 w-4 text-red-500" />;
      case 'waiting':
        return <AlertTriangle className="h-4 w-4 text-orange-500" />;
      case 'pending':
        return <Clock className="h-4 w-4 text-blue-500" />;
      default:
        return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'accepted':
        return 'Accepté';
      case 'rejected':
        return 'Refusé';
      case 'waiting':
        return 'Liste d\'attente';
      case 'pending':
        return 'En attente';
      default:
        return 'Inconnu';
    }
  };

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'accepted':
        return 'default';
      case 'rejected':
        return 'destructive';
      case 'waiting':
        return 'secondary';
      case 'pending':
        return 'outline';
      default:
        return 'outline';
    }
  };

  const getCardClassName = (status: string) => {
    switch (status) {
      case 'accepted':
        return 'border-green-200 bg-green-50';
      case 'rejected':
        return 'border-red-200 bg-red-50';
      case 'waiting':
        return 'border-orange-200 bg-orange-50';
      default:
        return 'hover:shadow-md transition-shadow';
    }
  };

  return (
    <Card className={getCardClassName(application.status)}>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg">{application.formation}</CardTitle>
            <CardDescription>{application.university}</CardDescription>
          </div>
          <div className="flex items-center space-x-2">
            <Badge variant={getStatusVariant(application.status)}>
              {getStatusIcon(application.status)}
              <span className="ml-1">{getStatusLabel(application.status)}</span>
            </Badge>
            <Badge variant="outline">Vœu #{application.priority}</Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="text-sm text-muted-foreground">
            Candidature soumise le {new Date(application.submittedAt).toLocaleDateString('fr-FR')}
          </div>
          
          <div className="p-3 bg-muted rounded-lg">
            <p className="text-sm">{application.response}</p>
          </div>

          <div className="flex justify-between items-center">
            <div className="flex space-x-2">
              {onView && (
                <Button size="sm" variant="outline" onClick={() => onView(application.id)}>
                  <Eye className="h-4 w-4 mr-1" />
                  Détails
                </Button>
              )}
              {onEdit && (
                <Button size="sm" variant="outline" onClick={() => onEdit(application.id)}>
                  <Edit className="h-4 w-4 mr-1" />
                  Modifier
                </Button>
              )}
              {application.status === 'pending' && onDelete && (
                <Button size="sm" variant="outline" onClick={() => onDelete(application.id)}>
                  <Trash2 className="h-4 w-4 mr-1" />
                  Supprimer
                </Button>
              )}
            </div>
            
            {application.status === 'accepted' && onConfirm && onDecline && (
              <div className="flex space-x-2">
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => onDecline(application.id)}
                >
                  Décliner
                </Button>
                <Button 
                  size="sm"
                  onClick={() => onConfirm(application.id)}
                >
                  Confirmer
                </Button>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ApplicationCard;
