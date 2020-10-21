import {
  loginRoutine,
  registerRoutine,
  logoutRoutine,
  loadUserRoutine
} from '../../sagas/auth/routines';
import { IAuthState, IAppState } from '../../models/appState';

const initAuthState: IAuthState = {
  isLoading: false
}

const authReducer = (state: IAppState['auth'] = initAuthState, { type, payload }: any) => {
  if (type === loginRoutine.TRIGGER || type === registerRoutine.TRIGGER) {
    return {
      ...state,
      isLoading: true
    };
  }
  if (type === loginRoutine.SUCCESS) {
    return {
      isLoading: false,
      user: payload
    }
  }
  if (type === registerRoutine.SUCCESS) {
    return {
      ...state,
      isLoading: false
    }
  }
  if (type === logoutRoutine.SUCCESS) {
    return {
      user: undefined,
      isLoading: false
    }
  }
  if (type === loadUserRoutine.SUCCESS) {
    return {
      user: payload,
      isLoading: false
    }
  }
  if (type === loginRoutine.FAILURE || type === registerRoutine.FAILURE) {
    return {
      ...state,
      isLoading: false
    };
  }
  return state;
};

export default authReducer;
