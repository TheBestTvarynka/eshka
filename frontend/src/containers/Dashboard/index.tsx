import React, { useEffect } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { IAppState } from '../../models/appState';
import { loadTeamsRoutine, loadTeamRoutine } from '../../sagas/team/routines';
import styles from './styles.module.sass';
import { useHistory } from 'react-router-dom';
// import Loader from '../../components/Loader';

const Dashboard: React.FC<IDashboardProps> = ({ id, teams, loadTeams, loadTeam}) => {
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
  id: appState.team.team?.id,
  teams: appState.team.teams
});

const mapDispatchToProps = {
  loadTeams: loadTeamsRoutine,
  loadTeam: loadTeamRoutine
};

const connector = connect(mapStateToProps, mapDispatchToProps);
type IDashboardProps = ConnectedProps<typeof connector>;

export default connector(Dashboard);