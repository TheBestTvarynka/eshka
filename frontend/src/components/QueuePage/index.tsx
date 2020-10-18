import React from 'react';
import { IQueue } from '../../models/queue';
import styles from './styles.module.sass';
import containers from '../styles/containers.module.sass';

const queueMock = {
  id: '1',
  title: 'Lab 1',
  description: 'Allocator Design',
  creationDate: new Date(),
  closeDate: new Date(),
  startDate: new Date(),
  endDate: new Date()
} as IQueue;

const QueuePage = () => {
  return (
    <div className={containers.main_content}>
      <div className={styles.queue_data}>
        <span className={containers.title}>{queueMock.title}</span>
        <span className={containers.description}>Created at {queueMock.creationDate.toLocaleString()}</span>
        <span className={containers.description}>Closed at {queueMock.closeDate.toLocaleString()}</span>
        <span className={containers.description}>{queueMock.description}</span>
        <span className={containers.description}>Started at {queueMock.startDate.toLocaleString()}</span>
        <span className={containers.description}>Ended at {queueMock.endDate.toLocaleString()}</span>
      </div>
      <div>
        <span>Some content</span>
      </div>
    </div>
  );
};

export default QueuePage;