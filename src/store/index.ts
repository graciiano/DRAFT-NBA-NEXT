import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { all } from 'redux-saga/effects';

// Reducers
import authReducer from './auth/duck';
// Sagas
import authSaga from './auth/saga';
import draftsReducer from './drafts/duck';
import draftsSaga from './drafts/saga';
import waitlistReducer from './waitlist/duck';
import waitlistSaga from './waitlist/saga';

// Root Saga
function* rootSaga() {
  yield all([authSaga(), draftsSaga(), waitlistSaga()]);
}

// Create Saga Middleware
const sagaMiddleware = createSagaMiddleware();

// Create Store
export const store = configureStore({
  reducer: {
    auth: authReducer,
    drafts: draftsReducer,
    waitlist: waitlistReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      thunk: false,
      serializableCheck: false,
    }).concat(sagaMiddleware),
});

// Run Saga Middleware
sagaMiddleware.run(rootSaga);

// Types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
