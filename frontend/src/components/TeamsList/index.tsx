import React, { useState } from 'react';
import JoinTeamWindow from '../JoinTeamWindow';
import styles from './styles.module.sass';
import buttons from '../styles/buttons.module.sass';
import lists from '../styles/lists.module.sass';
import { ITeamShort } from '../../models/team';

const teamsMock = [
  { id: '1', title: 'BananasTornadas', membersCount: 9 },
  { id: '2', title: 'IP-82', membersCount: 30 },
  { id: '3', title: 'MizarField', membersCount: 28 },
  { id: '4', title: 'Flowers', membersCount: 31 },
  { id: '5', title: 'CloudsOfTheGod', membersCount: 15 }
] as ITeamShort[];

const TeamsList = () => {
  const [selected, setSelected] = useState<number>(1);
  const [jw, setJW] = useState<boolean>(false);
  return (
    <div className={lists.dark_list}>
      {teamsMock.map((team, index) => (
        <div className={`${lists.dark_list_item} ${index === selected ? lists.selected : lists.simple}`}
             key={team.id}
             onClick={() => setSelected(index)}
        >
          <span className={lists.dark_item_title}>{team.title}</span>
          <span className={lists.members_count}>{team.membersCount} member(s)</span>
        </div>
      ))}
      <div className={styles.button_container}>
        <button className={buttons.animated_border_button} onClick={() => setJW(true)}>
          <span>Join team</span>
        </button>
      </div>
      {jw && <JoinTeamWindow onClose={() => setJW(false)}/> }
    </div>
  );
}

export default TeamsList;