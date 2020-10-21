import { all } from 'redux-saga/effects';
import authSagas from './auth/sagas';
import subjectSaga from './subject/sagas';
import queueSaga from './queue/sagas';

export default function* rootSaga() {
  yield all([
    authSagas(),
    subjectSaga(),
    queueSaga()
  ]);
}