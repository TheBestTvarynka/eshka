
export interface IUser {
  id: number;
  fullName: string;
  username: string;
  email: string;
  role: Role;
}

export interface IUserShort {
  id: number;
  fullName: string;
  logo?: string;
}

export enum Role {
  USER, ADMIN
}