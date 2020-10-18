import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import listStyles from '../../components/TeamsList/styles.module.sass';
import containers from '../../components/styles/containers.module.sass';
import lists from '../../components/styles/lists.module.sass';
import buttons from '../../components/styles/buttons.module.sass';
import styles from './styles.module.sass';
import { ISubjectShort } from '../../models/subject';
import { IQueueShort } from '../../models/queue';

const subjectsMock = [
  { id: '1', title: 'Math' },
  { id: '2', title: 'Functional Programming' },
  { id: '3', title: 'Databases | OLAP' },
  { id: '4', title: 'OOP: Java' }
] as ISubjectShort[];

const closedQueues = [
  { id: '1', title: 'Lab 1', participants: 23 },
  { id: '2', title: 'Lab 2', participants: 15 },
  { id: '3', title: 'Lab 3', participants: 19 }
] as IQueueShort[];

const openedQueues = [
  { id: '1', title: 'Lab 4', participants: 16 },
  { id: '2', title: 'Lab 5', participants: 13 },
  { id: '3', title: 'Lab 6', participants: 6 }
] as IQueueShort[];

const SubjectPage = () => {
  const [selected, setSelected] = useState<number>(2);
  return (
    <div className={styles.subject_page}>
      <div className={listStyles.list}>
        {subjectsMock.map((subject, index) =>
          <div className={`${listStyles.item} ${index === selected ? listStyles.selected : listStyles.simple}`}
               key={subject.id}
               onClick={() => setSelected(index)}
          >
            <span className={listStyles.title}>{subject.title}</span>
          </div>
        )}
        <div className={listStyles.button_container}>
          <button className={buttons.animated_border_button}>
            <span>Create subject</span>
          </button>
        </div>
      </div>
      <div className={containers.content_general}>
        <div className={containers.main_content}>
          <span className={containers.title}>Databases | OLAP</span>
          <span className={containers.description}>Some Description</span>
          <div className={containers.two_columns}>
            <div className={lists.light_list}>
              <span className={lists.light_list_title}>Opened queues</span>
              {openedQueues.map(queue =>
                <Link to={`/queue/${queue.id}`} className={lists.light_list_item} key={queue.id}>
                  <span>{queue.title} ({queue.participants})</span>
                </Link>
              )}
            </div>
            <div className={lists.light_list}>
              <span className={lists.light_list_title}>Closed queues</span>
              {closedQueues.map(queue =>
                <Link to={`/queue/${queue.id}`} className={lists.light_list_item} key={queue.id}>
                  <span>{queue.title} ({queue.participants})</span>
                </Link>
              )}
            </div>
          </div>
        </div>
        <div className={containers.vertical_actions_panel}>
          <button className={`${buttons.button_simple} ${buttons.green_simple}`}>Create queue</button>
        </div>
      </div>
    </div>
  );
};

export default SubjectPage;