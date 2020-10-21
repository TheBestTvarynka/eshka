import { createRoutine } from 'redux-saga-routines';

export const loadOpenedQueuesRoutine = createRoutine('QUEUE:LOAD_OPENED');
export const loadClosedQueuesRoutine = createRoutine('QUEUE:LOAD_CLOSED');