import { createSelector } from '@reduxjs/toolkit';

import { RootState } from '../index';

// Base selector
const selectDraftsState = (state: RootState) => state.drafts;

// Memoized selectors
export const selectDrafts = createSelector([selectDraftsState], drafts => drafts.drafts);

export const selectCurrentDraft = createSelector([selectDraftsState], drafts => drafts.currentDraft);

export const selectDraftsLoading = createSelector([selectDraftsState], drafts => drafts.loading);

export const selectDraftsError = createSelector([selectDraftsState], drafts => drafts.error);

export const selectSignupLoading = createSelector([selectDraftsState], drafts => drafts.signupLoading);

export const selectSignupError = createSelector([selectDraftsState], drafts => drafts.signupError);

export const selectOpenDrafts = createSelector([selectDrafts], drafts =>
  drafts.filter(draft => draft.status === 'OPEN')
);
