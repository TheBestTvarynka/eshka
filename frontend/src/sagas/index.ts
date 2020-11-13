import { all } from 'redux-saga/effects';
import authSagas from './auth/sagas';
import subjectSagas from './subject/sagas';
import queueSagas from './queue/sagas';
import teamSagas from './team/sagas';

export default function* rootSaga() {
  yield all([
    authSagas(),
    subjectSagas(),
    queueSagas(),
    teamSagas()
  ]);
}