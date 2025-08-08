import { supabase } from '../client';

export type NotificationType = 'message' | 'application_update' | 'event_reminder' | 'system' | 'reminder';
export type NotificationPriority = 'low' | 'medium' | 'high';

export interface Notification {
  id: string;
  user_id: string;
  type: NotificationType;
  title: string;
  message: string;
  priority: NotificationPriority;
  is_read: boolean;
  action_url?: string;
  related_id?: string;
  created_at: string;
  read_at?: string;
}

class NotificationsService {
  // Obtenir les notifications d'un utilisateur
  async getUserNotifications(userId: string, filters?: {
    isRead?: boolean;
    type?: NotificationType;
    limit?: number;
    offset?: number;
  }) {
    let query = supabase
      .from('notifications')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (filters?.isRead !== undefined) {
      query = query.eq('is_read', filters.isRead);
    }

    if (filters?.type) {
      query = query.eq('type', filters.type);
    }

    if (filters?.limit) {
      const offset = filters.offset || 0;
      query = query.range(offset, offset + filters.limit - 1);
    }

    const { data, error } = await query;
    return { data, error };
  }

  // Obtenir le nombre de notifications non lues
  async getUnreadCount(userId: string) {
    const { count, error } = await supabase
      .from('notifications')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', userId)
      .eq('is_read', false);

    return { count: count || 0, error };
  }

  // Marquer une notification comme lue
  async markAsRead(notificationId: string) {
    const { data, error } = await supabase
      .rpc('mark_notification_as_read', { notification_id: notificationId });

    return { data, error };
  }

  // Marquer toutes les notifications comme lues
  async markAllAsRead(userId: string) {
    const { data, error } = await supabase
      .rpc('mark_all_notifications_as_read');

    return { data, error };
  }

  // Créer une nouvelle notification
  async createNotification(notification: {
    user_id: string;
    type: NotificationType;
    title: string;
    message: string;
    priority?: NotificationPriority;
    action_url?: string;
    related_id?: string;
  }) {
    const { data, error } = await supabase
      .from('notifications')
      .insert({
        priority: 'medium',
        ...notification,
      })
      .select()
      .single();

    return { data, error };
  }

  // Supprimer une notification
  async deleteNotification(notificationId: string) {
    const { error } = await supabase
      .from('notifications')
      .delete()
      .eq('id', notificationId);

    return { error };
  }

  // Supprimer toutes les notifications lues
  async deleteReadNotifications(userId: string) {
    const { error } = await supabase
      .from('notifications')
      .delete()
      .eq('user_id', userId)
      .eq('is_read', true);

    return { error };
  }

  // Obtenir les notifications par type
  async getNotificationsByType(userId: string, type: NotificationType) {
    const { data, error } = await supabase
      .from('notifications')
      .select('*')
      .eq('user_id', userId)
      .eq('type', type)
      .order('created_at', { ascending: false });

    return { data, error };
  }

  // Obtenir les notifications récentes (dernières 24h)
  async getRecentNotifications(userId: string) {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    const { data, error } = await supabase
      .from('notifications')
      .select('*')
      .eq('user_id', userId)
      .gte('created_at', yesterday.toISOString())
      .order('created_at', { ascending: false });

    return { data, error };
  }

  // Écouter les nouvelles notifications en temps réel
  subscribeToNotifications(userId: string, callback: (notification: Notification) => void) {
    return supabase
      .channel(`notifications:${userId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'notifications',
          filter: `user_id=eq.${userId}`,
        },
        (payload) => {
          callback(payload.new as Notification);
        }
      )
      .subscribe();
  }

  // Créer des notifications système pour tous les utilisateurs d'un type
  async createSystemNotificationForUserType(
    userType: string,
    notification: {
      type: NotificationType;
      title: string;
      message: string;
      priority?: NotificationPriority;
      action_url?: string;
    }
  ) {
    // Obtenir tous les utilisateurs du type spécifié
    const { data: users, error: usersError } = await supabase
      .from('profiles')
      .select('user_id')
      .eq('user_type', userType);

    if (usersError) return { error: usersError };

    // Créer les notifications en lot
    const notifications = users?.map(user => ({
      user_id: user.user_id,
      priority: 'medium' as NotificationPriority,
      ...notification,
    })) || [];

    const { data, error } = await supabase
      .from('notifications')
      .insert(notifications);

    return { data, error };
  }

  // Créer une notification de rappel d'événement
  async createEventReminder(eventId: string, userIds: string[], reminderTime: number = 24) {
    // Obtenir les détails de l'événement
    const { data: event, error: eventError } = await supabase
      .from('events')
      .select('title, start_date')
      .eq('id', eventId)
      .single();

    if (eventError) return { error: eventError };

    const notifications = userIds.map(userId => ({
      user_id: userId,
      type: 'event_reminder' as NotificationType,
      title: 'Rappel d\'événement',
      message: `L'événement "${event.title}" commence dans ${reminderTime} heures`,
      priority: 'medium' as NotificationPriority,
      action_url: `/events/${eventId}`,
      related_id: eventId,
    }));

    const { data, error } = await supabase
      .from('notifications')
      .insert(notifications);

    return { data, error };
  }
}

export const notificationsService = new NotificationsService();
