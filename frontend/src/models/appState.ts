import { Role } from "./user";

export interface IAuthState {
  id?: string;
  fullName?: string;
  username?: string;
  role?: Role;
  logo?: string;
  isLoading: boolean;
}

export interface IAppState {
  auth: IAuthState;
}
