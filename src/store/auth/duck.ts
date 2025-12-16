import {
  AUTH_GET_ME_FAILURE,
  AUTH_GET_ME_REQUEST,
  AUTH_GET_ME_SUCCESS,
  AUTH_LOGIN_FAILURE,
  AUTH_LOGIN_REQUEST,
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGOUT,
  AUTH_REGISTER_FAILURE,
  AUTH_REGISTER_REQUEST,
  AUTH_REGISTER_SUCCESS,
  AUTH_RESTORE_SESSION,
  AuthActionTypes,
  AuthState,
  LoginRequestAction,
  RegisterRequestAction,
  RestoreSessionAction,
} from './types';

// Initial State
const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

// Reducer
export default function authReducer(state = initialState, action: AuthActionTypes): AuthState {
  switch (action.type) {
    case AUTH_LOGIN_REQUEST:
    case AUTH_REGISTER_REQUEST:
    case AUTH_GET_ME_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case AUTH_LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isAuthenticated: true,
        loading: false,
        error: null,
      };

    case AUTH_REGISTER_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
      };

    case AUTH_LOGIN_FAILURE:
    case AUTH_REGISTER_FAILURE:
    case AUTH_GET_ME_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case AUTH_LOGOUT:
      return {
        ...initialState,
      };

    case AUTH_RESTORE_SESSION:
      return {
        ...state,
        token: action.payload,
        isAuthenticated: true,
      };

    case AUTH_GET_ME_SUCCESS:
      return {
        ...state,
        user: action.payload,
        loading: false,
        error: null,
      };

    default:
      return state;
  }
}

// Action Creators
export const loginRequest = (email: string, password: string): LoginRequestAction => ({
  type: AUTH_LOGIN_REQUEST,
  payload: { email, password },
});

export const loginSuccess = (user: any, token: string) => ({
  type: AUTH_LOGIN_SUCCESS,
  payload: { user, token },
});

export const loginFailure = (error: string) => ({
  type: AUTH_LOGIN_FAILURE,
  payload: error,
});

export const registerRequest = (data: {
  name: string;
  lastname: string;
  nickname: string;
  email: string;
  password: string;
  number: string;
  platform: 'PS5' | 'XBOX' | 'PC';
  positions: string[];
  registerCode: string;
}): RegisterRequestAction => ({
  type: AUTH_REGISTER_REQUEST,
  payload: data,
});

export const registerSuccess = () => ({
  type: AUTH_REGISTER_SUCCESS,
});

export const registerFailure = (error: string) => ({
  type: AUTH_REGISTER_FAILURE,
  payload: error,
});

export const logout = () => ({
  type: AUTH_LOGOUT,
});

export const restoreSession = (token: string): RestoreSessionAction => ({
  type: AUTH_RESTORE_SESSION,
  payload: token,
});

export const getMeRequest = () => ({
  type: AUTH_GET_ME_REQUEST,
});

export const getMeSuccess = (user: any) => ({
  type: AUTH_GET_ME_SUCCESS,
  payload: user,
});

export const getMeFailure = (error: string) => ({
  type: AUTH_GET_ME_FAILURE,
  payload: error,
});
