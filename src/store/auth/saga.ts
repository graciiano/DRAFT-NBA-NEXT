import { authService } from '@/services/auth/auth';
import { tokenStorage } from '@/utils/token';
import { call, put, takeLatest } from 'redux-saga/effects';

import {
  getMeFailure,
  getMeRequest,
  getMeSuccess,
  loginFailure,
  loginSuccess,
  registerFailure,
  registerSuccess,
} from './duck';
import {
  AUTH_GET_ME_REQUEST,
  AUTH_LOGIN_REQUEST,
  AUTH_REGISTER_REQUEST,
  LoginRequestAction,
  RegisterRequestAction,
} from './types';

// Worker Saga: Login
function* loginSaga(action: LoginRequestAction) {
  try {
    const response: Awaited<ReturnType<typeof authService.login>> = yield call(authService.login, action.payload);

    // Salvar token no localStorage
    tokenStorage.set(response.token);

    yield put(loginSuccess(response.user, response.token));

    // Buscar dados atualizados do usuário
    yield put(getMeRequest());
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

// Worker Saga: Get Me
function* getMeSaga() {
  try {
    const response: Awaited<ReturnType<typeof authService.getMe>> = yield call(authService.getMe);
    yield put(getMeSuccess(response));
  } catch (error: any) {
    const errorMessage = error.response?.data?.message || 'Erro ao buscar usuário';
    yield put(getMeFailure(errorMessage));
  }
}

// Watcher Saga
export default function* authSaga() {
  yield takeLatest(AUTH_LOGIN_REQUEST, loginSaga);
  yield takeLatest(AUTH_REGISTER_REQUEST, registerSaga);
  yield takeLatest(AUTH_GET_ME_REQUEST, getMeSaga);
}
