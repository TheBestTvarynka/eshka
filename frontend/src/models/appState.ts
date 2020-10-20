import { IUser } from './user';
import { ISubject } from "./subject";

export interface IAuthState {
  user?: IUser;
  isLoading: boolean;
}

export interface ISubjectState {
  subject?: ISubject;
  subjects?: ISubject[];
  isLoading: boolean;
}

export interface IAppState {
  auth: IAuthState;
  subject: ISubjectState;
}
