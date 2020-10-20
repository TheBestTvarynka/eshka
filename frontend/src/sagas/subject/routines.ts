import { createRoutine } from 'redux-saga-routines';

export const createSubjectRoutine = createRoutine('SUBJECT:CREATE');
export const updateSubjectRoutine = createRoutine('SUBJECT:UPDATE');
export const loadAllSubjectsRoutine = createRoutine('SUBJECT:LOAD_ALL');
export const loadSubjectRoutine = createRoutine('SUBJECT:LOAD');