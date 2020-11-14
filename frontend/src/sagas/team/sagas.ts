import { all, put, takeEvery } from 'redux-saga/effects';
import {
  loadTeamRoutine,
  loadTeamsRoutine,
  updateTeamRoutine
} from './routines';
import apiClient from '../../helpers/webApi.helper';
import { toastr } from 'react-redux-toastr';
import { ISubjectShort } from '../../models/subject';

function* loadTeams() {
  try {
    const res = yield apiClient.get({ endpoint: '/team' });
    const parsedData = yield res.json();
    yield put(loadTeamsRoutine.success(parsedData));
  } catch (error) {
    yield put(loadTeamsRoutine.failure());
    toastr.error(error.toString(), "");
    console.log('Error with teams loading!');
    console.log(error);
  }
}

function* loadTeam(action: any) {
  const id = action.payload;
  try {
    const res = yield apiClient.get({ endpoint: `/team/${id}/full` });
    const parsedData = yield res.json();
    const subjects = parsedData.subjects.map((s: any) => ({
      id: s.id,
      title: s.title
    } as ISubjectShort));
    yield put(loadTeamRoutine.success({ ...parsedData, subjects }));
  } catch (error) {
    yield put(loadTeamRoutine.failure());
    toastr.error(error.toString(), "");
    console.log('Error with team loading!');
    console.log(error);
  }
}

function* updateTeam(action: any) {
  const data = action.payload;
  try {
    let res;
    if (data.id) {
      // update the team
      res = yield apiClient.put({ endpoint: '/team', body: data });
    } else {
      // create a new team
      res = yield apiClient.post({ endpoint: '/team', body: data });
    }
    const parsedData = yield res.json();
    yield put(updateTeamRoutine.success(parsedData));
  } catch (error) {
    yield put(updateTeamRoutine.failure());
    toastr.error(error.toString(), "");
    console.log('Error with team updating');
    console.log(error);
  }
}

export default function* teamSagas() {
  yield all([
    takeEvery(loadTeamsRoutine.TRIGGER, loadTeams),
    takeEvery(loadTeamRoutine.TRIGGER, loadTeam),
    takeEvery(updateTeamRoutine.TRIGGER, updateTeam)
  ]);
}
