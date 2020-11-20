import React, { useEffect } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { IAppState } from '../../models/appState';
import { loadTeamsRoutine } from '../../sagas/team/routines';
import styles from './styles.module.sass';
import { useHistory } from 'react-router-dom';

const Dashboard: React.FC<IDashboardProps> = ({ teams, loadTeams }) => {
  const history = useHistory();

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