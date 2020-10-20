import React from 'react';
import styles from './styles.module.sass';
import buttons from '../styles/buttons.module.sass';
import containers from '../styles/containers.module.sass';
import inputs from '../styles/inputs.module.sass';

export interface ICreateSubjectProps {
  onClose: () => void;
}

const CreateSubjectWindow: React.FC<ICreateSubjectProps> = ({ onClose }) => {
  const handleOutsideClick = (event: any) => {
    if (event.target.id === 'background') {
      onClose();
    }
  };
  return (
    <div className={containers.modal_background} onClick={handleOutsideClick} id="background">
      <form className={containers.window}>
        <span className={styles.title}>Create a new subject</span>
        <span className={styles.label}>Type a subject title</span>
        <input className={inputs.input_standard}/>
        <span className={styles.label}>Type a subject description</span>
        <textarea className={inputs.textarea_standard}/>
        <div className={containers.actions_panel}>
          <button onClick={() => onClose()} className={`${buttons.button} ${buttons.grey}`}>Cancel</button>
          <button onClick={() => onClose()} className={`${buttons.button} ${buttons.green}`}>Create</button>
        </div>
      </form>
    </div>
  );
};

export default CreateSubjectWindow;