import React from 'react';
import styles from './styles.module.sass';
import inputs from '../styles/inputs.module.sass';
import buttons from '../styles/buttons.module.sass';
import containers from '../styles/containers.module.sass';

export interface ITeamManagePageProps {
  onClose: () => void;
}

const TeamManagePage: React.FC<ITeamManagePageProps> = ({ onClose }) => {
  const handleOutsideClick = (event: any) => {
    if (event.target.id === 'background') {
      onClose();
    }
  };
  return (
    <div className={containers.modal_background} id="background" onClick={handleOutsideClick}>
      <form className={`${containers.window} ${styles.window}`}>
        <label className={styles.title}>Edit team preferences</label>
        <label className={styles.label}>Name</label>
        <input className={inputs.input_standard} placeholder="team name"/>
        <label className={styles.label}>Description</label>
        <textarea className={inputs.textarea_standatd} placeholder="team description"/>
        <div className={containers.actions_panel}>
          <button className={`${buttons.button} ${buttons.grey}`} onClick={() => onClose()}>Cancel</button>
          <button className={`${buttons.button} ${buttons.green}`} onClick={() => onClose()}>Update</button>
        </div>
      </form>
    </div>
  );
};

export default TeamManagePage;