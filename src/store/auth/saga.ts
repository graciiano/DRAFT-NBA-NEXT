import { authService } from '@/services/auth/auth';
import { tokenStorage } from '@/utils/token';
import { call, put, takeLatest } from 'redux-saga/effects';

import { loginFailure, loginSuccess, registerFailure, registerSuccess } from './duck';
import { AUTH_LOGIN_REQUEST, AUTH_REGISTER_REQUEST, LoginRequestAction, RegisterRequestAction } from './types';

// Worker Saga: Login
function* loginSaga(action: LoginRequestAction) {
  try {
    const response: Awaited<ReturnType<typeof authService.login>> = yield call(authService.login, action.payload);

    // Salvar token no localStorage
    tokenStorage.set(response.token);

    yield put(loginSuccess(response.user, response.token));
  } catch (error: any) {
    const errorMessage = error.response?.data?.message || 'Erro ao fazer login';
    yield put(loginFailure(errorMessage));
  }
}

// Worker Saga: Register
function* registerSaga(action: RegisterRequestAction) {
  try {
    yield call(authService.register, action.payload);
    yield put(registerSuccess());
  } catch (error: any) {
    const errorMessage = error.response?.data?.message || 'Erro ao registrar';
    yield put(registerFailure(errorMessage));
  }
}

// Watcher Saga
export default function* authSaga() {
  yield takeLatest(AUTH_LOGIN_REQUEST, loginSaga);
  yield takeLatest(AUTH_REGISTER_REQUEST, registerSaga);
}
