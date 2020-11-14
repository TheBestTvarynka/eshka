import React, { useState } from 'react';
import styles from './styles.module.sass';
import inputs from '../styles/inputs.module.sass';
import buttons from '../styles/buttons.module.sass';
import containers from '../styles/containers.module.sass';
import { ITeam } from '../../models/team';

export interface ITeamManagePageProps {
  team?: ITeam;
  onSubmit: (data: any) => void;
  onClose: () => void;
}

const TeamManagePage: React.FC<ITeamManagePageProps> = ({ team, onSubmit, onClose }) => {
  const [name, setName] = useState<string>(team ? team.name : '');
  const [description, setDescription] = useState<string>(team ? team.description : '');

  const handleOutsideClick = (event: any) => {
    if (event.target.id === 'background') {
      onClose();
    }
  };

  return (
    <div className={containers.modal_background} id="background" onClick={handleOutsideClick}>
      <form className={`${containers.window} ${styles.window}`}>
        <label className={styles.title}>{team ? 'Update' : 'Create a new'} team</label>
        <label className={styles.label}>Name</label>
        <input className={inputs.input_standard}
               placeholder="team name"
               defaultValue={team?.name}
               onChange={event => setName(event.target.value)}
        />
        <label className={styles.label}>Description</label>
        <textarea className={inputs.textarea_standard}
                  placeholder="team description"
                  defaultValue={team?.description}
                  onChange={event => setDescription(event.target.value)}
        />
        <div className={containers.actions_panel}>
          <button className={`${buttons.button} ${buttons.grey}`} onClick={() => onClose()}>Cancel</button>
          <button className={`${buttons.button} ${buttons.green}`}
                  onClick={() => onSubmit({ id: team?.id, name, description })}>
            {team ? 'Update' : 'Create'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default TeamManagePage;