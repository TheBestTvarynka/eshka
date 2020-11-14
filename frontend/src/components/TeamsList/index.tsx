import React, { useState, useEffect } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import JoinTeamWindow from '../JoinTeamWindow';
import styles from './styles.module.sass';
import buttons from '../styles/buttons.module.sass';
import lists from '../styles/lists.module.sass';
import { IAppState } from '../../models/appState';
import { loadTeamsRoutine, loadTeamRoutine } from '../../sagas/team/routines';

const TeamsList: React.FC<ITeamListProps> = ({ id, teams, loadTeams, loadTeam }) => {
  const [jw, setJW] = useState<boolean>(false);

  useEffect(() => {
    loadTeams();
  }, [loadTeams]);

  return (
    <div className={lists.dark_list}>
      {teams && teams.map(team => (
        <div className={`${lists.dark_list_item} ${team.id === id ? lists.selected : lists.simple}`}
             key={team.id}
             onClick={() => loadTeam(team.id)}
        >
          <span className={lists.dark_item_title}>{team.name}</span>
          <span className={lists.members_count}>{team.description.substr(0, 30)}...</span>
        </div>
      ))}
      <div className={styles.button_container}>
        <button className={buttons.animated_border_button} onClick={() => setJW(true)}>
          <span>Join</span>
        </button>
      </div>
      {jw && <JoinTeamWindow onClose={() => setJW(false)}/> }
    </div>
  );
}

const mapStateToProps = (appState: IAppState) => ({
  id: appState.team.team?.id,
  teams: appState.team.teams
});

const mapDispatchToProps = {
  loadTeams: loadTeamsRoutine,
  loadTeam: loadTeamRoutine
};

const connector = connect(mapStateToProps, mapDispatchToProps);
type ITeamListProps = ConnectedProps<typeof connector>;
export default connector(TeamsList);