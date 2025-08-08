import { supabase } from '../client';
import type { AuthError, User } from '@supabase/supabase-js';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  userType: 'lyceen' | 'universite' | 'admin';
  institution?: string;
}

export interface AuthResponse {
  user: User | null;
  error: AuthError | null;
}

class AuthService {
  // Connexion
  async signIn(credentials: LoginCredentials): Promise<AuthResponse> {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: credentials.email,
      password: credentials.password,
    });

    return {
      user: data.user,
      error,
    };
  }

  // Inscription
  async signUp(credentials: RegisterCredentials): Promise<AuthResponse> {
    const { data, error } = await supabase.auth.signUp({
      email: credentials.email,
      password: credentials.password,
      options: {
        data: {
          first_name: credentials.firstName,
          last_name: credentials.lastName,
          user_type: credentials.userType,
          institution: credentials.institution,
        },
      },
    });

    return {
      user: data.user,
      error,
    };
  }

  // Déconnexion
  async signOut() {
    const { error } = await supabase.auth.signOut();
    return { error };
  }

  // Obtenir l'utilisateur actuel
  async getCurrentUser() {
    const { data: { user }, error } = await supabase.auth.getUser();
    return { user, error };
  }

  // Obtenir la session actuelle
  async getCurrentSession() {
    const { data: { session }, error } = await supabase.auth.getSession();
    return { session, error };
  }

  // Réinitialiser le mot de passe
  async resetPassword(email: string) {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    return { error };
  }

  // Mettre à jour le mot de passe
  async updatePassword(password: string) {
    const { error } = await supabase.auth.updateUser({
      password,
    });
    return { error };
  }

  // Obtenir le profil utilisateur complet
  async getUserProfile(userId: string) {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('user_id', userId)
      .single();

    return { data, error };
  }

  // Mettre à jour le profil utilisateur
  async updateUserProfile(userId: string, updates: any) {
    const { data, error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('user_id', userId)
      .select()
      .single();

    return { data, error };
  }

  // Écouter les changements d'authentification
  onAuthStateChange(callback: (event: string, session: any) => void) {
    return supabase.auth.onAuthStateChange(callback);
  }
}

export const authService = new AuthService();
