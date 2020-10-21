import { all, put, call, takeEvery } from 'redux-saga/effects';
import {
  loginRoutine,
  registerRoutine,
  logoutRoutine,
  loadUserRoutine
} from './routines';
import apiClient from '../../helpers/webApi.helper';
import authProvider from '../../helpers/auth.helper';

function* login(action: any) {
  const { username, password, history } = action.payload;
  try {
    const res = yield apiClient.post({ endpoint: '/auth/login', body: { username, password } });
    const parsedData = yield res.json();
    authProvider.setToken(parsedData.sessionId);
    yield put(loginRoutine.success({
      fullName: parsedData.fullName,
      username: parsedData.username,
      email: parsedData.email,
      role: parsedData.role
    }));
    history.push('/');
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

function* logout(action: any) {
  const history = action.payload;
  try {
    yield apiClient.get({ endpoint: '/auth/logout' });
    yield put(logoutRoutine.success());
    authProvider.setToken(null);
    history.push('/login');
  } catch(error) {
    console.log('Error with logout');
    console.log(error);
  }
}

function* loadUserData() {
  try {
    const res = yield apiClient.get({ endpoint: '/user' });
    const parsedData = yield res.json();
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
