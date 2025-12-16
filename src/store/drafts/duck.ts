import {
  DRAFTS_FETCH_FAILURE,
  DRAFTS_FETCH_REQUEST,
  DRAFTS_FETCH_SUCCESS,
  DRAFT_DETAIL_FAILURE,
  DRAFT_DETAIL_REQUEST,
  DRAFT_DETAIL_SUCCESS,
  DRAFT_SIGNUP_FAILURE,
  DRAFT_SIGNUP_REQUEST,
  DRAFT_SIGNUP_SUCCESS,
  DraftsActionTypes,
  DraftsState,
} from './types';

// Initial State
const initialState: DraftsState = {
  drafts: [],
  currentDraft: null,
  loading: false,
  error: null,
  signupLoading: false,
  signupError: null,
};

// Reducer
export default function draftsReducer(state = initialState, action: DraftsActionTypes): DraftsState {
  switch (action.type) {
    case DRAFTS_FETCH_REQUEST:
    case DRAFT_DETAIL_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case DRAFTS_FETCH_SUCCESS:
      return {
        ...state,
        drafts: action.payload,
        loading: false,
        error: null,
      };

    case DRAFT_DETAIL_SUCCESS:
      return {
        ...state,
        currentDraft: action.payload,
        loading: false,
        error: null,
      };

    case DRAFTS_FETCH_FAILURE:
    case DRAFT_DETAIL_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case DRAFT_SIGNUP_REQUEST:
      return {
        ...state,
        signupLoading: true,
        signupError: null,
      };

    case DRAFT_SIGNUP_SUCCESS:
      return {
        ...state,
        signupLoading: false,
        signupError: null,
      };

    case DRAFT_SIGNUP_FAILURE:
      return {
        ...state,
        signupLoading: false,
        signupError: action.payload,
      };

    default:
      return state;
  }
}

// Action Creators
export const fetchDraftsRequest = () => ({
  type: DRAFTS_FETCH_REQUEST,
});

export const fetchDraftsSuccess = (drafts: any[]) => ({
  type: DRAFTS_FETCH_SUCCESS,
  payload: drafts,
});

export const fetchDraftsFailure = (error: string) => ({
  type: DRAFTS_FETCH_FAILURE,
  payload: error,
});

export const fetchDraftDetailRequest = (draftId: number) => ({
  type: DRAFT_DETAIL_REQUEST,
  payload: draftId,
});

export const fetchDraftDetailSuccess = (draft: any) => ({
  type: DRAFT_DETAIL_SUCCESS,
  payload: draft,
});

export const fetchDraftDetailFailure = (error: string) => ({
  type: DRAFT_DETAIL_FAILURE,
  payload: error,
});

export const signupDraftRequest = (draftId: number, desiredPositions: string[]) => ({
  type: DRAFT_SIGNUP_REQUEST,
  payload: { draftId, desiredPositions },
});

export const signupDraftSuccess = () => ({
  type: DRAFT_SIGNUP_SUCCESS,
});

export const signupDraftFailure = (error: string) => ({
  type: DRAFT_SIGNUP_FAILURE,
  payload: error,
});
