import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

export const AuthRedirect = () => {
  const { user, isAuthenticated, isLoading, getDashboardPath } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!isLoading && isAuthenticated && user) {
      // Only redirect if we're on login/register pages
      if (location.pathname === '/login' || location.pathname === '/register') {
        const dashboardPath = getDashboardPath(user.userType);
        navigate(dashboardPath, { replace: true });
      }
    }
  }, [isLoading, isAuthenticated, user, location.pathname, navigate, getDashboardPath]);

  return null;
};