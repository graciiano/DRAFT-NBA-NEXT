// Types globais da API
export interface User {
  id: number;
  name: string;
  lastname: string;
  nickname: string;
  email: string;
  number: string;
  platform: 'PS5' | 'XBOX' | 'PC';
  roles: string[];
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: User;
}

export interface RegisterRequest {
  name: string;
  lastname: string;
  nickname: string;
  email: string;
  password: string;
  number: string;
  platform: 'PS5' | 'XBOX' | 'PC';
  positions: Position[];
  registerCode: string;
}

export interface RegisterResponse {
  id: number;
  email: string;
}

export type Position = 'PG' | 'SG' | 'SF' | 'PF' | 'C';

export type DraftStatus = 'OPEN' | 'CLOSED';

export interface Draft {
  id: number;
  title: string;
  description: string;
  status: DraftStatus;
  createdAt: string;
}

export interface DraftDetail {
  id: number;
  title: string;
  rules: {
    maxPlayers: number;
    rounds: number;
  };
  organizer: {
    id: number;
    nickname: string;
  };
}

export interface SignupRequest {
  desiredPositions: Position[];
}

export interface SignupResponse {
  id: number;
  status: 'WAITLIST' | 'APPROVED';
}

export type WaitlistStatus = 'WAITLIST' | 'APPROVED';

export interface WaitlistEntry {
  signupId: number;
  user: {
    id: number;
    nickname: string;
  };
  desiredPositions: Position[];
  assignedPosition: Position | null;
  status: WaitlistStatus;
}

export interface AssignPositionRequest {
  assignedPosition: Position;
}

export interface AssignPositionResponse {
  status: 'APPROVED';
}

export interface WebSocketMessage {
  type: 'WAITLIST_UPDATED' | 'PLAYER_APPROVED';
  payload: any;
}

export interface ApiError {
  message: string;
  status?: number;
}
