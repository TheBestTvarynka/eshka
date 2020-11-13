import {
  updateSubjectRoutine,
  loadAllSubjectsRoutine,
  loadSubjectRoutine,
  loadSubjectQueuesRoutine
} from '../../sagas/subject/routines';
import { ISubjectState, IAppState } from '../../models/appState';

const initSubjectState: ISubjectState = {
  isSubjectLoading: false,
  isCreateLoading: false,
  isQueuesLoading: false
};

const subjectReducer = (state: IAppState['subject'] = initSubjectState, { type, payload }: any) => {
  if (type === updateSubjectRoutine.TRIGGER) {
    return {
      ...state,
      isCreateLoading: true
    };
  }
  if (type === loadSubjectRoutine.TRIGGER) {
    return {
      ...state,
      isSubjectLoading: true
    };
  }
  if (type === loadSubjectQueuesRoutine.TRIGGER) {
    return {
      ...state,
      isQueuesLoading: true
    };
  }
  if (type === updateSubjectRoutine.SUCCESS) {
    return {
      ...state,
      subject: payload,
      isCreateLoading: false
    };
  }
  if (type === loadAllSubjectsRoutine.SUCCESS) {
    return {
      ...state,
      subjects: payload
    };
  }
  if (type === loadSubjectRoutine.SUCCESS) {
    return {
      ...state,
      subject: payload,
      isSubjectLoading: false
    };
  }
  if (type === loadSubjectQueuesRoutine.SUCCESS) {
    return {
      ...state,
      queues: payload,
      isQueuesLoading: false
    };
  }
  if (type === loadSubjectRoutine.FAILURE
    || type === loadAllSubjectsRoutine.FAILURE
    || type === updateSubjectRoutine.FAILURE
    || type === loadSubjectQueuesRoutine.FAILURE) {
    return {
      ...state,
      isSubjectsLoading: false,
      isCreateLoading: false,
      isQueuesLoading: false
    };
  }
  return state;
};

export default subjectReducer;