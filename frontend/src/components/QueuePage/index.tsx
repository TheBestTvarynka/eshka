import React from 'react';
import { IQueue, IQueueMember } from '../../models/queue';
import { IUserShort } from '../../models/user';
import styles from './styles.module.sass';
import containers from '../styles/containers.module.sass';
import lists from '../../components/styles/lists.module.sass';
import buttons from '../../components/styles/buttons.module.sass';

const queueMock = {
  id: '1',
  title: 'Lab 1',
  description: 'Allocator Design',
  creationDate: new Date(),
  closeDate: new Date(),
  startDate: new Date(),
  endDate: new Date()
} as IQueue;

const membersMock = [
  { user: { id: 1, fullName: 'Shikamaru Nara' } as IUserShort, sequenceNumber: 1, turnedAt: new Date(), passed: true } as IQueueMember,
  { user: { id: 2, fullName: 'Sai' } as IUserShort, sequenceNumber: 2, turnedAt: new Date(), passed: true } as IQueueMember,
  { user: { id: 3, fullName: 'Madara Uchiha' } as IUserShort, sequenceNumber: 3, turnedAt: new Date(), passed: true } as IQueueMember,
  { user: { id: 4, fullName: 'Kirito Mikiti' } as IUserShort, sequenceNumber: 4, turnedAt: new Date(), passed: false } as IQueueMember,
  { user: { id: 5, fullName: 'Sasuke Hiruzen' } as IUserShort, sequenceNumber: 5, turnedAt: new Date(), passed: false } as IQueueMember,
  { user: { id: 6, fullName: 'Minato Namikadze' } as IUserShort, sequenceNumber: 6, turnedAt: new Date(), passed: false } as IQueueMember,
  { user: { id: 7, fullName: 'Sarada Uchiha' } as IUserShort, sequenceNumber: 7, turnedAt: new Date(), passed: false } as IQueueMember
] as IQueueMember[];

const QueuePage = () => {
  const isTurned = (userId: number | null | undefined, members: IQueueMember[]): boolean => {
    if (!userId) {
      return false;
    }
    return !!members.find(member => member.user.id === userId);
  };
  return (
    <div className={containers.main_content}>
      <div className={styles.queue_data}>
        <span className={containers.dark_item_title}>{queueMock.title}</span>
        <span className={`${containers.description} ${styles.date_c}`}>
          Created at
          <span className={styles.date}>{queueMock.creationDate.toLocaleString()}</span>
        </span>
        <span className={`${containers.description} ${styles.date_c}`}>
          Closed at
          <span className={styles.date}>{queueMock.closeDate.toLocaleString()}</span>
        </span>
        <span className={containers.description}>{queueMock.description}</span>
        <span className={`${containers.description} ${styles.date_c}`}>
          Started at
          <span className={styles.date}>{queueMock.startDate.toLocaleString()}</span>
        </span>
        <span className={`${containers.description} ${styles.date_c}`}>
          Ended at
          <span className={styles.date}>{queueMock.endDate.toLocaleString()}</span>
        </span>
      </div>
      <div className={containers.two_columns}>
        <div className={styles.main_content}>
          <div className={`${lists.dark_list} ${styles.list}`}>
            <span className={lists.dark_list_title}>Passed</span>
            {membersMock.filter(item => item.passed).map(member => (
              <div key={member.sequenceNumber} className={`${lists.dark_list_item} ${lists.simple}`}>
                <span>{member.sequenceNumber} {member.user.fullName}</span>
              </div>
            ))}
          </div>
          <div className={`${lists.light_list}`}>
            <span className={lists.light_list_title}>In Queue</span>
            {membersMock.filter(item => !item.passed).map(member => (
              <div key={member.sequenceNumber} className={lists.light_list_item}>
                <span>{member.sequenceNumber} {member.user.fullName}</span>
              </div>
            ))}
          </div>
        </div>
        <div className={containers.two_columns}>
          <div className={containers.vertical_actions_panel}>
            {isTurned(null, membersMock)
              ? <button className={`${buttons.button_simple} ${buttons.blue_simple}`}>Unturn</button>
              : (queueMock.closeDate
                  ? <span className={`${buttons.button_simple} ${buttons.disabled}`}>Too late</span>
                  : <button className={`${buttons.button_simple} ${buttons.blue_simple}`}>Turn in</button>
                )
            }
          </div>
          <div className={containers.vertical_actions_panel}>
            {queueMock.closeDate
              ? <span className={`${buttons.button_simple} ${buttons.disabled}`}>Queue closed</span>
              : <button className={`${buttons.button_simple} ${buttons.red_simple}`}>Close queue</button>
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default QueuePage;