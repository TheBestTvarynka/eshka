
export interface IUser {
  id: string;
  fullName: string;
  username: string;
  email: string;
  role: Role;
}

export interface IUserShort {
  id: string;
  fullName: string;
  logo: string;
}

export enum Role {
  USER, ADMIN
}