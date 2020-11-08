import { createRoutine } from 'redux-saga-routines';

export const updateSubjectRoutine = createRoutine('SUBJECT:UPDATE');
export const deleteSubjectRoutine = createRoutine('SUBJECT:DELETE');
export const loadAllSubjectsRoutine = createRoutine('SUBJECT:LOAD_ALL');
export const loadSubjectRoutine = createRoutine('SUBJECT:LOAD');
export const loadSubjectQueuesRoutine = createRoutine('SUBJECT:LOAD_QUEUES');