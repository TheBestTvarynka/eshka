import { all, put, takeEvery } from 'redux-saga/effects';
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
    put(createSubjectRoutine.success(parsedData));
  } catch(error) {
    console.log('Error with subject creation');
    console.log(error);
  }
}

function* loadAllSubjects() {
  try {
    const res = yield apiClient.get({ endpoint: '/subject' });
    const parsedData = yield res.json();
    console.log({ parsedData });
    put(loadAllSubjectsRoutine.success(parsedData));
  } catch(error) {
    console.log('Error with loading subjects');
    console.log(error);
  }
}

function* loadSubject(action: any) {
  const id = action.payload.id;
  console.log({ id });
  try {
    const res = yield apiClient.get({ endpoint: `/subject/${id}` });
    const parsedData = yield res.json();
    console.log({ parsedData });
    put(loadSubjectRoutine.success(parsedData));
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