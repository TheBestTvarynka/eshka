import { all, put, takeEvery } from 'redux-saga/effects';
import {
  loginRoutine,
  registerRoutine,
  logoutRoutine
} from './routines';
import apiClient from '../../helpers/webApi.helper';

function* login(action: any) {
  console.log('in login saga');
  console.log(action);
  const credentials = action.payload;
  console.log(credentials);
  try {
    const res = yield apiClient.post({ endpoint: '/auth/login', body: credentials });
    console.log(res);
    yield put(loginRoutine.success(res));
  } catch (error) {
    console.log('Error with Login');
    console.log(error);
  }
  try {
    const res = yield apiClient.get({ endpoint: '/test' });
    console.log(res);
  } catch(error) {
    console.log('Error with test');
    console.log(error);
  }
}

function* register(action: any) {
  const resisterData = action.payload;
  console.log(resisterData);
  try {
    const res = yield apiClient.post({ endpoint: '/auth/register', body: resisterData });
    console.log(res);
    yield put(registerRoutine.success(res));
  } catch (error) {
    console.log('Error with register');
    console.log(error);
  }
}

function* logout() {

}

export default function* authSagas() {
  yield all([
    yield takeEvery(loginRoutine.TRIGGER, login),
    yield takeEvery(registerRoutine.TRIGGER, register),
    yield takeEvery(logoutRoutine.TRIGGER, logout)
  ]);
}
