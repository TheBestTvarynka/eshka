import { all, put, takeEvery } from 'redux-saga/effects';
import {
  loadTeamRoutine,
  loadTeamsRoutine,
  updateTeamRoutine
} from './routines';
import apiClient from '../../helpers/webApi.helper';

function* loadTeams() {
  try {
    const res = yield apiClient.get({ endpoint: '/team/all' });
    const parsedData = yield res.json();
    yield put(loadTeamsRoutine.success(parsedData));
  } catch (error) {
    yield put(loadTeamsRoutine.failure());
    console.log('Error with teams loading!');
    console.log(error);
  }
}

export default function* teamSagas() {
  yield all([
    takeEvery(loadTeamsRoutine.TRIGGER, loadTeams)
  ]);
}
