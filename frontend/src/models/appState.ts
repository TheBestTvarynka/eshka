import { IUser } from './user';
import { ISubject } from "./subject";

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

export interface IAppState {
  auth: IAuthState;
  subject: ISubjectState;
}
