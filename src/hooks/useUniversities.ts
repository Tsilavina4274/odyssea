import { useState, useEffect } from 'react';
import { universitiesService, type University, type Formation } from '../integrations/supabase/services/universitiesService';

export function useUniversities(filters?: {
  city?: string;
  type?: string;
  search?: string;
}) {
  const [universities, setUniversities] = useState<University[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    async function fetchUniversities() {
      setIsLoading(true);
      try {
        const { data, error } = await universitiesService.getUniversities(filters);
        if (error) {
          setError(error);
        } else {
          setUniversities(data || []);
        }
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchUniversities();
  }, [filters?.city, filters?.type, filters?.search]);

  return {
    universities,
    isLoading,
    error,
    refresh: () => {
      // Recharger les données
      setIsLoading(true);
      universitiesService.getUniversities(filters).then(({ data, error }) => {
        if (error) {
          setError(error);
        } else {
          setUniversities(data || []);
        }
        setIsLoading(false);
      });
    }
  };
}

export function useUniversity(id: string) {
  const [university, setUniversity] = useState<University | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    async function fetchUniversity() {
      if (!id) return;
      
      setIsLoading(true);
      try {
        const { data, error } = await universitiesService.getUniversityById(id);
        if (error) {
          setError(error);
        } else {
          setUniversity(data);
        }
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchUniversity();
  }, [id]);

  return { university, isLoading, error };
}

export function useFormations(filters?: {
  search?: string;
  domain?: string;
  level?: string;
  city?: string;
  universityId?: string;
}) {
  const [formations, setFormations] = useState<Formation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    async function fetchFormations() {
      setIsLoading(true);
      try {
        let result;
        if (filters?.universityId) {
          result = await universitiesService.getFormationsByUniversity(filters.universityId);
        } else {
          result = await universitiesService.searchFormations(filters || {});
        }
        
        const { data, error } = result;
        if (error) {
          setError(error);
        } else {
          setFormations(data || []);
        }
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchFormations();
  }, [filters?.search, filters?.domain, filters?.level, filters?.city, filters?.universityId]);

  return { formations, isLoading, error };
}

export function useFormation(id: string) {
  const [formation, setFormation] = useState<Formation | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    async function fetchFormation() {
      if (!id) return;
      
      setIsLoading(true);
      try {
        const { data, error } = await universitiesService.getFormationById(id);
        if (error) {
          setError(error);
        } else {
          setFormation(data);
        }
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchFormation();
  }, [id]);

  return { formation, isLoading, error };
}

export function useFiltersData() {
  const [domains, setDomains] = useState<string[]>([]);
  const [levels, setLevels] = useState<string[]>([]);
  const [cities, setCities] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchFiltersData() {
      try {
        const [domainsResult, levelsResult, citiesResult] = await Promise.all([
          universitiesService.getAvailableDomains(),
          universitiesService.getAvailableLevels(),
          universitiesService.getAvailableCities(),
        ]);

        setDomains(domainsResult.data || []);
        setLevels(levelsResult.data || []);
        setCities(citiesResult.data || []);
      } catch (error) {
        console.error('Error fetching filters data:', error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchFiltersData();
  }, []);

  return { domains, levels, cities, isLoading };
}
