import { User } from '@/types/api';

// Action Types
export const AUTH_LOGIN_REQUEST = 'auth/LOGIN_REQUEST';
export const AUTH_LOGIN_SUCCESS = 'auth/LOGIN_SUCCESS';
export const AUTH_LOGIN_FAILURE = 'auth/LOGIN_FAILURE';

export const AUTH_REGISTER_REQUEST = 'auth/REGISTER_REQUEST';
export const AUTH_REGISTER_SUCCESS = 'auth/REGISTER_SUCCESS';
export const AUTH_REGISTER_FAILURE = 'auth/REGISTER_FAILURE';

export const AUTH_LOGOUT = 'auth/LOGOUT';
export const AUTH_RESTORE_SESSION = 'auth/RESTORE_SESSION';

export const AUTH_GET_ME_REQUEST = 'auth/GET_ME_REQUEST';
export const AUTH_GET_ME_SUCCESS = 'auth/GET_ME_SUCCESS';
export const AUTH_GET_ME_FAILURE = 'auth/GET_ME_FAILURE';

// State Interface
export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

// Action Interfaces
export interface LoginRequestAction {
  type: typeof AUTH_LOGIN_REQUEST;
  payload: {
    email: string;
    password: string;
  };
}

export interface LoginSuccessAction {
  type: typeof AUTH_LOGIN_SUCCESS;
  payload: {
    user: User;
    token: string;
  };
}

export interface LoginFailureAction {
  type: typeof AUTH_LOGIN_FAILURE;
  payload: string;
}

export interface RegisterRequestAction {
  type: typeof AUTH_REGISTER_REQUEST;
  payload: {
    name: string;
    lastname: string;
    nickname: string;
    email: string;
    password: string;
    number: string;
    platform: 'PS5' | 'XBOX' | 'PC';
    positions: string[];
    registerCode: string;
  };
}

export interface RegisterSuccessAction {
  type: typeof AUTH_REGISTER_SUCCESS;
}

export interface RegisterFailureAction {
  type: typeof AUTH_REGISTER_FAILURE;
  payload: string;
}

export interface LogoutAction {
  type: typeof AUTH_LOGOUT;
}

export interface RestoreSessionAction {
  type: typeof AUTH_RESTORE_SESSION;
  payload: string;
}

export interface GetMeRequestAction {
  type: typeof AUTH_GET_ME_REQUEST;
}

export interface GetMeSuccessAction {
  type: typeof AUTH_GET_ME_SUCCESS;
  payload: User;
}

export interface GetMeFailureAction {
  type: typeof AUTH_GET_ME_FAILURE;
  payload: string;
}

export type AuthActionTypes =
  | LoginRequestAction
  | LoginSuccessAction
  | LoginFailureAction
  | RegisterRequestAction
  | RegisterSuccessAction
  | RegisterFailureAction
  | LogoutAction
  | RestoreSessionAction
  | GetMeRequestAction
  | GetMeSuccessAction
  | GetMeFailureAction;
