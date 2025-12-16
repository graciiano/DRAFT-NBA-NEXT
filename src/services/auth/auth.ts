import { LoginRequest, LoginResponse, RegisterRequest, RegisterResponse, User } from '@/types/api';

import api from '../api';

export const authService = {
  /**
   * Login do usuário
   */
  login: async (data: LoginRequest): Promise<LoginResponse> => {
    const response = await api.post<LoginResponse>('/api/v1/auth/login', data);
    return response.data;
  },

  /**
   * Registro de novo usuário
   */
  register: async (data: RegisterRequest): Promise<RegisterResponse> => {
    const response = await api.post<RegisterResponse>('/api/v1/auth/register', data);
    return response.data;
  },

  /**
   * Buscar dados do usuário logado
   */
  getMe: async (): Promise<User> => {
    const response = await api.get<User>('/api/v1/users/me');
    return response.data;
  },
};
