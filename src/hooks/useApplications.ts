import { useState, useEffect } from 'react';
import { useAuth } from './useAuth';
import { applicationsService, type Application, type ApplicationStatus } from '../integrations/supabase/services/applicationsService';

export function useStudentApplications() {
  const { user } = useAuth();
  const [applications, setApplications] = useState<Application[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  const fetchApplications = async () => {
    if (!user) {
      setApplications([]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    try {
      const { data, error } = await applicationsService.getStudentApplications(user.id);
      if (error) {
        setError(error);
      } else {
        setApplications(data || []);
      }
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, [user]);

  const createApplication = async (applicationData: {
    formation_id: string;
    motivation_letter?: string;
    grade_average?: number;
    priority?: number;
  }) => {
    try {
      const { data, error } = await applicationsService.createApplication(applicationData);
      if (error) {
        return { error };
      }
      
      // Refresh the list
      await fetchApplications();
      return { data, error: null };
    } catch (error) {
      return { error };
    }
  };

  const updateApplication = async (id: string, updates: {
    motivation_letter?: string;
    grade_average?: number;
    priority?: number;
    additional_documents?: string[];
  }) => {
    try {
      const { data, error } = await applicationsService.updateApplication(id, updates);
      if (error) {
        return { error };
      }
      
      // Refresh the list
      await fetchApplications();
      return { data, error: null };
    } catch (error) {
      return { error };
    }
  };

  const submitApplication = async (id: string) => {
    try {
      const { data, error } = await applicationsService.submitApplication(id);
      if (error) {
        return { error };
      }
      
      // Refresh the list
      await fetchApplications();
      return { data, error: null };
    } catch (error) {
      return { error };
    }
  };

  const deleteApplication = async (id: string) => {
    try {
      const { error } = await applicationsService.deleteApplication(id);
      if (error) {
        return { error };
      }
      
      // Refresh the list
      await fetchApplications();
      return { error: null };
    } catch (error) {
      return { error };
    }
  };

  return {
    applications,
    isLoading,
    error,
    refresh: fetchApplications,
    createApplication,
    updateApplication,
    submitApplication,
    deleteApplication,
  };
}

export function useFormationApplications(formationId: string) {
  const [applications, setApplications] = useState<Application[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  const fetchApplications = async () => {
    if (!formationId) {
      setApplications([]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    try {
      const { data, error } = await applicationsService.getFormationApplications(formationId);
      if (error) {
        setError(error);
      } else {
        setApplications(data || []);
      }
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, [formationId]);

  const updateApplicationStatus = async (id: string, status: ApplicationStatus, reviewNotes?: string) => {
    try {
      const { data, error } = await applicationsService.updateApplicationStatus(id, status, reviewNotes);
      if (error) {
        return { error };
      }
      
      // Refresh the list
      await fetchApplications();
      return { data, error: null };
    } catch (error) {
      return { error };
    }
  };

  return {
    applications,
    isLoading,
    error,
    refresh: fetchApplications,
    updateApplicationStatus,
  };
}

export function useApplication(id: string) {
  const [application, setApplication] = useState<Application | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    async function fetchApplication() {
      if (!id) return;
      
      setIsLoading(true);
      try {
        const { data, error } = await applicationsService.getApplicationById(id);
        if (error) {
          setError(error);
        } else {
          setApplication(data);
        }
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchApplication();
  }, [id]);

  return { application, isLoading, error };
}

export function useApplicationStats() {
  const { user } = useAuth();
  const [stats, setStats] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    async function fetchStats() {
      if (!user) {
        setStats(null);
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      try {
        const { data, error } = await applicationsService.getStudentApplicationStats(user.id);
        if (error) {
          setError(error);
        } else {
          setStats(data);
        }
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchStats();
  }, [user]);

  return { stats, isLoading, error };
}

export function useCanApply(formationId: string) {
  const [canApply, setCanApply] = useState(false);
  const [reason, setReason] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function checkCanApply() {
      if (!formationId) {
        setCanApply(false);
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      try {
        const result = await applicationsService.canApplyToFormation(formationId);
        setCanApply(result.canApply);
        setReason(result.reason || null);
      } catch (error) {
        setCanApply(false);
        setReason('Error checking application eligibility');
      } finally {
        setIsLoading(false);
      }
    }

    checkCanApply();
  }, [formationId]);

  return { canApply, reason, isLoading };
}
