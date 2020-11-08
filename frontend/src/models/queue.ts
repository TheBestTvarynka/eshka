import { IUserShort } from './user';

export interface IQueueShort {
  id: number;
  title: string;
  isOpen: boolean;
}

export interface IQueue {
  id: number;
  subjectId: number;
  makerId: number;
  title: string;
  description: string;
  creationDate: Date;
  closingDate: Date;
  startDate: Date;
  endDate: Date;
}

export interface IQueueMember {
  user: IUserShort;
  sequenceNumber: number;
  turnedAt: Date;
  passed: boolean;
}