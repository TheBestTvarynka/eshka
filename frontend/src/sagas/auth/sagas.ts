import { all, put, takeEvery } from 'redux-saga/effects';
import {
  loginRoutine,
  registerRoutine,
  logoutRoutine,
  loadUserRoutine
} from './routines';
import apiClient from '../../helpers/webApi.helper';
import authProvider from '../../helpers/auth.helper';
import { Role } from '../../models/user';

function* login(action: any) {
  const credentials = action.payload;
  console.log(credentials);
  try {
    const res = yield apiClient.post({ endpoint: '/auth/login', body: credentials });
    console.log(res);
    const parsedData = yield res.json();
    console.log(parsedData);
    console.log(parsedData.sessionId);

    authProvider.setToken(parsedData.sessionId);

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
}

function* register(action: any) {
  const resisterData = action.payload;
  console.log(resisterData);
  try {
    const res = yield apiClient.post({ endpoint: '/auth/register', body: resisterData });
    // console.log(res);
    // yield put(registerRoutine.success(res));
  } catch (error) {
    console.log('Error with register');
    console.log(error);
  }
}

function* logout() {

}

function* loadUserData() {
  console.log('In load user saga');
  try {
    const res = yield apiClient.get({ endpoint: '/user' });
    console.log(res);
    const parsedData = yield res.json();
    console.log(parsedData);
    yield put(loadUserRoutine.success(parsedData));
  } catch(error) {
    console.log('Error with fetching user data');
    console.log(error);
  }
}

export default function* authSagas() {
  yield all([
    yield takeEvery(loginRoutine.TRIGGER, login),
    yield takeEvery(registerRoutine.TRIGGER, register),
    yield takeEvery(logoutRoutine.TRIGGER, logout),
    yield takeEvery(loadUserRoutine.TRIGGER, loadUserData)
  ]);
}
