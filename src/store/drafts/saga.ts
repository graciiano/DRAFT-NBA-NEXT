import { draftsService } from '@/services/drafts/drafts';
import { call, put, takeLatest } from 'redux-saga/effects';

import {
  fetchDraftDetailFailure,
  fetchDraftDetailSuccess,
  fetchDraftsFailure,
  fetchDraftsSuccess,
  signupDraftFailure,
  signupDraftSuccess,
} from './duck';
import {
  DRAFTS_FETCH_REQUEST,
  DRAFT_DETAIL_REQUEST,
  DRAFT_SIGNUP_REQUEST,
  FetchDraftDetailRequestAction,
  SignupDraftRequestAction,
} from './types';

// Worker Saga: Fetch Drafts
function* fetchDraftsSaga() {
  try {
    const response: Awaited<ReturnType<typeof draftsService.getDrafts>> = yield call(draftsService.getDrafts);
    yield put(fetchDraftsSuccess(response));
  } catch (error: any) {
    const errorMessage = error.response?.data?.message || 'Erro ao buscar drafts';
    yield put(fetchDraftsFailure(errorMessage));
  }
}

// Worker Saga: Fetch Draft Detail
function* fetchDraftDetailSaga(action: FetchDraftDetailRequestAction) {
  try {
    const response: Awaited<ReturnType<typeof draftsService.getDraftDetail>> = yield call(
      draftsService.getDraftDetail,
      action.payload
    );
    yield put(fetchDraftDetailSuccess(response));
  } catch (error: any) {
    const errorMessage = error.response?.data?.message || 'Erro ao buscar detalhes do draft';
    yield put(fetchDraftDetailFailure(errorMessage));
  }
}

// Worker Saga: Signup Draft
function* signupDraftSaga(action: SignupDraftRequestAction) {
  try {
    yield call(draftsService.signupDraft, action.payload.draftId, {
      desiredPositions: action.payload.desiredPositions as any,
    });
    yield put(signupDraftSuccess());
  } catch (error: any) {
    const errorMessage = error.response?.data?.message || 'Erro ao inscrever no draft';
    yield put(signupDraftFailure(errorMessage));
  }
}

// Watcher Saga
export default function* draftsSaga() {
  yield takeLatest(DRAFTS_FETCH_REQUEST, fetchDraftsSaga);
  yield takeLatest(DRAFT_DETAIL_REQUEST, fetchDraftDetailSaga);
  yield takeLatest(DRAFT_SIGNUP_REQUEST, signupDraftSaga);
}
