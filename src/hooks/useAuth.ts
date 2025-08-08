import { useState, useEffect, createContext, useContext } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { authService, type LoginCredentials, type RegisterCredentials } from '../integrations/supabase/services/authService';

interface UserProfile {
  id: string;
  user_id: string;
  first_name?: string;
  last_name?: string;
  institution?: string;
  user_type?: string;
  phone?: string;
  date_of_birth?: string;
  address?: string;
  city?: string;
  postal_code?: string;
  country?: string;
  avatar_url?: string;
  bio?: string;
  current_level?: string;
  specialization?: string;
  grade_average?: number;
  is_active: boolean;
  email_notifications: boolean;
  push_notifications: boolean;
  created_at: string;
  updated_at: string;
}

interface AuthContextType {
  user: User | null;
  profile: UserProfile | null;
  session: Session | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  signIn: (credentials: LoginCredentials) => Promise<{ error: any }>;
  signUp: (credentials: RegisterCredentials) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
  updateProfile: (updates: Partial<UserProfile>) => Promise<{ error: any }>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export function useAuthProvider(): AuthContextType {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const isAuthenticated = !!user;

  // Charger le profil utilisateur
  const loadUserProfile = async (userId: string) => {
    try {
      const { data, error } = await authService.getUserProfile(userId);
      if (error) {
        console.error('Error loading user profile:', error);
        return;
      }
      setProfile(data);
    } catch (error) {
      console.error('Error loading user profile:', error);
    }
  };

  // Initialiser l'authentification
  useEffect(() => {
    let mounted = true;

    async function getInitialSession() {
      const { session, error } = await authService.getCurrentSession();
      
      if (mounted) {
        if (error) {
          console.error('Error getting session:', error);
        } else {
          setSession(session);
          setUser(session?.user ?? null);
          
          if (session?.user) {
            await loadUserProfile(session.user.id);
          }
        }
        setIsLoading(false);
      }
    }

    getInitialSession();

    // Écouter les changements d'authentification
    const { data: { subscription } } = authService.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event, session);
        
        if (mounted) {
          setSession(session);
          setUser(session?.user ?? null);
          
          if (session?.user) {
            await loadUserProfile(session.user.id);
          } else {
            setProfile(null);
          }
          setIsLoading(false);
        }
      }
    );

    return () => {
      mounted = false;
      subscription?.unsubscribe();
    };
  }, []);

  // Connexion
  const signIn = async (credentials: LoginCredentials) => {
    setIsLoading(true);
    try {
      const { user, error } = await authService.signIn(credentials);
      if (error) {
        return { error };
      }
      
      if (user) {
        await loadUserProfile(user.id);
      }
      
      return { error: null };
    } catch (error) {
      return { error };
    } finally {
      setIsLoading(false);
    }
  };

  // Inscription
  const signUp = async (credentials: RegisterCredentials) => {
    setIsLoading(true);
    try {
      const { user, error } = await authService.signUp(credentials);
      if (error) {
        return { error };
      }
      
      return { error: null };
    } catch (error) {
      return { error };
    } finally {
      setIsLoading(false);
    }
  };

  // Déconnexion
  const signOut = async () => {
    setIsLoading(true);
    try {
      await authService.signOut();
      setUser(null);
      setProfile(null);
      setSession(null);
    } catch (error) {
      console.error('Error signing out:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Mettre à jour le profil
  const updateProfile = async (updates: Partial<UserProfile>) => {
    if (!user) {
      return { error: { message: 'No user authenticated' } };
    }

    try {
      const { data, error } = await authService.updateUserProfile(user.id, updates);
      if (error) {
        return { error };
      }
      
      setProfile(data);
      return { error: null };
    } catch (error) {
      return { error };
    }
  };

  // Rafraîchir le profil
  const refreshProfile = async () => {
    if (!user) return;
    await loadUserProfile(user.id);
  };

  return {
    user,
    profile,
    session,
    isLoading,
    isAuthenticated,
    signIn,
    signUp,
    signOut,
    updateProfile,
    refreshProfile,
  };
}

export { AuthContext };
