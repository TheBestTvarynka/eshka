import { IUserShort } from './user';
import { ISubjectShort } from "./subject";

export interface ITeam {
  id: string;
  title: string;
  description: string;
  members: IUserShort[];
  subjects: ISubjectShort[];
}

export interface ITeamShort {
  id: string;
  name: string;
  description: string;
}