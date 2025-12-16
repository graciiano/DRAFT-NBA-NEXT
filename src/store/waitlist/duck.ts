import {
  WAITLIST_ASSIGN_FAILURE,
  WAITLIST_ASSIGN_REQUEST,
  WAITLIST_ASSIGN_SUCCESS,
  WAITLIST_FETCH_FAILURE,
  WAITLIST_FETCH_REQUEST,
  WAITLIST_FETCH_SUCCESS,
  WAITLIST_UPDATED,
  WaitlistActionTypes,
  WaitlistState,
} from './types';

// Initial State
const initialState: WaitlistState = {
  entries: [],
  loading: false,
  error: null,
  assignLoading: false,
  assignError: null,
};

// Reducer
export default function waitlistReducer(state = initialState, action: WaitlistActionTypes): WaitlistState {
  switch (action.type) {
    case WAITLIST_FETCH_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case WAITLIST_FETCH_SUCCESS:
      return {
        ...state,
        entries: action.payload,
        loading: false,
        error: null,
      };

    case WAITLIST_FETCH_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case WAITLIST_ASSIGN_REQUEST:
      return {
        ...state,
        assignLoading: true,
        assignError: null,
      };

    case WAITLIST_ASSIGN_SUCCESS:
      return {
        ...state,
        assignLoading: false,
        assignError: null,
      };

    case WAITLIST_ASSIGN_FAILURE:
      return {
        ...state,
        assignLoading: false,
        assignError: action.payload,
      };

    case WAITLIST_UPDATED:
      return {
        ...state,
        entries: action.payload,
      };

    default:
      return state;
  }
}

// Action Creators
export const fetchWaitlistRequest = (draftId: number) => ({
  type: WAITLIST_FETCH_REQUEST,
  payload: draftId,
});

export const fetchWaitlistSuccess = (entries: any[]) => ({
  type: WAITLIST_FETCH_SUCCESS,
  payload: entries,
});

export const fetchWaitlistFailure = (error: string) => ({
  type: WAITLIST_FETCH_FAILURE,
  payload: error,
});

export const assignPositionRequest = (draftId: number, signupId: number, assignedPosition: string) => ({
  type: WAITLIST_ASSIGN_REQUEST,
  payload: { draftId, signupId, assignedPosition },
});

export const assignPositionSuccess = () => ({
  type: WAITLIST_ASSIGN_SUCCESS,
});

export const assignPositionFailure = (error: string) => ({
  type: WAITLIST_ASSIGN_FAILURE,
  payload: error,
});

export const waitlistUpdated = (entries: any[]) => ({
  type: WAITLIST_UPDATED,
  payload: entries,
});
