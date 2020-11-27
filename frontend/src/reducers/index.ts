import { combineReducers } from 'redux';
import { reducer as toastr } from 'react-redux-toastr';
import authReducer from './auth/reducer';
import subjectReducer from './subject/reducer';
import queueReducer from './queue/reducer';
import teamReducer from './team/reducer';

export default combineReducers({
  toastr,
  auth: authReducer,
  subject: subjectReducer,
  queue: queueReducer,
  team: teamReducer
});