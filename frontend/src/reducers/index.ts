import { combineReducers } from 'redux';
import authReducer from './auth/reducer';
import subjectReducer from './subject/reducer';
import queueReducer from './queue/reducer';
import teamReducer from './team/reducer';

export default combineReducers({
  auth: authReducer,
  subject: subjectReducer,
  queue: queueReducer,
  team: teamReducer
});