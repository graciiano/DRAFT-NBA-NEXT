import { WaitlistEntry } from '@/types/api';

// Action Types
export const WAITLIST_FETCH_REQUEST = 'waitlist/FETCH_REQUEST';
export const WAITLIST_FETCH_SUCCESS = 'waitlist/FETCH_SUCCESS';
export const WAITLIST_FETCH_FAILURE = 'waitlist/FETCH_FAILURE';

export const WAITLIST_ASSIGN_REQUEST = 'waitlist/ASSIGN_REQUEST';
export const WAITLIST_ASSIGN_SUCCESS = 'waitlist/ASSIGN_SUCCESS';
export const WAITLIST_ASSIGN_FAILURE = 'waitlist/ASSIGN_FAILURE';

export const WAITLIST_UPDATED = 'waitlist/UPDATED';

// State Interface
export interface WaitlistState {
  entries: WaitlistEntry[];
  loading: boolean;
  error: string | null;
  assignLoading: boolean;
  assignError: string | null;
}

// Action Interfaces
export interface FetchWaitlistRequestAction {
  type: typeof WAITLIST_FETCH_REQUEST;
  payload: number;
}

export interface FetchWaitlistSuccessAction {
  type: typeof WAITLIST_FETCH_SUCCESS;
  payload: WaitlistEntry[];
}

export interface FetchWaitlistFailureAction {
  type: typeof WAITLIST_FETCH_FAILURE;
  payload: string;
}

export interface AssignPositionRequestAction {
  type: typeof WAITLIST_ASSIGN_REQUEST;
  payload: {
    draftId: number;
    signupId: number;
    assignedPosition: string;
  };
}

export interface AssignPositionSuccessAction {
  type: typeof WAITLIST_ASSIGN_SUCCESS;
}

export interface AssignPositionFailureAction {
  type: typeof WAITLIST_ASSIGN_FAILURE;
  payload: string;
}

export interface WaitlistUpdatedAction {
  type: typeof WAITLIST_UPDATED;
  payload: WaitlistEntry[];
}

export type WaitlistActionTypes =
  | FetchWaitlistRequestAction
  | FetchWaitlistSuccessAction
  | FetchWaitlistFailureAction
  | AssignPositionRequestAction
  | AssignPositionSuccessAction
  | AssignPositionFailureAction
  | WaitlistUpdatedAction;
