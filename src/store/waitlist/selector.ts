import { createSelector } from '@reduxjs/toolkit';

import { RootState } from '../index';

// Base selector
const selectWaitlistState = (state: RootState) => state.waitlist;

// Memoized selectors
export const selectWaitlistEntries = createSelector([selectWaitlistState], waitlist => waitlist.entries);

export const selectWaitlistLoading = createSelector([selectWaitlistState], waitlist => waitlist.loading);

export const selectWaitlistError = createSelector([selectWaitlistState], waitlist => waitlist.error);

export const selectAssignLoading = createSelector([selectWaitlistState], waitlist => waitlist.assignLoading);

export const selectAssignError = createSelector([selectWaitlistState], waitlist => waitlist.assignError);

export const selectPendingEntries = createSelector([selectWaitlistEntries], entries =>
  entries.filter(entry => entry.status === 'WAITLIST')
);

export const selectApprovedEntries = createSelector([selectWaitlistEntries], entries =>
  entries.filter(entry => entry.status === 'APPROVED')
);
