import React, { useState } from 'react';
import styles from './styles.module.sass';
import inputs from '../styles/inputs.module.sass';
import buttons from '../styles/buttons.module.sass';
import containers from '../styles/containers.module.sass';

export interface IJoinTeamWindowProps {
  onClose: () => void;
}

const JoinTeamWindow: React.FC<IJoinTeamWindowProps> = ({ onClose }) => {
  const [link, setLink] = useState<string>('');
  const handleOutsideClick = (event: any) => {
    if (event.target.id === 'background') {
      onClose();
    }
  };
  return (
    <div onClick={handleOutsideClick} id="background" className={containers.modal_background}>
      <form className={containers.window}>
        <span className={styles.title}>Type a link below</span>
        <input className={inputs.input_standard}
               placeholder="https://eshka.com/join/<some_letters>"
               onChange={event => setLink(event.target.value)}
        />
        <span className={styles.hint}>*You can join only with provided id</span>
        <div className={containers.actions_panel}>
          <button onClick={() => onClose()} className={`${buttons.button} ${buttons.grey}`}>Cancel</button>
          <button onClick={() => onClose()} className={`${buttons.button} ${buttons.green}`}>Join</button>
        </div>
      </form>
    </div>
  );
};

export default JoinTeamWindow;