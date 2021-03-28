import React, { useEffect, useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { IAppState } from '../../models/appState';
import { loadTeamsRoutine } from '../../sagas/team/routines';
import styles from './styles.module.sass';
import { useHistory } from 'react-router-dom';
import buttons from '../../components/styles/buttons.module.sass';
import containers from '../../components/styles/containers.module.sass';
import JoinTeamWindow from '../../components/JoinTeamWindow';
import TeamManagePage from '../../components/TreamManagePage';
import { updateTeamRoutine } from '../../sagas/team/routines';

const Dashboard: React.FC<IDashboardProps> = ({ teams, loadTeams, updateTeam }) => {
  const history = useHistory();
  const [jw, setJW] = useState<boolean>(false);
  const [ct, setCT] = useState<boolean>(false);

  useEffect(() => {
    loadTeams();
  }, [loadTeams]);

  return (
    <div>
      <span className={styles.section_title}>All your teams:</span>
      <div className={styles.card_container}>
        {teams && teams.map(team =>
          <div key={team.id} className={styles.card} onClick={() => history.push(`/team/${team.id}`)}>
            <span className={styles.card_title}>{team.name}</span>
            <div className={styles.card_description}>{team.description}</div>
          </div>
        )}
        <div className={styles.button_container}>
          <button className={buttons.animated_border_button} onClick={() => setJW(true)}>
            <span id="join_to_team">Join</span>
          </button>
        </div>
        <div className={styles.button_container}>
          <button className={buttons.animated_border_button} onClick={() => setCT(true)}>
            <span id="create_team">Create</span>
          </button>
        </div>
        {jw && <JoinTeamWindow onClose={() => setJW(false)}
                               onSuccess={() => {
                                 setJW(false);
                                 if (loadTeams) loadTeams();
                               }}
        /> }
        {ct && <TeamManagePage onClose={() => setCT(false)}
                               onSubmit={data => {
                                 updateTeam(data);
                                 setCT(false);
                               }}
        />}
      </div>
      <span className={styles.section_title}>Last events & updates:</span>
      <div className={styles.events_container}>
        <div className={containers.vertical_actions_panel}>
          <span className={styles.list_item}>You joined to a team 'IP-82'</span>
          <span className={styles.list_item}>Maks joined to the team 'IP-82'</span>
          <span className={styles.list_item}>Stepan leave the team 'IP-82'</span>
        </div>
        <div className={containers.vertical_actions_panel}>
          <span className={styles.list_item}>Queue 'Lab6' in Java subject opened</span>
          <span className={styles.list_item}>A few minutes left until queue 'Lab4' will be closed</span>
          <span className={styles.list_item}>Sasha recently create subject ''</span>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (appState: IAppState) => ({
  teams: appState.team.teams
});

const mapDispatchToProps = {
  loadTeams: loadTeamsRoutine,
  updateTeam: updateTeamRoutine
};

const connector = connect(mapStateToProps, mapDispatchToProps);
type IDashboardProps = ConnectedProps<typeof connector>;

export default connector(Dashboard);
