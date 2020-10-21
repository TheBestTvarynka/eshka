import { all, put, takeEvery } from 'redux-saga/effects';
import {
  loadClosedQueuesRoutine,
  loadOpenedQueuesRoutine
} from './routines';
import apiClient from '../../helpers/webApi.helper';

function* loadOpenedQueues(action: any) {
  const subjectId = action.payload;
  try {
    const res = yield apiClient.get({ endpoint: `/queue/all?opened=true&subjectId=${subjectId}` });
    const parsedData = yield res.json();
    console.log({ parsedData });
    yield put(loadOpenedQueuesRoutine.success(parsedData.map((item: any) => ({
      id: item.id,
      title: item.title
    }))));
  } catch(error) {
    console.log('Error with loading opened queues');
    console.log(error);
  }
}

function* loadClosedQueues(action: any) {
  const subjectId = action.payload;
  try {
    const res = yield apiClient.get({ endpoint: `/queue/all?opened=false&subjectId=${subjectId}` });
    const parsedData = yield res.json();
    console.log({ parsedData });
    yield put(loadClosedQueuesRoutine.success(parsedData.map((item: any) => ({
      id: item.id,
      title: item.title
    }))));
  } catch(error) {
    console.log('Error with loading closed queues');
    console.log(error);
  }
}

export default function* queueSaga() {
  yield all([
    yield takeEvery(loadOpenedQueuesRoutine.TRIGGER, loadOpenedQueues),
    yield takeEvery(loadClosedQueuesRoutine.TRIGGER, loadClosedQueues)
  ]);
}