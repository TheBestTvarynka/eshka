import React from 'react';
import styles from './styles.module.sass';
import { ITeamShort } from '../../models/team';

const selectedTeam = 1;

const teamsMock = [
  { id: '1', title: 'BananasTornadas', membersCount: 9 },
  { id: '2', title: 'IP-82', membersCount: 30 },
  { id: '3', title: 'MizarField', membersCount: 28 },
  { id: '4', title: 'Flowers', membersCount: 31 },
  { id: '5', title: 'CloudsOfTheGod', membersCount: 15 }
] as ITeamShort[];

const TeamsList = () => {
  return (
    <div className={styles.teams}>
      {/*<span>Teams</span>*/}
      {teamsMock.map((team, index) => (
        <div className={`${styles.team} ${index === selectedTeam ? styles.selected : styles.simple}`} key={team.id}>
          <span className={styles.title}>{team.title}</span>
          <span className={styles.members_count}>{team.membersCount} member(s)</span>
        </div>
      ))}
    </div>
  );
}

export default TeamsList;