import { createRoutine } from 'redux-saga-routines';

export const loadOpenedQueuesRoutine = createRoutine('QUEUE:LOAD_OPENED');
export const loadClosedQueuesRoutine = createRoutine('QUEUE:LOAD_CLOSED');
export const loadQueueRoutine = createRoutine('QUEUE:LOAD_ONE');
export const turnInQueueRoutine = createRoutine('QUEUE:TURN_IN');
export const loadQueueMembersRoutine = createRoutine('QUEUE:LOAD_MEMBERS');