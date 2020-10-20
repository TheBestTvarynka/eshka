import React, { useState, useEffect } from 'react';
import {connect, ConnectedProps} from 'react-redux';
import {
  updateSubjectRoutine,
  deleteSubjectRoutine,
  loadAllSubjectsRoutine,
  loadSubjectRoutine
} from '../../sagas/subject/routines';
import CreateSubjectWindow from '../../components/CreateSubjectWindow';
import ConfirmationWindow from '../../components/ConfirmationWindow';
import Loader from '../../components/Loader';
import listStyles from '../../components/TeamsList/styles.module.sass';
import containers from '../../components/styles/containers.module.sass';
import lists from '../../components/styles/lists.module.sass';
import buttons from '../../components/styles/buttons.module.sass';
import styles from './styles.module.sass';
import { IAppState } from '../../models/appState';
import { IQueueShort } from '../../models/queue';

const closedQueues = [
  { id: '1', name: 'Lab 1', participants: 23 },
  { id: '2', name: 'Lab 2', participants: 15 },
  { id: '3', name: 'Lab 3', participants: 19 }
] as IQueueShort[];

const openedQueues = [
  { id: '1', name: 'Lab 4', participants: 16 },
  { id: '2', name: 'Lab 5', participants: 13 },
  { id: '3', name: 'Lab 6', participants: 6 }
] as IQueueShort[];

const SubjectPage: React.FC<ISubjectPageProps> = ({
  subject, subjects, isSubjectLoading, update, deleteSubject, loadAll, load
}) => {
  const [selected, setSelected] = useState<number | undefined>(subject?.id);
  const [cs, setCS] = useState<boolean>(false);
  const [ds, setDS] = useState<boolean>(false);
  const [edit, setEdit] = useState<boolean>(false);

  useEffect(() => {
    loadAll();
  }, [loadAll]);

  return (
    <div className={styles.subject_page}>
      <div className={listStyles.list}>
        {subjects && subjects.map(s =>
          <div className={`${listStyles.item} ${s.id === selected ? listStyles.selected : listStyles.simple}`}
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
              <span className={containers.title}>{subject ? subject.title : ''}</span>
              <span className={containers.description}>{subject ? subject.description : ''}</span>
              <div className={containers.two_columns}>
                <div className={lists.light_list}>
                  <span className={lists.light_list_title}>Opened queues</span>
                  {openedQueues.map(queue =>
                    <div className={lists.light_list_item} key={queue.id}>
                      <span>{queue.name} ({queue.participants})</span>
                    </div>
                  )}
                </div>
                <div className={lists.light_list}>
                  <span className={lists.light_list_title}>Closed queues</span>
                  {closedQueues.map(queue =>
                    <div className={lists.light_list_item} key={queue.id}>
                      <span>{queue.name} ({queue.participants})</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          : <Loader/>
        }
        <div className={containers.vertical_actions_panel}>
          <button className={`${buttons.button_simple} ${buttons.blue_simple}`}
                  onClick={() => {
                    if (subject) {
                      setEdit(true);
                      setCS(true);
                    }
                  }}
          >Edit subject</button>
          <button className={`${buttons.button_simple} ${buttons.green_simple}`}>Create queue</button>
          <button className={`${buttons.button_simple} ${buttons.red_simple}`}
                  onClick={() => setDS(true)}
          >Delete subject</button>
        </div>
      </div>
      {cs && <CreateSubjectWindow
        subject={edit ? subject : undefined}
        onSubmit={data => {
          update(data);
          setCS(false);
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
    </div>
  );
};

const mapStateToProps = (appState: IAppState) => ({
  subject: appState.subject.subject,
  subjects: appState.subject.subjects,
  isSubjectLoading: appState.subject.isSubjectLoading
});

const mapDispatchToProps = {
  update: updateSubjectRoutine,
  deleteSubject: deleteSubjectRoutine,
  loadAll: loadAllSubjectsRoutine,
  load: loadSubjectRoutine
}

const connector = connect(mapStateToProps, mapDispatchToProps);
type ISubjectPageProps = ConnectedProps<typeof connector>;
export default connector(SubjectPage);