import { createRoutine } from 'redux-saga-routines';

export const loginRoutine = createRoutine('AUTH:LOGIN');
export const registerRoutine = createRoutine('AUTH:REGISTER');
export const logoutRoutine = createRoutine('AUTH:LOGOUT');
export const loadUserRoutine = createRoutine('AUTH:LOAD_USER_DATA');