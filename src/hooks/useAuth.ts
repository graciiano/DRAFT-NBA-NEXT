import { selectIsAuthenticated, selectUser } from '@/store/auth/selector';
import { useSelector } from 'react-redux';

/**
 * Hook para verificar autenticação e obter dados do usuário
 */
export const useAuth = () => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const user = useSelector(selectUser);

  return {
    isAuthenticated,
    user,
    isLoggedIn: isAuthenticated && !!user,
  };
};
