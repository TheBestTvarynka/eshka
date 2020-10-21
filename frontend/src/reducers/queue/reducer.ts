import {
  loadOpenedQueuesRoutine,
  loadClosedQueuesRoutine
} from '../../sagas/queue/routines';
import { IQueueState, IAppState } from '../../models/appState';

const initState = {
  isQueueLoading: false,
  isOpenedLoading: false,
  isClosedLoading: false
} as IQueueState;

const queueReducer = (state: IAppState["queue"] = initState, { type, payload}: any) => {
  if (type === loadOpenedQueuesRoutine.TRIGGER) {
    return {
      ...state,
      isOpenedLoading: true
    };
  }
  if (type === loadClosedQueuesRoutine.TRIGGER) {
    return {
      ...state,
      isClosedLoading: true
    };
  }
  if (type === loadOpenedQueuesRoutine.SUCCESS) {
    return {
      ...state,
      opened: payload,
      isOpenedLoading: false
    };
  }
  if (type === loadClosedQueuesRoutine.SUCCESS) {
    return {
      ...state,
      closed: payload,
      isClosedLoading: false
    };
  }
  if (type === loadOpenedQueuesRoutine.FAILURE) {
    return {
      ...state,
      isOpenedLoading: false
    };
  }
  if (type === loadClosedQueuesRoutine.FAILURE) {
    return {
      ...state,
      isClosedLoading: false
    };
  }
  return state;
};

export default queueReducer;