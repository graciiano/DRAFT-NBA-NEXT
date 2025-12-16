import { Draft, DraftDetail, SignupRequest, SignupResponse } from '@/types/api';

import api from '../api';

export const draftsService = {
  /**
   * Listar todos os drafts
   */
  getDrafts: async (): Promise<Draft[]> => {
    const response = await api.get<Draft[]>('/api/v1/drafts');
    return response.data;
  },

  /**
   * Buscar detalhes de um draft específico
   */
  getDraftDetail: async (draftId: number): Promise<DraftDetail> => {
    const response = await api.get<DraftDetail>(`/api/v1/drafts/${draftId}`);
    return response.data;
  },

  /**
   * Inscrever-se em um draft
   */
  signupDraft: async (draftId: number, data: SignupRequest): Promise<SignupResponse> => {
    const response = await api.post<SignupResponse>(`/api/v1/drafts/${draftId}/signup`, data);
    return response.data;
  },
};
