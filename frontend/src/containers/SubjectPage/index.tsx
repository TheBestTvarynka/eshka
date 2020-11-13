import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import {
  updateSubjectRoutine,
  deleteSubjectRoutine,
  loadAllSubjectsRoutine,
  loadSubjectRoutine,
  loadSubjectQueuesRoutine
} from '../../sagas/subject/routines';
import {
  updateQueueRoutine
} from '../../sagas/queue/routines';
import CreateSubjectWindow from '../../components/CreateSubjectWindow';
import CreateQueueWindow from '../../components/CreateQueueWindow';
import ConfirmationWindow from '../../components/ConfirmationWindow';
import Loader from '../../components/Loader';
import listStyles from '../../components/TeamsList/styles.module.sass';
import containers from '../../components/styles/containers.module.sass';
import lists from '../../components/styles/lists.module.sass';
import buttons from '../../components/styles/buttons.module.sass';
import styles from './styles.module.sass';
import { IAppState } from '../../models/appState';

const SubjectPage: React.FC<ISubjectPageProps> = ({
  user, subject, subjects, isSubjectLoading, queues, isQueuesLoading,
  update, deleteSubject, loadAll, load, loadQueues, createQueue
}) => {
  const [selected, setSelected] = useState<number | undefined>(subject?.id);
  const [cs, setCS] = useState<boolean>(false);
  const [cq, setCQ] = useState<boolean>(false);
  const [ds, setDS] = useState<boolean>(false);
  const [es, setES] = useState<boolean>(false);

  useEffect(() => {
    loadAll();
  }, [loadAll]);

  useEffect(() => {
    if (subject?.id) {
      loadQueues(subject.id);
    }
  }, [subject, loadQueues]);

  return (
    <div className={styles.subject_page}>
      <div className={lists.dark_list}>
        {subjects && subjects.map(s =>
          <div className={`${lists.dark_list_item} ${s.id === selected ? lists.selected : lists.simple}`}
               key={s.id}
               onClick={() => {
                 load(s.id);
                 setSelected(s.id)
               }}
          >
            <span className={listStyles.title}>{s.title}</span>
          </div>)
        }
        <div className={listStyles.button_container}>
          <button className={buttons.animated_border_button} onClick={() => setCS(true)}>
            <span>Create subject</span>
          </button>
        </div>
      </div>
      <div className={containers.content_general}>
        {!isSubjectLoading
          ? <div className={containers.main_content}>
              <span className={containers.dark_item_title}>{subject ? subject.title : ''}</span>
              <span className={containers.description}>{subject ? subject.description : ''}</span>
              <div className={containers.two_columns}>
                <div className={lists.light_list}>
                  <span className={lists.light_list_title}>Opened queues</span>
                  {isQueuesLoading
                    ? <Loader />
                    : queues && queues.filter(queue => queue.isOpen).map(queue =>
                        <Link to={`/queue/${queue.id}`} className={lists.light_list_item} key={queue.id}>
                          <span>{queue.title}</span>
                        </Link>
                      )
                  }
                </div>
                <div className={lists.light_list}>
                  <span className={lists.light_list_title}>Closed queues</span>
                  {isQueuesLoading
                    ? <Loader />
                    : queues && queues.filter(queue => !queue.isOpen).map(queue =>
                        <Link to={`/queue/${queue.id}`} className={lists.light_list_item} key={queue.id}>
                          <span>{queue.title}</span>
                        </Link>
                      )
                  }
                </div>
              </div>
            </div>
          : <Loader/>
        }
        <div className={containers.vertical_actions_panel}>
          <button className={`${buttons.button_simple} ${buttons.blue_simple}`}
                  onClick={() => {
                    if (subject) setES(true);
                  }}
          >Edit subject</button>
          <button className={`${buttons.button_simple} ${buttons.green_simple}`}
                  onClick={() => setCQ(true)}
          >Create queue</button>
          <button className={`${buttons.button_simple} ${buttons.red_simple}`}
                  onClick={() => setDS(true)}
          >Delete subject</button>
        </div>
      </div>
      {cs && <CreateSubjectWindow
        subject={undefined}
        onSubmit={data => {
          update(data);
          setCS(false);
        }}
        onClose={() => setCS(false)} />}
      {es && <CreateSubjectWindow
        subject={subject}
        onSubmit={data => {
          update(data);
          setES(false);
        }}
        onClose={() => setCS(false)} />}
      {ds && <ConfirmationWindow title="Confirm deletion"
                                 question="Delete this subject?"
                                 cancelValue="Cancel"
                                 submitValue="Delete"
                                 onSubmit={() => {
                                   deleteSubject({ id: subject?.id, subjectId: subject?.id });
                                   setDS(false);
                                 }}
                                 onCancel={() => setDS(false)}
      />}
      {cq && <CreateQueueWindow onSubmit={data => {
                                  createQueue({ ...data, subjectId: subject?.id, makerId: user?.id });
                                  setCQ(false);
                                }}
                                onClose={() => setCQ(false)}
      />}
    </div>
  );
};

const mapStateToProps = (appState: IAppState) => ({
  user: appState.auth.user,
  subject: appState.subject.subject,
  subjects: appState.subject.subjects,
  queues: appState.subject.queues,
  isSubjectLoading: appState.subject.isSubjectLoading,
  isQueuesLoading: appState.subject.isQueuesLoading
});

const mapDispatchToProps = {
  update: updateSubjectRoutine,
  deleteSubject: deleteSubjectRoutine,
  loadAll: loadAllSubjectsRoutine,
  load: loadSubjectRoutine,
  loadQueues: loadSubjectQueuesRoutine,
  createQueue: updateQueueRoutine
}

const connector = connect(mapStateToProps, mapDispatchToProps);
type ISubjectPageProps = ConnectedProps<typeof connector>;
export default connector(SubjectPage);