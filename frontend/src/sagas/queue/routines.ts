import { createRoutine } from 'redux-saga-routines';

export const loadQueueRoutine = createRoutine('QUEUE:LOAD_ONE');
export const turnInQueueRoutine = createRoutine('QUEUE:TURN_IN');
export const loadQueueMembersRoutine = createRoutine('QUEUE:LOAD_MEMBERS');
export const updateQueueRoutine = createRoutine('QUEUE:UPDATE');