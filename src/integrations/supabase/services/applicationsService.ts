import { supabase } from '../client';
import type { Formation } from './universitiesService';

export type ApplicationStatus = 'draft' | 'submitted' | 'under_review' | 'accepted' | 'rejected' | 'waitlisted';

export interface Application {
  id: string;
  student_id: string;
  formation_id: string;
  status: ApplicationStatus;
  priority: number;
  motivation_letter?: string;
  additional_documents?: string[];
  grade_average?: number;
  submitted_at?: string;
  reviewed_at?: string;
  reviewer_id?: string;
  review_notes?: string;
  created_at: string;
  updated_at: string;
  formation?: Formation;
}

class ApplicationsService {
  // Obtenir les candidatures d'un étudiant
  async getStudentApplications(studentId: string) {
    const { data, error } = await supabase
      .from('applications')
      .select(`
        *,
        formation:formations(
          *,
          university:universities(*)
        )
      `)
      .eq('student_id', studentId)
      .order('created_at', { ascending: false });

    return { data, error };
  }

  // Obtenir les candidatures pour une formation
  async getFormationApplications(formationId: string) {
    const { data, error } = await supabase
      .from('applications')
      .select(`
        *,
        student:profiles!student_id(*)
      `)
      .eq('formation_id', formationId)
      .order('submitted_at', { ascending: false });

    return { data, error };
  }

  // Obtenir une candidature par ID
  async getApplicationById(id: string) {
    const { data, error } = await supabase
      .from('applications')
      .select(`
        *,
        formation:formations(
          *,
          university:universities(*)
        ),
        student:profiles!student_id(*)
      `)
      .eq('id', id)
      .single();

    return { data, error };
  }

  // Créer une nouvelle candidature
  async createApplication(application: {
    formation_id: string;
    motivation_letter?: string;
    grade_average?: number;
    priority?: number;
  }) {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      return { data: null, error: { message: 'User not authenticated' } };
    }

    const { data, error } = await supabase
      .from('applications')
      .insert({
        student_id: user.id,
        ...application,
      })
      .select(`
        *,
        formation:formations(
          *,
          university:universities(*)
        )
      `)
      .single();

    return { data, error };
  }

  // Mettre à jour une candidature
  async updateApplication(id: string, updates: {
    motivation_letter?: string;
    grade_average?: number;
    priority?: number;
    additional_documents?: string[];
  }) {
    const { data, error } = await supabase
      .from('applications')
      .update(updates)
      .eq('id', id)
      .select(`
        *,
        formation:formations(
          *,
          university:universities(*)
        )
      `)
      .single();

    return { data, error };
  }

  // Soumettre une candidature
  async submitApplication(id: string) {
    const { data, error } = await supabase
      .from('applications')
      .update({
        status: 'submitted',
        submitted_at: new Date().toISOString(),
      })
      .eq('id', id)
      .select()
      .single();

    return { data, error };
  }

  // Mettre à jour le statut d'une candidature (pour les universités)
  async updateApplicationStatus(id: string, status: ApplicationStatus, reviewNotes?: string) {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      return { data: null, error: { message: 'User not authenticated' } };
    }

    const updates: any = {
      status,
      reviewed_at: new Date().toISOString(),
      reviewer_id: user.id,
    };

    if (reviewNotes) {
      updates.review_notes = reviewNotes;
    }

    const { data, error } = await supabase
      .from('applications')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    return { data, error };
  }

  // Supprimer une candidature
  async deleteApplication(id: string) {
    const { error } = await supabase
      .from('applications')
      .delete()
      .eq('id', id);

    return { error };
  }

  // Obtenir les statistiques des candidatures pour un étudiant
  async getStudentApplicationStats(studentId: string) {
    const { data, error } = await supabase
      .from('applications')
      .select('status')
      .eq('student_id', studentId);

    if (error) return { data: null, error };

    const stats = {
      total: data.length,
      draft: data.filter(app => app.status === 'draft').length,
      submitted: data.filter(app => app.status === 'submitted').length,
      under_review: data.filter(app => app.status === 'under_review').length,
      accepted: data.filter(app => app.status === 'accepted').length,
      rejected: data.filter(app => app.status === 'rejected').length,
      waitlisted: data.filter(app => app.status === 'waitlisted').length,
    };

    return { data: stats, error: null };
  }

  // Obtenir les statistiques des candidatures pour une formation
  async getFormationApplicationStats(formationId: string) {
    const { data, error } = await supabase
      .from('applications')
      .select('status')
      .eq('formation_id', formationId);

    if (error) return { data: null, error };

    const stats = {
      total: data.length,
      submitted: data.filter(app => app.status === 'submitted').length,
      under_review: data.filter(app => app.status === 'under_review').length,
      accepted: data.filter(app => app.status === 'accepted').length,
      rejected: data.filter(app => app.status === 'rejected').length,
      waitlisted: data.filter(app => app.status === 'waitlisted').length,
    };

    return { data: stats, error: null };
  }

  // Vérifier si un étudiant peut candidater à une formation
  async canApplyToFormation(formationId: string) {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      return { canApply: false, reason: 'Not authenticated' };
    }

    // Vérifier si l'étudiant a déjà candidaté
    const { data: existingApp } = await supabase
      .from('applications')
      .select('id')
      .eq('student_id', user.id)
      .eq('formation_id', formationId)
      .single();

    if (existingApp) {
      return { canApply: false, reason: 'Already applied' };
    }

    // Vérifier si la formation est encore active et a des places
    const { data: formation } = await supabase
      .from('formations')
      .select('is_active, available_places, application_deadline')
      .eq('id', formationId)
      .single();

    if (!formation?.is_active) {
      return { canApply: false, reason: 'Formation not active' };
    }

    if (formation.available_places <= 0) {
      return { canApply: false, reason: 'No available places' };
    }

    if (formation.application_deadline && new Date(formation.application_deadline) < new Date()) {
      return { canApply: false, reason: 'Deadline passed' };
    }

    return { canApply: true };
  }
}

export const applicationsService = new ApplicationsService();
