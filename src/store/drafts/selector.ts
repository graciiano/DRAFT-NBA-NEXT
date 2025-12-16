import { Draft } from '@/types/api';
import { createSelector } from '@reduxjs/toolkit';

import { RootState } from '../index';
import { DraftsState } from './types';

// Base selector
const selectDraftsState = (state: RootState) => state.drafts;

// Memoized selectors
export const selectDrafts = createSelector([selectDraftsState], (drafts: DraftsState) => drafts.drafts);

export const selectCurrentDraft = createSelector([selectDraftsState], (drafts: DraftsState) => drafts.currentDraft);

export const selectDraftsLoading = createSelector([selectDraftsState], (drafts: DraftsState) => drafts.loading);

export const selectDraftsError = createSelector([selectDraftsState], (drafts: DraftsState) => drafts.error);

export const selectSignupLoading = createSelector([selectDraftsState], (drafts: DraftsState) => drafts.signupLoading);

export const selectSignupError = createSelector([selectDraftsState], (drafts: DraftsState) => drafts.signupError);

export const selectOpenDrafts = createSelector([selectDrafts], (drafts: Draft[]) =>
  drafts.filter((draft: Draft) => draft.status === 'OPEN')
);
