import { combineReducers } from 'redux';
import authReducer from './auth/reducer';
import subjectReducer from './subject/reducer';

export default combineReducers({
  auth: authReducer,
  subject: subjectReducer
});