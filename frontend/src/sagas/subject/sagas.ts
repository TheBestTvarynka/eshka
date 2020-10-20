import { all, put, call, takeEvery } from 'redux-saga/effects';
import {
  createSubjectRoutine,
  loadAllSubjectsRoutine,
  loadSubjectRoutine
} from './routines';
import apiClient from '../../helpers/webApi.helper';

function* createSubject(action: any) {
  const data = action.payload;
  try {
    const res = yield apiClient.post({ endpoint: '/subject', body: data });
    const parsedData = yield res.json();
    console.log({ parsedData });
    yield put(createSubjectRoutine.success(parsedData));
    yield call(loadAllSubjects);
  } catch(error) {
    console.log('Error with subject creation');
    console.log(error);
  }
}

function* loadAllSubjects() {
  console.log('Load all subjects');
  try {
    const res = yield apiClient.get({ endpoint: '/subject' });
    const parsedData = yield res.json();
    console.log({ parsedData });
    yield put(loadAllSubjectsRoutine.success(parsedData));
  } catch(error) {
    console.log('Error with loading subjects');
    console.log(error);
  }
}

function* loadSubject(action: any) {
  console.log('Load subject');
  const id = action.payload;
  console.log({ id });
  try {
    const res = yield apiClient.get({ endpoint: `/subject/${id}` });
    const parsedData = yield res.json();
    console.log({ parsedData });
    yield put(loadSubjectRoutine.success(parsedData));
  } catch(error) {
    console.log('Error with subject loading');
    console.log(error);
  }
}

export default function* subjectSaga() {
  yield all([
    yield takeEvery(createSubjectRoutine.TRIGGER, createSubject),
    yield takeEvery(loadAllSubjectsRoutine.TRIGGER, loadAllSubjects),
    yield takeEvery(loadSubjectRoutine.TRIGGER, loadSubject)
  ]);
}