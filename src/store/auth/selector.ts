import { createSelector } from '@reduxjs/toolkit';

import { RootState } from '../index';

// Base selector
const selectAuthState = (state: RootState) => state.auth;

// Memoized selectors
export const selectUser = createSelector([selectAuthState], auth => auth.user);

export const selectToken = createSelector([selectAuthState], auth => auth.token);

export const selectIsAuthenticated = createSelector([selectAuthState], auth => auth.isAuthenticated);

export const selectAuthLoading = createSelector([selectAuthState], auth => auth.loading);

export const selectAuthError = createSelector([selectAuthState], auth => auth.error);

export const selectUserRoles = createSelector([selectUser], user => user?.roles || []);

export const selectIsAdmin = createSelector([selectUserRoles], roles => roles.includes('ROLE_ADMIN'));

export const selectIsOrganizer = createSelector([selectUserRoles], roles => roles.includes('ROLE_ORGANIZER'));
