import { createRoutine } from 'redux-saga-routines';

export const loadTeamsRoutine = createRoutine('TEAM:LOAD_TEAMS');
export const loadTeamRoutine = createRoutine('TEAM:LOAD');
export const updateTeamRoutine = createRoutine('TEAM:UPDATE');