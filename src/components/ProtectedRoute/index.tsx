'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { selectIsAuthenticated, selectUser } from '@/store/auth/selector';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAuth?: boolean;
  requireRoles?: string[];
}

/**
 * Componente para proteger rotas que requerem autenticação
 */
export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requireAuth = true,
  requireRoles = [],
}) => {
  const router = useRouter();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const user = useSelector(selectUser);

  useEffect(() => {
    // Redirect to login if not authenticated and auth is required
    if (requireAuth && !isAuthenticated) {
      router.push('/login');
      return;
    }

    // Check roles if specified
    if (requireRoles.length > 0 && user) {
      const hasRequiredRole = requireRoles.some((role) =>
        user.roles.includes(role)
      );
      
      if (!hasRequiredRole) {
        router.push('/drafts'); // Redirect to home if no permission
      }
    }
  }, [isAuthenticated, user, requireAuth, requireRoles, router]);

  // Show nothing while checking authentication
  if (requireAuth && !isAuthenticated) {
    return null;
  }

  // Show nothing if user doesn't have required roles
  if (requireRoles.length > 0 && user) {
    const hasRequiredRole = requireRoles.some((role) =>
      user.roles.includes(role)
    );
    
    if (!hasRequiredRole) {
      return null;
    }
  }

  return <>{children}</>;
};

export default ProtectedRoute;
