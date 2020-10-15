import { IUser } from './user';

export interface IAuthState {
  user?: IUser,
  isLoading: boolean
}

export interface IAppState {
  auth: IAuthState;
}
