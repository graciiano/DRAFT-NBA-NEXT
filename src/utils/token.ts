// Utility para gerenciar token JWT
const TOKEN_KEY = '@NBA2KDraft:token';

export interface TokenPayload {
  sub: string;
  email: string;
  roles: string[];
  name: string;
  lastName: string;
  nickname: string;
  number: string;
  iat: number;
  exp: number;
}

export const tokenStorage = {
  get: (): string | null => {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem(TOKEN_KEY);
  },

  set: (token: string): void => {
    if (typeof window === 'undefined') return;
    localStorage.setItem(TOKEN_KEY, token);
  },

  remove: (): void => {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(TOKEN_KEY);
  },
};

export const isTokenValid = (token: string | null): boolean => {
  if (!token) return false;

  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const exp = payload.exp * 1000; // Convert to milliseconds
    return Date.now() < exp;
  } catch {
    return false;
  }
};

export const decodeToken = (token: string): TokenPayload | null => {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload;
  } catch {
    return null;
  }
};

export const getUserFromToken = (token: string): any | null => {
  const payload = decodeToken(token);
  if (!payload) return null;

  return {
    email: payload.email,
    name: payload.name,
    lastname: payload.lastName,
    nickname: payload.nickname,
    number: payload.number,
    roles: payload.roles,
  };
};
