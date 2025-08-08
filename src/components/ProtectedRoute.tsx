import { Navigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedUserTypes?: ('lyceen' | 'universite')[];
  requireAuth?: boolean;
}

export const ProtectedRoute = ({ 
  children, 
  allowedUserTypes, 
  requireAuth = true 
}: ProtectedRouteProps) => {
  const { isAuthenticated, user } = useAuth();

  if (requireAuth && !isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (allowedUserTypes && user && !allowedUserTypes.includes(user.userType)) {
    // Rediriger vers le dashboard approprié selon le type d'utilisateur
    const redirectPath = user.userType === 'lyceen' ? '/dashboard' : '/establishment-dashboard';
    return <Navigate to={redirectPath} replace />;
  }

  return <>{children}</>;
};