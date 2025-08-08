import { supabase } from '../client';

export interface Conversation {
  id: string;
  title?: string;
  is_group: boolean;
  created_by: string;
  created_at: string;
  updated_at: string;
  participants?: ConversationParticipant[];
  last_message?: Message;
  unread_count?: number;
}

export interface ConversationParticipant {
  id: string;
  conversation_id: string;
  user_id: string;
  joined_at: string;
  last_read_at: string;
  user?: {
    id: string;
    first_name?: string;
    last_name?: string;
    avatar_url?: string;
  };
}

export type MessageStatus = 'sending' | 'sent' | 'delivered' | 'read';

export interface Message {
  id: string;
  conversation_id: string;
  sender_id: string;
  content: string;
  message_type: string;
  attachments?: string[];
  status: MessageStatus;
  reply_to?: string;
  created_at: string;
  updated_at: string;
  sender?: {
    id: string;
    first_name?: string;
    last_name?: string;
    avatar_url?: string;
  };
}

class MessagesService {
  // Obtenir les conversations d'un utilisateur
  async getUserConversations(userId: string) {
    const { data, error } = await supabase
      .from('conversations')
      .select(`
        *,
        participants:conversation_participants(
          *,
          user:profiles!user_id(
            user_id,
            first_name,
            last_name,
            avatar_url
          )
        ),
        messages:messages(
          id,
          content,
          created_at,
          sender_id,
          message_type
        )
      `)
      .eq('conversation_participants.user_id', userId)
      .order('updated_at', { ascending: false });

    if (error) return { data: [], error };

    // Traiter les données pour obtenir le dernier message et le nombre de non-lus
    const processedConversations = data?.map(conv => {
      const messages = conv.messages || [];
      const lastMessage = messages.length > 0 ? messages[messages.length - 1] : null;
      
      return {
        ...conv,
        last_message: lastMessage,
        unread_count: 0, // TODO: calculer les non-lus
      };
    }) || [];

    return { data: processedConversations, error: null };
  }

  // Obtenir une conversation par ID
  async getConversationById(conversationId: string) {
    const { data, error } = await supabase
      .from('conversations')
      .select(`
        *,
        participants:conversation_participants(
          *,
          user:profiles!user_id(
            user_id,
            first_name,
            last_name,
            avatar_url
          )
        )
      `)
      .eq('id', conversationId)
      .single();

    return { data, error };
  }

  // Obtenir les messages d'une conversation
  async getConversationMessages(conversationId: string, limit = 50, offset = 0) {
    const { data, error } = await supabase
      .from('messages')
      .select(`
        *,
        sender:profiles!sender_id(
          user_id,
          first_name,
          last_name,
          avatar_url
        )
      `)
      .eq('conversation_id', conversationId)
      .order('created_at', { ascending: true })
      .range(offset, offset + limit - 1);

    return { data, error };
  }

  // Créer une nouvelle conversation
  async createConversation(participantIds: string[], title?: string) {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return { data: null, error: { message: 'Not authenticated' } };

    // Créer la conversation
    const { data: conversation, error: convError } = await supabase
      .from('conversations')
      .insert({
        title,
        is_group: participantIds.length > 1,
        created_by: user.id,
      })
      .select()
      .single();

    if (convError) return { data: null, error: convError };

    // Ajouter les participants
    const participants = [user.id, ...participantIds].map(userId => ({
      conversation_id: conversation.id,
      user_id: userId,
    }));

    const { error: participantsError } = await supabase
      .from('conversation_participants')
      .insert(participants);

    if (participantsError) return { data: null, error: participantsError };

    return { data: conversation, error: null };
  }

  // Envoyer un message
  async sendMessage(conversationId: string, content: string, messageType = 'text', attachments?: string[]) {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return { data: null, error: { message: 'Not authenticated' } };

    const { data, error } = await supabase
      .from('messages')
      .insert({
        conversation_id: conversationId,
        sender_id: user.id,
        content,
        message_type: messageType,
        attachments,
      })
      .select(`
        *,
        sender:profiles!sender_id(
          user_id,
          first_name,
          last_name,
          avatar_url
        )
      `)
      .single();

    return { data, error };
  }

  // Marquer les messages comme lus
  async markMessagesAsRead(conversationId: string) {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return { error: { message: 'Not authenticated' } };

    const { error } = await supabase
      .from('conversation_participants')
      .update({ last_read_at: new Date().toISOString() })
      .eq('conversation_id', conversationId)
      .eq('user_id', user.id);

    return { error };
  }

  // Rechercher des utilisateurs pour créer une conversation
  async searchUsers(query: string, excludeIds: string[] = []) {
    let searchQuery = supabase
      .from('profiles')
      .select('user_id, first_name, last_name, avatar_url, user_type, institution')
      .or(`first_name.ilike.%${query}%,last_name.ilike.%${query}%`)
      .limit(10);

    if (excludeIds.length > 0) {
      searchQuery = searchQuery.not('user_id', 'in', `(${excludeIds.join(',')})`);
    }

    const { data, error } = await searchQuery;
    return { data, error };
  }

  // Obtenir une conversation directe entre deux utilisateurs
  async getDirectConversation(otherUserId: string) {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return { data: null, error: { message: 'Not authenticated' } };

    // Rechercher une conversation existante avec exactement ces deux participants
    const { data, error } = await supabase
      .from('conversations')
      .select(`
        *,
        participants:conversation_participants(user_id)
      `)
      .eq('is_group', false);

    if (error) return { data: null, error };

    // Trouver la conversation qui a exactement les deux utilisateurs
    const directConversation = data?.find(conv => {
      const participantIds = conv.participants?.map(p => p.user_id) || [];
      return participantIds.length === 2 && 
             participantIds.includes(user.id) && 
             participantIds.includes(otherUserId);
    });

    return { data: directConversation || null, error: null };
  }

  // Écouter les nouveaux messages en temps réel
  subscribeToMessages(conversationId: string, callback: (message: Message) => void) {
    return supabase
      .channel(`messages:${conversationId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages',
          filter: `conversation_id=eq.${conversationId}`,
        },
        (payload) => {
          callback(payload.new as Message);
        }
      )
      .subscribe();
  }

  // Écouter les changements de conversations
  subscribeToConversations(userId: string, callback: (conversation: Conversation) => void) {
    return supabase
      .channel(`conversations:${userId}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'conversations',
        },
        (payload) => {
          callback(payload.new as Conversation);
        }
      )
      .subscribe();
  }
}

export const messagesService = new MessagesService();
