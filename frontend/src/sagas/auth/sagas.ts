import { all, put, takeEvery } from 'redux-saga/effects';
import {
  loginRoutine,
  registerRoutine,
  logoutRoutine
} from './routines';
import apiClient from '../../helpers/webApi.helper';
import Cookies from 'js-cookie';

function* login(action: any) {
  // Cookies.set('Authentication', '001og05pd1gr2dy-m9yvuvfybgdf0');
  console.log('in login saga');
  console.log(action);
  const credentials = action.payload;
  console.log(credentials);
  try {
    const res = yield apiClient.post({ endpoint: '/auth/login', body: credentials });
    console.log(res);
    const parsedData = yield res.json();
    console.log(parsedData);
    console.log(parsedData.sessionId);

    Cookies.set('Authentication', parsedData.sessionId);
    yield put(loginRoutine.success({
      fullName: parsedData.fullName,
      username: parsedData.username,
      email: parsedData.email,
      role: 'USER'
    }));
  } catch (error) {
    console.log('Error with Login');
    console.log(error);
  }
  try {
    const res = yield apiClient.get({ endpoint: '/test' });
    console.log(res);
    const parsedData = yield res.text();
    console.log(parsedData);
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
