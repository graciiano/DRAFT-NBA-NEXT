import { User } from '@/types/api';
import { createSelector } from '@reduxjs/toolkit';

import { RootState } from '../index';
import { AuthState } from './types';

// Base selector
const selectAuthState = (state: RootState) => state.auth;

// Memoized selectors
export const selectUser = createSelector([selectAuthState], (auth: AuthState) => auth.user);

export const selectToken = createSelector([selectAuthState], (auth: AuthState) => auth.token);

export const selectIsAuthenticated = createSelector([selectAuthState], (auth: AuthState) => auth.isAuthenticated);

export const selectAuthLoading = createSelector([selectAuthState], (auth: AuthState) => auth.loading);

export const selectAuthError = createSelector([selectAuthState], (auth: AuthState) => auth.error);

export const selectUserRoles = createSelector([selectUser], (user: User | null) => user?.roles || []);

export const selectIsAdmin = createSelector([selectUserRoles], (roles: string[]) => roles.includes('ROLE_ADMIN'));

export const selectIsOrganizer = createSelector([selectUserRoles], (roles: string[]) =>
  roles.includes('ROLE_ORGANIZER')
);
