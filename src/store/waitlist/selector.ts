import { WaitlistEntry } from '@/types/api';
import { createSelector } from '@reduxjs/toolkit';

import { RootState } from '../index';
import { WaitlistState } from './types';

// Base selector
const selectWaitlistState = (state: RootState) => state.waitlist;

// Memoized selectors
export const selectWaitlistEntries = createSelector(
  [selectWaitlistState],
  (waitlist: WaitlistState) => waitlist.entries
);

export const selectWaitlistLoading = createSelector(
  [selectWaitlistState],
  (waitlist: WaitlistState) => waitlist.loading
);

export const selectWaitlistError = createSelector([selectWaitlistState], (waitlist: WaitlistState) => waitlist.error);

export const selectAssignLoading = createSelector(
  [selectWaitlistState],
  (waitlist: WaitlistState) => waitlist.assignLoading
);

export const selectAssignError = createSelector(
  [selectWaitlistState],
  (waitlist: WaitlistState) => waitlist.assignError
);

export const selectPendingEntries = createSelector([selectWaitlistEntries], (entries: WaitlistEntry[]) =>
  entries.filter((entry: WaitlistEntry) => entry.status === 'WAITLIST')
);

export const selectApprovedEntries = createSelector([selectWaitlistEntries], (entries: WaitlistEntry[]) =>
  entries.filter((entry: WaitlistEntry) => entry.status === 'APPROVED')
);
