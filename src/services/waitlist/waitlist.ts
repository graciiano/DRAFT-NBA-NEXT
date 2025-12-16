import { AssignPositionRequest, AssignPositionResponse, WaitlistEntry } from '@/types/api';

import api from '../api';

export const waitlistService = {
  /**
   * Listar jogadores na waitlist de um draft
   * Requer role ADMIN ou ORGANIZER
   */
  getWaitlist: async (draftId: number): Promise<WaitlistEntry[]> => {
    const response = await api.get<WaitlistEntry[]>(`/api/v1/drafts/${draftId}/waitlist`);
    return response.data;
  },

  /**
   * Atribuir posição a um jogador na waitlist
   * Requer role ADMIN ou ORGANIZER
   */
  assignPosition: async (
    draftId: number,
    signupId: number,
    data: AssignPositionRequest
  ): Promise<AssignPositionResponse> => {
    const response = await api.patch<AssignPositionResponse>(`/api/v1/drafts/${draftId}/waitlist/${signupId}`, data);
    return response.data;
  },
};
