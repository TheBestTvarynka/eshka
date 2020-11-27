import { all, put, call, takeEvery } from 'redux-saga/effects';
import {
  updateSubjectRoutine,
  deleteSubjectRoutine,
  loadAllSubjectsRoutine,
  loadSubjectRoutine,
  loadSubjectQueuesRoutine
} from './routines';
import apiClient from '../../helpers/webApi.helper';
import { toastr } from 'react-redux-toastr';

function* updateSubject(action: any) {
  const data = action.payload;
  try {
    let res;
    if (data.id) {
      // update the subject
      res = yield apiClient.put({ endpoint: '/subject', body: data });
    } else {
      // create a new subject
      res = yield apiClient.post({ endpoint: '/subject', body: data });
    }
    const parsedData = yield res.json();
    yield put(updateSubjectRoutine.success(parsedData));

    yield call(loadAllSubjects, { payload: parsedData.teamId });
  } catch(error) {
    yield put(updateSubjectRoutine.failure());
    toastr.error(error.toString(), "");
    console.log('Error with subject creation');
    console.log(error);
  }
}

function* loadAllSubjects(action: any) {
  const teamId = action.payload;
  try {
    const res = yield apiClient.get({ endpoint: `/subject/team/${teamId}` });
    const parsedData = yield res.json();
    yield put(loadAllSubjectsRoutine.success(parsedData));
  } catch(error) {
    yield put(loadAllSubjectsRoutine.failure());
    toastr.error(error.toString(), "")
    console.log('Error with loading subjects');
    console.log(error);
  }
}

function* loadSubject(action: any) {
  const id = action.payload;
  try {
    const res = yield apiClient.get({ endpoint: `/subject/${id}` });
    const parsedData = yield res.json();
    yield put(loadSubjectRoutine.success(parsedData));
  } catch(error) {
    yield put(loadSubjectRoutine.failure());
    toastr.error(error.toString(), "")
    console.log('Error with subject loading');
    console.log(error);
  }
}

function* deleteSubject(action: any) {
  const { id, teamId } = action.payload;
  if (!id) {
    return;
  }
  try {
    yield apiClient.delete({ endpoint: `/subject/${id}` });
    yield call(loadAllSubjects, { payload: teamId });
    yield put(loadSubjectRoutine.success(undefined));
  } catch(error) {
    toastr.error(error.toString(), "")
    console.log('Error with subject deleting');
    console.log(error);
  }
}

function* loadSubjectQueues(action: any) {
  const subjectId = action.payload;
  try {
    const res = yield apiClient.get({ endpoint: `/queue/all?subjectId=${subjectId}` });
    const parsedData = yield res.json();
    console.log({ parsedData });
    console.log(parsedData.map((queue: any) => ({
      id: queue.id,
      title: queue.title,
      isOpen: !queue.closingDate
    })));
    yield put(loadSubjectQueuesRoutine.success(parsedData.map((queue: any) => ({
      id: queue.id,
      title: queue.title,
      isOpen: !queue.closingDate
    }))));
  } catch(error) {
    yield put(loadSubjectQueuesRoutine.failure());
    toastr.error(error.toString(), "")
    console.log('Error with subject queues loading');
    console.log(error);
  }
}

export default function* subjectSagas() {
  yield all([
    yield takeEvery(updateSubjectRoutine.TRIGGER, updateSubject),
    yield takeEvery(loadAllSubjectsRoutine.TRIGGER, loadAllSubjects),
    yield takeEvery(loadSubjectRoutine.TRIGGER, loadSubject),
    yield takeEvery(loadSubjectQueuesRoutine.TRIGGER, loadSubjectQueues),
    yield takeEvery(deleteSubjectRoutine.TRIGGER, deleteSubject)
  ]);
}