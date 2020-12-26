import React, { useEffect, useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { IAppState } from '../../models/appState';
import { loadTeamsRoutine } from '../../sagas/team/routines';
import styles from './styles.module.sass';
import { useHistory } from 'react-router-dom';
import buttons from '../../components/styles/buttons.module.sass';
import JoinTeamWindow from '../../components/JoinTeamWindow';

const Dashboard: React.FC<IDashboardProps> = ({ teams, loadTeams }) => {
  const history = useHistory();
  const [jw, setJW] = useState<boolean>(false);

  useEffect(() => {
    loadTeams();
  }, [loadTeams]);

  return (
    <div className={styles.card_container}>
      {teams && teams.map(team =>
        <div key={team.id} className={styles.card} onClick={() => history.push(`/team/${team.id}`)}>
          <span className={styles.card_title}>{team.name}</span>
          <div className={styles.card_description}>{team.description}</div>
        </div>
      )}
      <div className={styles.button_container}>
        <button className={buttons.animated_border_button} onClick={() => setJW(true)}>
          <span>Join</span>
        </button>
      </div>
      {jw && <JoinTeamWindow onClose={() => setJW(false)}
                             onSuccess={() => {
                               setJW(false);
                               if (loadTeams) loadTeams();
                             }}
      /> }
    </div>
  );
};

const mapStateToProps = (appState: IAppState) => ({
  teams: appState.team.teams
});

const mapDispatchToProps = {
  loadTeams: loadTeamsRoutine
};

const connector = connect(mapStateToProps, mapDispatchToProps);
type IDashboardProps = ConnectedProps<typeof connector>;

export default connector(Dashboard);