import { IUserShort } from './user';
import { ISubjectShort } from "./subject";

export interface ITeam {
  id: number;
  name: string;
  description: string;
  members: IUserShort[];
}

export interface ITeamShort {
  id: number;
  name: string;
  description: string;
}