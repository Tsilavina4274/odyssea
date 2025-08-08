import { supabase } from '../client';

export interface University {
  id: string;
  name: string;
  description?: string;
  city: string;
  address?: string;
  type: 'Public' | 'Privé';
  website?: string;
  email?: string;
  phone?: string;
  established_year?: number;
  student_count: number;
  rating: number;
  image_url?: string;
  logo_url?: string;
  latitude?: number;
  longitude?: number;
  accreditations?: string[];
  created_at: string;
  updated_at: string;
}

export interface Formation {
  id: string;
  university_id: string;
  name: string;
  description?: string;
  level: string;
  domain: string;
  duration_years: number;
  total_places: number;
  available_places: number;
  requirements?: string;
  admission_criteria?: string;
  application_deadline?: string;
  tuition_fee?: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  university?: University;
}

class UniversitiesService {
  // Obtenir toutes les universités
  async getUniversities(filters?: {
    city?: string;
    type?: string;
    search?: string;
  }) {
    let query = supabase
      .from('universities')
      .select('*')
      .order('name');

    if (filters?.city) {
      query = query.eq('city', filters.city);
    }

    if (filters?.type) {
      query = query.eq('type', filters.type);
    }

    if (filters?.search) {
      query = query.or(`name.ilike.%${filters.search}%,city.ilike.%${filters.search}%`);
    }

    const { data, error } = await query;
    return { data, error };
  }

  // Obtenir une université par ID
  async getUniversityById(id: string) {
    const { data, error } = await supabase
      .from('universities')
      .select('*')
      .eq('id', id)
      .single();

    return { data, error };
  }

  // Obtenir les formations d'une université
  async getFormationsByUniversity(universityId: string) {
    const { data, error } = await supabase
      .from('formations')
      .select(`
        *,
        university:universities(*)
      `)
      .eq('university_id', universityId)
      .eq('is_active', true)
      .order('name');

    return { data, error };
  }

  // Rechercher des formations
  async searchFormations(filters: {
    search?: string;
    domain?: string;
    level?: string;
    city?: string;
  }) {
    let query = supabase
      .from('formations')
      .select(`
        *,
        university:universities(*)
      `)
      .eq('is_active', true);

    if (filters.search) {
      query = query.or(`name.ilike.%${filters.search}%,description.ilike.%${filters.search}%`);
    }

    if (filters.domain) {
      query = query.eq('domain', filters.domain);
    }

    if (filters.level) {
      query = query.eq('level', filters.level);
    }

    if (filters.city) {
      query = query.eq('university.city', filters.city);
    }

    const { data, error } = await query.order('name');
    return { data, error };
  }

  // Obtenir une formation par ID
  async getFormationById(id: string) {
    const { data, error } = await supabase
      .from('formations')
      .select(`
        *,
        university:universities(*)
      `)
      .eq('id', id)
      .single();

    return { data, error };
  }

  // Obtenir les domaines disponibles
  async getAvailableDomains() {
    const { data, error } = await supabase
      .from('formations')
      .select('domain')
      .eq('is_active', true);

    if (error) return { data: [], error };

    const domains = [...new Set(data.map(f => f.domain))].sort();
    return { data: domains, error: null };
  }

  // Obtenir les niveaux disponibles
  async getAvailableLevels() {
    const { data, error } = await supabase
      .from('formations')
      .select('level')
      .eq('is_active', true);

    if (error) return { data: [], error };

    const levels = [...new Set(data.map(f => f.level))].sort();
    return { data: levels, error: null };
  }

  // Obtenir les villes disponibles
  async getAvailableCities() {
    const { data, error } = await supabase
      .from('universities')
      .select('city');

    if (error) return { data: [], error };

    const cities = [...new Set(data.map(u => u.city))].sort();
    return { data: cities, error: null };
  }

  // Créer une université (pour les administrateurs)
  async createUniversity(university: Omit<University, 'id' | 'created_at' | 'updated_at'>) {
    const { data, error } = await supabase
      .from('universities')
      .insert(university)
      .select()
      .single();

    return { data, error };
  }

  // Mettre à jour une université
  async updateUniversity(id: string, updates: Partial<University>) {
    const { data, error } = await supabase
      .from('universities')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    return { data, error };
  }

  // Créer une formation
  async createFormation(formation: Omit<Formation, 'id' | 'created_at' | 'updated_at' | 'university'>) {
    const { data, error } = await supabase
      .from('formations')
      .insert(formation)
      .select()
      .single();

    return { data, error };
  }

  // Mettre à jour une formation
  async updateFormation(id: string, updates: Partial<Formation>) {
    const { data, error } = await supabase
      .from('formations')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    return { data, error };
  }
}

export const universitiesService = new UniversitiesService();
