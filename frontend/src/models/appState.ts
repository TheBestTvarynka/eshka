import { IUser } from './user';
import { ISubject } from "./subject";
import { IQueue, IQueueMember, IQueueShort } from './queue';
import {ITeam, ITeamShort} from "./team";

export interface IAuthState {
  user?: IUser;
  isLoading: boolean;
}

export interface ISubjectState {
  subject?: ISubject;
  subjects?: ISubject[];
  queues?: IQueueShort[];
  isSubjectLoading: boolean;
  isCreateLoading: boolean;
  isQueuesLoading: boolean;
}

export interface IQueueState {
  queue?: IQueue;
  queueMembers?: IQueueMember[];
  isQueueLoading: boolean;
}

export interface ITeamState {
  team?: ITeam;
  teams?: ITeamShort[];
  isTeamLoading: boolean;
  isUpdateLoading: boolean;
}

export interface IAppState {
  auth: IAuthState;
  subject: ISubjectState;
  queue: IQueueState;
  team: ITeamState;
}
