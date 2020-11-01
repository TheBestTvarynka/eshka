import { all, put, call, takeEvery } from 'redux-saga/effects';
import {
  loadClosedQueuesRoutine,
  loadOpenedQueuesRoutine,
  loadQueueRoutine,
  turnInQueueRoutine,
  loadQueueMembersRoutine,
  updateQueueRoutine
} from './routines';
import apiClient from '../../helpers/webApi.helper';
import dateTimeHelper from '../../helpers/dateTimeHelper';

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

function* loadQueue(action: any) {
  const id = action.payload;
  try {
    const res = yield apiClient.get({ endpoint: `/queue/${id}` });
    let parsedData = yield res.json();
    parsedData.creationDate = dateTimeHelper.dateFromRaw(parsedData.creationDate);
    parsedData.endDate = dateTimeHelper.dateFromRaw(parsedData.endDate);
    parsedData.startDate = dateTimeHelper.dateFromRaw(parsedData.startDate);
    parsedData.closingDate = dateTimeHelper.dateFromRaw(parsedData.closingDate);
    yield put(loadQueueRoutine.success(parsedData));
  } catch(error) {
    console.log('Error with queue loading');
    console.log(error);
  }
}

function* turnIn(action: any) {
  const { queueId, userId } = action.payload;
  console.log({ queueId, userId });
  if (!queueId || !userId) {
    return;
  }
  try {
    yield apiClient.post({ endpoint: '/queue-details', body: { queueId, userId, passed: false } });
    yield call(loadQueueMembers, { payload: queueId});
  } catch(error) {
    console.log('Error with turning in');
    console.log(error);
  }
}

function* loadQueueMembers(action: any) {
  const id = action.payload;
  try {
    const res = yield apiClient.get({ endpoint: `/queue-details/${id}` });
    const parsedData = yield res.json();
    yield put(loadQueueMembersRoutine.success(parsedData));
  } catch(error) {
    console.log('Error with queue members loading');
    console.log(error);
  }
}

function* updateQueue(action: any) {
  const data = action.payload;
  const subjectId = action.payload?.subjectId;
  console.log({ data });
  console.log({ subjectId });
  try {
    let res;
    if (data?.id) {
      // update
      console.log('update');
      res = yield apiClient.put({ endpoint: '/queue', body: data });
    } else {
      // create
      console.log('create');
      res = yield apiClient.post({ endpoint: '/queue', body: data });
    }
    let parsedData = yield res.json();
    parsedData.creationDate = dateTimeHelper.dateFromRaw(parsedData.creationDate);
    parsedData.endDate = dateTimeHelper.dateFromRaw(parsedData.endDate);
    parsedData.startDate = dateTimeHelper.dateFromRaw(parsedData.startDate);
    parsedData.closeDate = dateTimeHelper.dateFromRaw(parsedData.closeDate);
    yield put(updateQueueRoutine.success(parsedData));
    yield call(loadOpenedQueues, { payload: subjectId });
    yield call(loadClosedQueues, { payload: subjectId });
  } catch(error) {
    console.log('Error with queue updating');
    console.log(error);
  }
}

export default function* queueSaga() {
  yield all([
    yield takeEvery(loadOpenedQueuesRoutine.TRIGGER, loadOpenedQueues),
    yield takeEvery(loadClosedQueuesRoutine.TRIGGER, loadClosedQueues),
    yield takeEvery(loadQueueRoutine.TRIGGER, loadQueue),
    yield takeEvery(turnInQueueRoutine.TRIGGER, turnIn),
    yield takeEvery(loadQueueMembersRoutine.TRIGGER, loadQueueMembers),
    yield takeEvery(updateQueueRoutine.TRIGGER, updateQueue)
  ]);
}