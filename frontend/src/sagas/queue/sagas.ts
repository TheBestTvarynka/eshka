import { all, put, call, takeEvery } from 'redux-saga/effects';
import {
  loadQueueRoutine,
  turnInQueueRoutine,
  loadQueueMembersRoutine,
  updateQueueRoutine
} from './routines';
import { loadSubjectQueuesRoutine } from '../subject/routines';
import apiClient from '../../helpers/webApi.helper';
import dateTimeHelper from '../../helpers/dateTimeHelper';

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
    yield put(loadQueueRoutine.failure());
  }
}

function* turnIn(action: any) {
  const { queueId, userId, sequenceNumber } = action.payload;
  console.log({ queueId, userId });
  if (!queueId || !userId) {
    return;
  }
  try {
    yield apiClient.post({ endpoint: '/queue-details', body: { queueId, userId, passed: false, sequenceNumber } });
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
    yield put(loadQueueMembersRoutine.failure());
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
    parsedData.closingDate = dateTimeHelper.dateFromRaw(parsedData.closingDate);
    yield put(updateQueueRoutine.success(parsedData));
    yield put(loadSubjectQueuesRoutine.trigger(subjectId))
  } catch(error) {
    console.log('Error with queue updating');
    console.log(error);
    yield put(updateQueueRoutine.failure());
  }
}

export default function* queueSagas() {
  yield all([
    yield takeEvery(loadQueueRoutine.TRIGGER, loadQueue),
    yield takeEvery(turnInQueueRoutine.TRIGGER, turnIn),
    yield takeEvery(loadQueueMembersRoutine.TRIGGER, loadQueueMembers),
    yield takeEvery(updateQueueRoutine.TRIGGER, updateQueue)
  ]);
}