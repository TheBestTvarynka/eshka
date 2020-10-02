import React from 'react';
import styles from './styles.module.sass';

const selectedTeam = 1;

const teamsMock = [
  { title: 'BananasTornadas', membersCount: 9 },
  { title: 'MizarField', membersCount: 28 },
  { title: 'Flowers', membersCount: 31 },
  { title: 'CloudsOfTheGod', membersCount: 15 }
];

const TeamsList = () => {
  return (
    <div className={styles.teams}>
      {teamsMock.map((team, index) => (
        <div className={`${styles.team} ${index === selectedTeam ? styles.selected : styles.simple}`}>
          <span className={styles.title}>{team.title}</span>
          <span className={styles.members_count}>{team.membersCount} member(s)</span>
        </div>
      ))}
    </div>
  );
}

export default TeamsList;