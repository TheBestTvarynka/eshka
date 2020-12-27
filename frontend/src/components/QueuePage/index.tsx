import React, { useState, useEffect } from 'react';
import CreateQueueWindow from '../CreateQueueWindow';
import {
  loadQueueRoutine,
  loadQueueMembersRoutine,
  turnInQueueRoutine,
  updateQueueRoutine
} from '../../sagas/queue/routines';
import { IAppState } from '../../models/appState';
import Loader from '../Loader';
import styles from './styles.module.sass';
import containers from '../styles/containers.module.sass';
import lists from '../../components/styles/lists.module.sass';
import buttons from '../../components/styles/buttons.module.sass';
import inputs from '../../components/styles/inputs.module.sass';
import { connect, ConnectedProps } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';

const QueuePage: React.FC<IQueuePageProps> = ({
  userId, queue, members, loadQueue, turnIn,
  update, loadMembers, isLoading }) => {
  const history = useHistory();
  const params: any = useParams();
  const [turnedIn, setTurnedIn] = useState<boolean>(false);
  const [eq, setEQ] = useState<boolean>(false);
  const [newSN, setNewSN] = useState<number>(members ? members?.length + 1 : 1);

  useEffect(() => {
    if (!userId || !members) {
      setTurnedIn(false);
    } else {
      setTurnedIn(!!members?.find(member => member.user.id === userId));
    }
  }, [userId, members]);

  useEffect(() => {
    const id = params.id;
    if (id) {
      loadQueue(id);
    }
  }, [loadQueue, params]);

  useEffect(() => {
    const id = params.id;
    if (id) {
      loadMembers(id);
    }
  }, [loadMembers, params])

  return (
    <div className={containers.main_content}>
      {isLoading
        ? <Loader />
        : <div className={styles.queue_data}>
            <div className={styles.title_container}>
              <span className={containers.dark_item_title}>{queue?.title}</span>
              <div className={styles.button_container}>
                <button className={buttons.animated_border_button}
                        onClick={() =>
                          queue?.subjectId ? history.push(`/subject/${queue.subjectId}`) : history.push("/dashboard")
                        }
                >
                  <span>Back to queues</span>
                </button>
              </div>
            </div>
            <span className={`${containers.description} ${styles.date_c}`}>
            Created at
            <span className={styles.date}>{queue?.creationDate?.toLocaleString()}</span>
          </span>
            <span className={`${containers.description} ${styles.date_c}`}>
            Closed at
            <span className={styles.date}>{queue?.closingDate?.toLocaleString()}</span>
          </span>
            <span className={containers.description}>{queue?.description}</span>
            <span className={`${containers.description} ${styles.date_c}`}>
            Started at
            <span className={styles.date}>{queue?.startDate?.toLocaleString()}</span>
          </span>
            <span className={`${containers.description} ${styles.date_c}`}>
            Ended at
            <span className={styles.date}>{queue?.endDate?.toLocaleString()}</span>
          </span>
          </div>
      }
      <div className={containers.two_columns}>
        <div className={styles.main_content}>
          <div className={`${lists.dark_list} ${styles.list}`}>
            <span className={lists.dark_list_title}>Passed</span>
            {members && members.filter(item => item.passed).map(member => (
              <div key={member.sequenceNumber} className={`${lists.dark_list_item} ${lists.simple}`}>
                <span>{member.sequenceNumber} {member.user.fullName}</span>
              </div>
            ))}
          </div>
          <div className={`${lists.light_list}`}>
            <span className={lists.light_list_title}>In Queue</span>
            {members && members.filter(item => !item.passed).map(member => (
              <div key={member.sequenceNumber} className={lists.light_list_item}>
                <span>{member.sequenceNumber} {member.user.fullName}</span>
              </div>
            ))}
          </div>
        </div>
        <div className={containers.two_columns}>
          {isLoading
            ? <Loader />
            : turnedIn
                ? <div className={containers.vertical_actions_panel}>
                    <button className={`${buttons.button_simple} ${buttons.blue_simple}`}>Unturn</button>
                  </div>
                : (queue?.closingDate
                    ? <span className={`${buttons.button_simple} ${buttons.disabled}`}>Too late</span>
                    : <div className={containers.vertical_actions_panel}>
                        <input type="number" className={`${inputs.input_standard} ${styles.input}`}
                               onChange={event => setNewSN(Number.parseInt(event.target.value))}
                               defaultValue={newSN.toString()}
                        />
                        <button className={`${buttons.button_simple} ${buttons.blue_simple} ${styles.field}`}
                                onClick={() => turnIn({ queueId: queue?.id, userId, sequenceNumber: newSN })}>
                          Turn in
                        </button>
                      </div>
                )
          }
          {isLoading
            ? <Loader />
            : <div className={containers.vertical_actions_panel}>
                {!queue?.closingDate &&
                  <button className={`${buttons.button_simple} ${buttons.blue_simple}`}
                          onClick={() => setEQ(true)}
                  >Edit queue</button>
                }
                {queue?.closingDate
                  ? <span className={`${buttons.button_simple} ${buttons.disabled}`}>Queue closed</span>
                  : <button className={`${buttons.button_simple} ${buttons.red_simple}`}
                            onClick={() => {
                              console.log('close queue');
                              update({ ...queue, closingDate: new Date() });
                            }}
                    >Close queue</button>
                }
              </div>
          }
        </div>
      </div>
      {eq && <CreateQueueWindow onSubmit={data => {
                                  update({ ...data, id: queue?.id, subjectId: queue?.subjectId, makerId: queue?.makerId });
                                  setEQ(false);
                                }}
                                queue={queue}
                                onClose={() => setEQ(false)} />}
    </div>
  );
};

const mapStateToProps = (appState: IAppState) => ({
  userId: appState.auth.user?.id,
  queue: appState.queue.queue,
  members: appState.queue.queueMembers,
  isLoading: appState.queue.isQueueLoading
});

const mapDispatchToProps = {
  loadQueue: loadQueueRoutine,
  loadMembers: loadQueueMembersRoutine,
  turnIn: turnInQueueRoutine,
  update: updateQueueRoutine
};

const connector = connect(mapStateToProps, mapDispatchToProps);
type IQueuePageProps = ConnectedProps<typeof connector>;
export default connector(QueuePage);
