import { all, put, call, takeEvery } from 'redux-saga/effects';
import {
  updateSubjectRoutine,
  deleteSubjectRoutine,
  loadAllSubjectsRoutine,
  loadSubjectRoutine
} from './routines';
import apiClient from '../../helpers/webApi.helper';

function* updateSubject(action: any) {
  const data = action.payload;
  console.log({ data });
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
    console.log({ parsedData });
    yield put(updateSubjectRoutine.success(parsedData));
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

function* deleteSubject(action: any) {
  console.log(action.payload);
  const { id, subjectId } = action.payload;
  console.log({ id });
  if (!id) {
    return;
  }
  try {
    yield apiClient.delete({ endpoint: `/subject/${id}` });
    yield call(loadAllSubjects);
    if (id === subjectId) {
      yield put(loadSubjectRoutine.success(undefined));
    }
  } catch(error) {
    console.log('Error with subject deleting');
    console.log(error);
  }
}

export default function* subjectSaga() {
  yield all([
    yield takeEvery(updateSubjectRoutine.TRIGGER, updateSubject),
    yield takeEvery(loadAllSubjectsRoutine.TRIGGER, loadAllSubjects),
    yield takeEvery(loadSubjectRoutine.TRIGGER, loadSubject),
    yield takeEvery(deleteSubjectRoutine.TRIGGER, deleteSubject)
  ]);
}