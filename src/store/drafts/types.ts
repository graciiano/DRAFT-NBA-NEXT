import { Draft, DraftDetail } from '@/types/api';

// Action Types
export const DRAFTS_FETCH_REQUEST = 'drafts/FETCH_REQUEST';
export const DRAFTS_FETCH_SUCCESS = 'drafts/FETCH_SUCCESS';
export const DRAFTS_FETCH_FAILURE = 'drafts/FETCH_FAILURE';

export const DRAFT_DETAIL_REQUEST = 'drafts/DETAIL_REQUEST';
export const DRAFT_DETAIL_SUCCESS = 'drafts/DETAIL_SUCCESS';
export const DRAFT_DETAIL_FAILURE = 'drafts/DETAIL_FAILURE';

export const DRAFT_SIGNUP_REQUEST = 'drafts/SIGNUP_REQUEST';
export const DRAFT_SIGNUP_SUCCESS = 'drafts/SIGNUP_SUCCESS';
export const DRAFT_SIGNUP_FAILURE = 'drafts/SIGNUP_FAILURE';

// State Interface
export interface DraftsState {
  drafts: Draft[];
  currentDraft: DraftDetail | null;
  loading: boolean;
  error: string | null;
  signupLoading: boolean;
  signupError: string | null;
}

// Action Interfaces
export interface FetchDraftsRequestAction {
  type: typeof DRAFTS_FETCH_REQUEST;
}

export interface FetchDraftsSuccessAction {
  type: typeof DRAFTS_FETCH_SUCCESS;
  payload: Draft[];
}

export interface FetchDraftsFailureAction {
  type: typeof DRAFTS_FETCH_FAILURE;
  payload: string;
}

export interface FetchDraftDetailRequestAction {
  type: typeof DRAFT_DETAIL_REQUEST;
  payload: number;
}

export interface FetchDraftDetailSuccessAction {
  type: typeof DRAFT_DETAIL_SUCCESS;
  payload: DraftDetail;
}

export interface FetchDraftDetailFailureAction {
  type: typeof DRAFT_DETAIL_FAILURE;
  payload: string;
}

export interface SignupDraftRequestAction {
  type: typeof DRAFT_SIGNUP_REQUEST;
  payload: {
    draftId: number;
    desiredPositions: string[];
  };
}

export interface SignupDraftSuccessAction {
  type: typeof DRAFT_SIGNUP_SUCCESS;
}

export interface SignupDraftFailureAction {
  type: typeof DRAFT_SIGNUP_FAILURE;
  payload: string;
}

export type DraftsActionTypes =
  | FetchDraftsRequestAction
  | FetchDraftsSuccessAction
  | FetchDraftsFailureAction
  | FetchDraftDetailRequestAction
  | FetchDraftDetailSuccessAction
  | FetchDraftDetailFailureAction
  | SignupDraftRequestAction
  | SignupDraftSuccessAction
  | SignupDraftFailureAction;
