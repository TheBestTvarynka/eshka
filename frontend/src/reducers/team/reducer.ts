import {
  loadTeamRoutine,
  loadTeamsRoutine,
  updateTeamRoutine
} from '../../sagas/team/routines';
import { IAppState, ITeamState } from '../../models/appState';

const initTeamState: ITeamState = {
  isTeamLoading: false,
  isUpdateLoading: false
};

const teamReducer = (state: IAppState['team'] = initTeamState, { type, payload }: any) => {
  if (type === loadTeamRoutine.TRIGGER || type === updateTeamRoutine.TRIGGER) {
    return {
      ...state,
      isTeamLoading: true
    };
  }
  if (type === loadTeamRoutine.SUCCESS) {
    return {
      ...state,
      team: payload,
      isTeamLoading: false
    };
  }
  if (type === loadTeamsRoutine.SUCCESS) {
    return {
      ...state,
      teams: payload
    };
  }
  if (type === updateTeamRoutine.SUCCESS) {
    return {
      ...state,
      team: { ...state.team, ...payload },
      isTeamLoading: false
    };
  }
  if (type === loadTeamRoutine.FAILURE || type === updateTeamRoutine.FAILURE) {
    return {
      ...state,
      isTeamLoading: false
    };
  }
  return state;
};

export default teamReducer;