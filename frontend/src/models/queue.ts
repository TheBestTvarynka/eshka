
export interface IQueueShort {
  id: string;
  title: string;
  participants: number;
}

export interface IQueue {
  id: string;
  title: string;
  description: string;
  creationDate: Date;
  closeDate: Date;
  startDate: Date;
  endDate: Date;
}