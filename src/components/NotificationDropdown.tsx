import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { 
  Bell, MessageCircle, FileText, Calendar, 
  Check, Settings, ExternalLink 
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface Notification {
  id: number;
  type: 'message' | 'application' | 'event' | 'system';
  title: string;
  description: string;
  timestamp: string;
  isRead: boolean;
  actionUrl?: string;
}

const NotificationDropdown = () => {
  const [notifications] = useState<Notification[]>([
    {
      id: 1,
      type: 'application',
      title: 'Candidature acceptée',
      description: 'INSA Lyon - Informatique',
      timestamp: '2024-01-15T10:30:00Z',
      isRead: false,
      actionUrl: '/applications'
    },
    {
      id: 2,
      type: 'message',
      title: 'Nouveau message',
      description: 'Marie Dubois vous a envoyé un message',
      timestamp: '2024-01-15T09:15:00Z',
      isRead: false,
      actionUrl: '/messages'
    },
    {
      id: 3,
      type: 'event',
      title: 'Rappel événement',
      description: 'Journée Portes Ouvertes demain',
      timestamp: '2024-01-14T18:00:00Z',
      isRead: true,
      actionUrl: '/calendar'
    }
  ]);

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'message': return <MessageCircle className="w-4 h-4 text-blue-500" />;
      case 'application': return <FileText className="w-4 h-4 text-green-500" />;
      case 'event': return <Calendar className="w-4 h-4 text-purple-500" />;
      default: return <Bell className="w-4 h-4 text-gray-500" />;
    }
  };

  const formatTime = (timestamp: string): string => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHours = diffMs / (1000 * 60 * 60);
    
    if (diffHours < 1) {
      return 'À l\'instant';
    } else if (diffHours < 24) {
      return `Il y a ${Math.floor(diffHours)}h`;
    } else {
      return `Il y a ${Math.floor(diffHours / 24)} jour${Math.floor(diffHours / 24) > 1 ? 's' : ''}`;
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="relative">
          <Bell className="w-5 h-5" />
          {unreadCount > 0 && (
            <Badge 
              className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-500 text-white p-0 flex items-center justify-center text-xs"
            >
              {unreadCount > 99 ? '99+' : unreadCount}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent align="end" className="w-80">
        <DropdownMenuLabel className="flex items-center justify-between">
          <span>Notifications</span>
          {unreadCount > 0 && (
            <Badge variant="secondary" className="text-xs">
              {unreadCount} nouvelle{unreadCount > 1 ? 's' : ''}
            </Badge>
          )}
        </DropdownMenuLabel>
        
        <DropdownMenuSeparator />
        
        <ScrollArea className="max-h-80">
          {notifications.length > 0 ? (
            <div className="space-y-1">
              {notifications.slice(0, 5).map((notification) => (
                <DropdownMenuItem key={notification.id} className="p-3 cursor-pointer">
                  <Link 
                    to={notification.actionUrl || '/notifications'} 
                    className="flex items-start gap-3 w-full"
                  >
                    <div className="mt-0.5">
                      {getTypeIcon(notification.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <p className={`text-sm font-medium truncate ${
                          !notification.isRead ? 'font-semibold' : ''
                        }`}>
                          {notification.title}
                        </p>
                        {!notification.isRead && (
                          <div className="w-2 h-2 bg-blue-500 rounded-full ml-2" />
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground truncate">
                        {notification.description}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {formatTime(notification.timestamp)}
                      </p>
                    </div>
                  </Link>
                </DropdownMenuItem>
              ))}
            </div>
          ) : (
            <div className="p-4 text-center text-sm text-muted-foreground">
              Aucune notification
            </div>
          )}
        </ScrollArea>
        
        <DropdownMenuSeparator />
        
        <div className="p-2 space-y-1">
          <DropdownMenuItem asChild>
            <Link to="/notifications" className="flex items-center gap-2 w-full">
              <ExternalLink className="w-4 h-4" />
              Voir toutes les notifications
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem className="flex items-center gap-2">
            <Check className="w-4 h-4" />
            Marquer tout comme lu
          </DropdownMenuItem>
          <DropdownMenuItem className="flex items-center gap-2">
            <Settings className="w-4 h-4" />
            Paramètres de notifications
          </DropdownMenuItem>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NotificationDropdown;
