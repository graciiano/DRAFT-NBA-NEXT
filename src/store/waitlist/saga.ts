import { waitlistService } from '@/services/waitlist/waitlist';
import { call, put, takeLatest } from 'redux-saga/effects';

import {
  assignPositionFailure,
  assignPositionSuccess,
  fetchWaitlistFailure,
  fetchWaitlistRequest,
  fetchWaitlistSuccess,
} from './duck';
import {
  AssignPositionRequestAction,
  FetchWaitlistRequestAction,
  WAITLIST_ASSIGN_REQUEST,
  WAITLIST_FETCH_REQUEST,
} from './types';

// Worker Saga: Fetch Waitlist
function* fetchWaitlistSaga(action: FetchWaitlistRequestAction) {
  try {
    const response: Awaited<ReturnType<typeof waitlistService.getWaitlist>> = yield call(
      waitlistService.getWaitlist,
      action.payload
    );
    yield put(fetchWaitlistSuccess(response));
  } catch (error: any) {
    const errorMessage = error.response?.data?.message || 'Erro ao buscar waitlist';
    yield put(fetchWaitlistFailure(errorMessage));
  }
}

// Worker Saga: Assign Position
function* assignPositionSaga(action: AssignPositionRequestAction) {
  try {
    yield call(waitlistService.assignPosition, action.payload.draftId, action.payload.signupId, {
      assignedPosition: action.payload.assignedPosition as any,
    });
    yield put(assignPositionSuccess());
    // Refresh waitlist after assignment
    yield put(fetchWaitlistRequest(action.payload.draftId));
  } catch (error: any) {
    const errorMessage = error.response?.data?.message || 'Erro ao atribuir posição';
    yield put(assignPositionFailure(errorMessage));
  }
}

// Watcher Saga
export default function* waitlistSaga() {
  yield takeLatest(WAITLIST_FETCH_REQUEST, fetchWaitlistSaga);
  yield takeLatest(WAITLIST_ASSIGN_REQUEST, assignPositionSaga);
}
