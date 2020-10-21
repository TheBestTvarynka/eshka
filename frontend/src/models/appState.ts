import { IUser } from './user';
import { ISubject } from "./subject";
import { IQueue, IQueueShort } from './queue';

export interface IAuthState {
  user?: IUser;
  isLoading: boolean;
}

export interface ISubjectState {
  subject?: ISubject;
  subjects?: ISubject[];
  isSubjectLoading: boolean;
  isCreateLoading: boolean;
}

export interface IQueueState {
  queue?: IQueue;
  opened?: IQueueShort[];
  closed?: IQueueShort[];
  isQueueLoading: boolean;
  isOpenedLoading: boolean;
  isClosedLoading: boolean;
}

export interface IAppState {
  auth: IAuthState;
  subject: ISubjectState;
  queue: IQueueState;
}
