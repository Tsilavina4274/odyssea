import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Bell, Check, X, MessageCircle, Calendar, FileText, 
  Star, Clock, AlertCircle, Info, CheckCircle, Users,
  Settings, Filter, MoreVertical, Archive, Trash2
} from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

interface Notification {
  id: number;
  type: 'message' | 'application' | 'event' | 'system' | 'reminder';
  title: string;
  description: string;
  timestamp: string;
  isRead: boolean;
  priority: 'low' | 'medium' | 'high';
  avatar?: string;
  actionUrl?: string;
  sender?: string;
}

const NotificationCenter = () => {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 1,
      type: 'application',
      title: 'Candidature acceptée',
      description: 'Votre candidature à l\'INSA Lyon pour le programme Informatique a été acceptée !',
      timestamp: '2024-01-15T10:30:00Z',
      isRead: false,
      priority: 'high',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100',
      sender: 'INSA Lyon',
      actionUrl: '/applications'
    },
    {
      id: 2,
      type: 'message',
      title: 'Nouveau message de Marie Dubois',
      description: 'Concernant votre candidature en médecine, j\'aimerais programmer un entretien...',
      timestamp: '2024-01-15T09:15:00Z',
      isRead: false,
      priority: 'medium',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100',
      sender: 'Marie Dubois',
      actionUrl: '/messages'
    },
    {
      id: 3,
      type: 'event',
      title: 'Journée Portes Ouvertes demain',
      description: 'N\'oubliez pas la journée portes ouvertes à l\'Université Paris Descartes demain à 14h.',
      timestamp: '2024-01-14T18:00:00Z',
      isRead: true,
      priority: 'medium',
      avatar: 'https://images.unsplash.com/photo-1564981797816-1043664bf78d?w=100',
      sender: 'Université Paris Descartes',
      actionUrl: '/calendar'
    },
    {
      id: 4,
      type: 'reminder',
      title: 'Date limite d\'inscription',
      description: 'Il vous reste 3 jours pour finaliser votre dossier pour l\'École Centrale.',
      timestamp: '2024-01-14T16:00:00Z',
      isRead: false,
      priority: 'high',
      actionUrl: '/applications'
    },
    {
      id: 5,
      type: 'system',
      title: 'Mise à jour de profil requise',
      description: 'Veuillez mettre à jour vos informations personnelles dans votre profil.',
      timestamp: '2024-01-14T12:00:00Z',
      isRead: true,
      priority: 'low',
      actionUrl: '/profile'
    },
    {
      id: 6,
      type: 'message',
      title: 'Message du support Odysséa',
      description: 'Votre demande d\'assistance a été traitée. Consultez notre réponse.',
      timestamp: '2024-01-13T14:30:00Z',
      isRead: true,
      priority: 'medium',
      avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100',
      sender: 'Support Odysséa',
      actionUrl: '/support'
    }
  ]);

  const [selectedFilter, setSelectedFilter] = useState<string>('all');

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'message': return <MessageCircle className="w-4 h-4" />;
      case 'application': return <FileText className="w-4 h-4" />;
      case 'event': return <Calendar className="w-4 h-4" />;
      case 'reminder': return <Clock className="w-4 h-4" />;
      case 'system': return <Settings className="w-4 h-4" />;
      default: return <Bell className="w-4 h-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'message': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'application': return 'bg-green-100 text-green-700 border-green-200';
      case 'event': return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'reminder': return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'system': return 'bg-gray-100 text-gray-700 border-gray-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'high': return <AlertCircle className="w-4 h-4 text-red-500" />;
      case 'medium': return <Info className="w-4 h-4 text-yellow-500" />;
      case 'low': return <CheckCircle className="w-4 h-4 text-green-500" />;
      default: return null;
    }
  };

  const formatTime = (timestamp: string): string => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHours = diffMs / (1000 * 60 * 60);
    const diffDays = diffHours / 24;
    
    if (diffHours < 1) {
      return 'À l\'instant';
    } else if (diffHours < 24) {
      return `Il y a ${Math.floor(diffHours)}h`;
    } else if (diffDays < 7) {
      return `Il y a ${Math.floor(diffDays)} jour${Math.floor(diffDays) > 1 ? 's' : ''}`;
    } else {
      return date.toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit' });
    }
  };

  const markAsRead = (notificationId: number) => {
    setNotifications(prev =>
      prev.map(notif =>
        notif.id === notificationId ? { ...notif, isRead: true } : notif
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(notif => ({ ...notif, isRead: true }))
    );
  };

  const deleteNotification = (notificationId: number) => {
    setNotifications(prev =>
      prev.filter(notif => notif.id !== notificationId)
    );
  };

  const filteredNotifications = notifications.filter(notif => {
    if (selectedFilter === 'all') return true;
    if (selectedFilter === 'unread') return !notif.isRead;
    return notif.type === selectedFilter;
  });

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const NotificationItem = ({ notification }: { notification: Notification }) => (
    <Card 
      className={`transition-all duration-200 hover:shadow-md ${
        !notification.isRead ? 'bg-primary/5 border-l-4 border-l-primary' : ''
      }`}
    >
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          {notification.avatar ? (
            <Avatar className="w-10 h-10">
              <AvatarImage src={notification.avatar} alt={notification.sender} />
              <AvatarFallback>{notification.sender?.charAt(0)}</AvatarFallback>
            </Avatar>
          ) : (
            <div className={`p-2 rounded-lg border ${getTypeColor(notification.type)}`}>
              {getTypeIcon(notification.type)}
            </div>
          )}
          
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between mb-1">
              <h4 className={`font-medium text-sm ${!notification.isRead ? 'font-semibold' : ''}`}>
                {notification.title}
              </h4>
              <div className="flex items-center gap-2 ml-2">
                {getPriorityIcon(notification.priority)}
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => deleteNotification(notification.id)}
                >
                  <X className="w-3 h-3" />
                </Button>
              </div>
            </div>
            
            <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
              {notification.description}
            </p>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-xs">
                  {notification.type}
                </Badge>
                {notification.sender && (
                  <span className="text-xs text-muted-foreground">
                    par {notification.sender}
                  </span>
                )}
              </div>
              
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground">
                  {formatTime(notification.timestamp)}
                </span>
                {!notification.isRead && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 px-2 text-xs"
                    onClick={() => markAsRead(notification.id)}
                  >
                    <Check className="w-3 h-3 mr-1" />
                    Lu
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Bell className="w-6 h-6" />
            Notifications
            {unreadCount > 0 && (
              <Badge className="bg-red-500 text-white">
                {unreadCount}
              </Badge>
            )}
          </h1>
          <p className="text-muted-foreground">
            Restez informé de toutes vos activités
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={markAllAsRead}
            disabled={unreadCount === 0}
          >
            <CheckCircle className="w-4 h-4 mr-2" />
            Tout marquer comme lu
          </Button>
          <Button variant="outline" size="sm">
            <Settings className="w-4 h-4 mr-2" />
            Paramètres
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Tabs value={selectedFilter} onValueChange={setSelectedFilter}>
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="all">
            Toutes ({notifications.length})
          </TabsTrigger>
          <TabsTrigger value="unread">
            Non lues ({unreadCount})
          </TabsTrigger>
          <TabsTrigger value="message">
            Messages
          </TabsTrigger>
          <TabsTrigger value="application">
            Candidatures
          </TabsTrigger>
          <TabsTrigger value="event">
            Événements
          </TabsTrigger>
          <TabsTrigger value="system">
            Système
          </TabsTrigger>
        </TabsList>

        <TabsContent value={selectedFilter} className="mt-6">
          <div className="space-y-4 group">
            {filteredNotifications.length > 0 ? (
              filteredNotifications.map((notification) => (
                <NotificationItem key={notification.id} notification={notification} />
              ))
            ) : (
              <div className="text-center py-12">
                <Bell className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Aucune notification</h3>
                <p className="text-muted-foreground">
                  Vous êtes à jour ! Aucune notification pour le moment.
                </p>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default NotificationCenter;
