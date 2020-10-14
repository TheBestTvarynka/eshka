import {
  loginRoutine,
  registerRoutine,
  logoutRoutine
} from '../../sagas/auth/routines';
import { IAuthState, IAppState } from '../../models/appState';

const initAuthState: IAuthState = {
  isLoading: false
}

const authReducer = (state: IAppState['auth'] = initAuthState, { type, payload }: any) => {
  if (type === loginRoutine.SUCCESS) {
    return {
      ...state,
      isLoading: false,
      ...payload
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
      isLoading: false
    }
  }
  return state;
};

export default authReducer;