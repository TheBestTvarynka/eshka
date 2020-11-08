import {
  loadQueueRoutine,
  loadQueueMembersRoutine,
  updateQueueRoutine
} from '../../sagas/queue/routines';
import { IQueueState, IAppState } from '../../models/appState';

const initState = {
  isQueueLoading: false,
} as IQueueState;

const queueReducer = (state: IAppState["queue"] = initState, { type, payload}: any) => {
  if (type === loadQueueRoutine.TRIGGER) {
    return {
      ...state,
      isQueueLoading: true
    };
  }
  if (type === loadQueueRoutine.SUCCESS) {
    return {
      ...state,
      queue: payload,
      isQueueLoading: false
    };
  }
  if (type === loadQueueMembersRoutine.SUCCESS) {
    return {
      ...state,
      queueMembers: payload
    };
  }
  if (type === updateQueueRoutine.SUCCESS) {
    return {
      ...state,
      queue: payload
    };
  }
  if (type === loadQueueRoutine.FAILURE) {
    return {
      ...state,
      isQueueLoading: false
    };
  }
  return state;
};

export default queueReducer;