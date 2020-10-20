import {
  createSubjectRoutine,
  loadAllSubjectsRoutine,
  loadSubjectRoutine
} from '../../sagas/subject/routines';
import { ISubjectState, IAppState } from '../../models/appState';

const initSubjectState: ISubjectState = {
  isLoading: false
}

const subjectReducer = (state: IAppState['auth'] = initSubjectState, { type, payload }: any) => {
  if (type === createSubjectRoutine.SUCCESS) {
    return {
      ...state,
      subject: payload,
      isLoading: false
    };
  }
  if (type === loadAllSubjectsRoutine.SUCCESS) {
    return {
      ...state,
      subjects: payload,
      isLoading: false
    };
  }
  if (type === loadSubjectRoutine.SUCCESS) {
    return {
      ...state,
      subject: payload,
      isLoading: false
    };
  }
  if (type === loadSubjectRoutine.FAILURE
    || type === loadAllSubjectsRoutine.FAILURE
    || type === createSubjectRoutine.FAILURE) {
    return {
      ...state,
      isLoading: false
    };
  }
  return state;
};

export default subjectReducer;