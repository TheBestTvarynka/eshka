import { all } from 'redux-saga/effects';
import authSagas from './auth/sagas';

export default function* rootSaga() {
  yield all([
    authSagas()
  ]);
}