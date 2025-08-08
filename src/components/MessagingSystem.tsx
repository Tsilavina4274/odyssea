import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { 
  MessageCircle, Send, Search, Phone, Video, MoreVertical,
  Paperclip, Smile, Check, CheckCheck, Clock, AlertCircle,
  Users, Settings, Archive, Trash2, Star
} from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

interface Contact {
  id: number;
  name: string;
  role: string;
  avatar: string;
  university?: string;
  isOnline: boolean;
  lastSeen?: string;
}

interface Message {
  id: number;
  senderId: number;
  receiverId: number;
  content: string;
  timestamp: string;
  status: 'sending' | 'sent' | 'delivered' | 'read';
  type: 'text' | 'file' | 'image';
  attachments?: string[];
}

interface Conversation {
  id: number;
  participants: number[];
  lastMessage: Message;
  unreadCount: number;
  isArchived: boolean;
  isPinned: boolean;
}

const MessagingSystem = () => {
  const [selectedConversation, setSelectedConversation] = useState<number | null>(1);
  const [newMessage, setNewMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const currentUserId = 1; // ID de l'utilisateur actuel

  const contacts: Contact[] = [
    {
      id: 2,
      name: 'Marie Dubois',
      role: 'Conseillère d\'orientation',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100',
      university: 'Université Paris Descartes',
      isOnline: true
    },
    {
      id: 3,
      name: 'Prof. Jean Martin',
      role: 'Responsable admissions',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100',
      university: 'INSA Lyon',
      isOnline: false,
      lastSeen: '2024-01-15T10:30:00Z'
    },
    {
      id: 4,
      name: 'Sophie Chen',
      role: 'Étudiante',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100',
      university: 'Sorbonne',
      isOnline: true
    },
    {
      id: 5,
      name: 'Support Odysséa',
      role: 'Équipe support',
      avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100',
      isOnline: true
    }
  ];

  const messages: Message[] = [
    {
      id: 1,
      senderId: 2,
      receiverId: 1,
      content: 'Bonjour ! J\'ai vu que vous vous intéressez à notre programme de médecine. Avez-vous des questions spécifiques ?',
      timestamp: '2024-01-15T09:00:00Z',
      status: 'read',
      type: 'text'
    },
    {
      id: 2,
      senderId: 1,
      receiverId: 2,
      content: 'Bonjour Marie, merci pour votre message. J\'aimerais en savoir plus sur les conditions d\'admission.',
      timestamp: '2024-01-15T09:15:00Z',
      status: 'delivered',
      type: 'text'
    },
    {
      id: 3,
      senderId: 2,
      receiverId: 1,
      content: 'Bien sûr ! Pour être admis en première année de médecine, vous devez d\'abord valider une première année de PASS ou de L.AS.',
      timestamp: '2024-01-15T09:18:00Z',
      status: 'read',
      type: 'text'
    },
    {
      id: 4,
      senderId: 1,
      receiverId: 2,
      content: 'D\'accord, et concernant les prérequis en sciences ?',
      timestamp: '2024-01-15T09:25:00Z',
      status: 'sent',
      type: 'text'
    },
    {
      id: 5,
      senderId: 2,
      receiverId: 1,
      content: 'Il est fortement recommandé d\'avoir suivi les spécialités Physique-Chimie et SVT au lycée.',
      timestamp: '2024-01-15T09:30:00Z',
      status: 'delivered',
      type: 'text'
    }
  ];

  const conversations: Conversation[] = [
    {
      id: 1,
      participants: [1, 2],
      lastMessage: messages[4],
      unreadCount: 1,
      isArchived: false,
      isPinned: true
    },
    {
      id: 2,
      participants: [1, 3],
      lastMessage: {
        id: 6,
        senderId: 3,
        receiverId: 1,
        content: 'Merci pour votre candidature. Nous reviendrons vers vous sous 48h.',
        timestamp: '2024-01-14T16:20:00Z',
        status: 'read',
        type: 'text'
      },
      unreadCount: 0,
      isArchived: false,
      isPinned: false
    },
    {
      id: 3,
      participants: [1, 4],
      lastMessage: {
        id: 7,
        senderId: 4,
        receiverId: 1,
        content: 'Salut ! Tu as reçu une réponse pour ta candidature ?',
        timestamp: '2024-01-14T14:00:00Z',
        status: 'read',
        type: 'text'
      },
      unreadCount: 0,
      isArchived: false,
      isPinned: false
    }
  ];

  const getContact = (contactId: number): Contact | undefined => {
    return contacts.find(c => c.id === contactId);
  };

  const getConversationMessages = (conversationId: number): Message[] => {
    const conversation = conversations.find(c => c.id === conversationId);
    if (!conversation) return [];
    
    return messages.filter(m => 
      conversation.participants.includes(m.senderId) && 
      conversation.participants.includes(m.receiverId)
    );
  };

  const formatTime = (timestamp: string): string => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHours = diffMs / (1000 * 60 * 60);
    
    if (diffHours < 24) {
      return date.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
    } else {
      return date.toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit' });
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'sending': return <Clock className="w-3 h-3 text-gray-400" />;
      case 'sent': return <Check className="w-3 h-3 text-gray-400" />;
      case 'delivered': return <CheckCheck className="w-3 h-3 text-gray-400" />;
      case 'read': return <CheckCheck className="w-3 h-3 text-blue-500" />;
      default: return null;
    }
  };

  const sendMessage = () => {
    if (!newMessage.trim() || !selectedConversation) return;
    
    // Simuler l'envoi d'un message
    console.log('Envoi du message:', newMessage);
    setNewMessage('');
  };

  const filteredConversations = conversations.filter(conv => {
    const otherParticipant = conv.participants.find(id => id !== currentUserId);
    const contact = getContact(otherParticipant!);
    return contact?.name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [selectedConversation]);

  const selectedConv = conversations.find(c => c.id === selectedConversation);
  const currentContact = selectedConv ? getContact(selectedConv.participants.find(id => id !== currentUserId)!) : null;
  const currentMessages = selectedConversation ? getConversationMessages(selectedConversation) : [];

  return (
    <div className="h-screen flex bg-background">
      {/* Sidebar - Liste des conversations */}
      <div className="w-80 border-r bg-muted/20">
        <div className="p-4 border-b">
          <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
            <MessageCircle className="w-5 h-5" />
            Messages
          </h2>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Rechercher une conversation..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <ScrollArea className="h-[calc(100vh-120px)]">
          <div className="p-2">
            {filteredConversations.map((conversation) => {
              const otherParticipant = conversation.participants.find(id => id !== currentUserId);
              const contact = getContact(otherParticipant!);
              
              if (!contact) return null;

              return (
                <div
                  key={conversation.id}
                  className={`p-3 rounded-lg cursor-pointer hover:bg-muted/50 transition-colors mb-1 ${
                    selectedConversation === conversation.id ? 'bg-primary/10' : ''
                  }`}
                  onClick={() => setSelectedConversation(conversation.id)}
                >
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <Avatar className="w-12 h-12">
                        <AvatarImage src={contact.avatar} alt={contact.name} />
                        <AvatarFallback>{contact.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      {contact.isOnline && (
                        <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-white rounded-full" />
                      )}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium truncate">{contact.name}</h3>
                        <span className="text-xs text-muted-foreground">
                          {formatTime(conversation.lastMessage.timestamp)}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <p className="text-sm text-muted-foreground truncate">
                          {conversation.lastMessage.content}
                        </p>
                        {conversation.unreadCount > 0 && (
                          <Badge className="ml-2 bg-primary text-primary-foreground rounded-full px-2 py-1 text-xs">
                            {conversation.unreadCount}
                          </Badge>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground truncate">
                        {contact.role} • {contact.university}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </ScrollArea>
      </div>

      {/* Zone de conversation */}
      <div className="flex-1 flex flex-col">
        {selectedConversation && currentContact ? (
          <>
            {/* Header de la conversation */}
            <div className="p-4 border-b bg-background">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Avatar className="w-10 h-10">
                      <AvatarImage src={currentContact.avatar} alt={currentContact.name} />
                      <AvatarFallback>{currentContact.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    {currentContact.isOnline && (
                      <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-white rounded-full" />
                    )}
                  </div>
                  <div>
                    <h3 className="font-semibold">{currentContact.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {currentContact.isOnline ? 'En ligne' : 
                       currentContact.lastSeen ? `Vu ${formatTime(currentContact.lastSeen)}` : 'Hors ligne'}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm">
                    <Phone className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Video className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <MoreVertical className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Zone des messages */}
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {currentMessages.map((message) => {
                  const isOwnMessage = message.senderId === currentUserId;
                  
                  return (
                    <div
                      key={message.id}
                      className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                          isOwnMessage
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-muted'
                        }`}
                      >
                        <p className="text-sm">{message.content}</p>
                        <div className={`flex items-center gap-1 mt-1 ${
                          isOwnMessage ? 'justify-end' : 'justify-start'
                        }`}>
                          <span className="text-xs opacity-70">
                            {formatTime(message.timestamp)}
                          </span>
                          {isOwnMessage && getStatusIcon(message.status)}
                        </div>
                      </div>
                    </div>
                  );
                })}
                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>

            {/* Zone de saisie */}
            <div className="p-4 border-t bg-background">
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm">
                  <Paperclip className="w-4 h-4" />
                </Button>
                <div className="flex-1 relative">
                  <Input
                    placeholder="Tapez votre message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                    className="pr-10"
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute right-1 top-1/2 transform -translate-y-1/2"
                  >
                    <Smile className="w-4 h-4" />
                  </Button>
                </div>
                <Button 
                  onClick={sendMessage} 
                  disabled={!newMessage.trim()}
                  className="odyssea-gradient"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center bg-muted/10">
            <div className="text-center">
              <MessageCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Sélectionnez une conversation</h3>
              <p className="text-muted-foreground">
                Choisissez une conversation pour commencer à échanger
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MessagingSystem;
