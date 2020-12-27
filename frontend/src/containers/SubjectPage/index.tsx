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
import { updateQueueRoutine } from '../../sagas/queue/routines';
import { loadTeamRoutine } from '../../sagas/team/routines';
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
import { useParams, useHistory } from 'react-router-dom';
import { ISubject } from '../../models/subject';

const subjectComparator = (s1: ISubject, s2: ISubject) => {
  if (s1.title === s2.title) {
    return 0;
  } else if (s1.title > s2.title) {
    return 1;
  } else {
    return -1;
  }
};

const SubjectPage: React.FC<ISubjectPageProps> = ({
  user, subject, subjects, isSubjectLoading, queues, isQueuesLoading, teamId,
  update, deleteSubject, loadAll, load, loadQueues, createQueue, loadTeam
}) => {
  const params: any = useParams();
  const history = useHistory();
  const [cs, setCS] = useState<boolean>(false);
  const [cq, setCQ] = useState<boolean>(false);
  const [ds, setDS] = useState<boolean>(false);
  const [es, setES] = useState<boolean>(false);

  useEffect(() => {
    if (subject?.teamId) {
      loadAll(subject.teamId);
      if (!teamId) {
        loadTeam(subject.teamId);
      }
    }
  }, [loadAll, subject, teamId]);

  useEffect(() => {
    const id = params.id;
    if (id) {
      load(id);
      loadQueues(id);
    }
  }, [params, loadQueues, load]);

  return (
    <div className={styles.subject_page}>
      <div className={lists.dark_list}>
        {subjects && subjects.sort(subjectComparator).map(s =>
          <div className={`${lists.dark_list_item} ${s.id === subject?.id ? lists.selected : lists.simple}`}
               key={s.id}
               onClick={() => history.push(`/subject/${s.id}`)}
          >
            <span className={listStyles.title}>{s.title}</span>
          </div>)
        }
        <div className={listStyles.button_container}>
          <button className={buttons.animated_border_button} onClick={() => setCS(true)}>
            <span>Create subject</span>
          </button>
        </div>
        <div className={listStyles.button_container}>
          <button className={buttons.animated_border_button}
                  onClick={() =>
                    subject?.teamId ? history.push(`/team/${subject.teamId}`) : history.push("/dashboard")
                  }
          >
            <span>Back to teams</span>
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
        onSubmit={data => {
          update({ ...data, teamId });
          setCS(false);
        }}
        onClose={() => setCS(false)} />}
      {es && <CreateSubjectWindow
        subject={subject}
        onSubmit={data => {
          update({ ...data, teamId: subject?.teamId });
          setES(false);
        }}
        onClose={() => setCS(false)} />}
      {ds && <ConfirmationWindow title="Confirm deletion"
                                 question="Delete this subject?"
                                 cancelValue="Cancel"
                                 submitValue="Delete"
                                 onSubmit={() => {
                                   deleteSubject({ id: subject?.id, teamId });
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
  teamId: appState.team.team?.id, // temporary parameter
  isSubjectLoading: appState.subject.isSubjectLoading,
  isQueuesLoading: appState.subject.isQueuesLoading
});

const mapDispatchToProps = {
  update: updateSubjectRoutine,
  deleteSubject: deleteSubjectRoutine,
  loadAll: loadAllSubjectsRoutine,
  load: loadSubjectRoutine,
  loadQueues: loadSubjectQueuesRoutine,
  createQueue: updateQueueRoutine,
  loadTeam: loadTeamRoutine,
}

const connector = connect(mapStateToProps, mapDispatchToProps);
type ISubjectPageProps = ConnectedProps<typeof connector>;
export default connector(SubjectPage);