import React, { useState } from 'react';
import styles from './styles.module.sass';
import buttons from '../styles/buttons.module.sass';
import containers from '../styles/containers.module.sass';
import inputs from '../styles/inputs.module.sass';
import { ISubject } from '../../models/subject';

export interface ICreateSubjectProps {
  subject?: ISubject,
  onSubmit: (data: any) => void;
  onClose: () => void;
}

const CreateSubjectWindow: React.FC<ICreateSubjectProps> = ({ onClose, onSubmit, subject }) => {
  const [title, setTitle] = useState<string>(subject ? subject.title : '');
  const [description, setDescription] = useState<string>(subject ? subject.description : '');

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
        <input className={inputs.input_standard}
               defaultValue={subject?.title}
               onChange={event => setTitle(event.target.value)}/>
        <span className={styles.label}>Type a subject description</span>
        <textarea className={inputs.textarea_standard}
                  defaultValue={subject?.description}
                  onChange={event => setDescription(event.target.value)}/>
        <div className={containers.actions_panel}>
          <button onClick={() => onClose()} className={`${buttons.button} ${buttons.grey}`}>Cancel</button>
          <button onClick={() => onSubmit({ id: subject?.id, title, description })} className={`${buttons.button} ${buttons.green}`}>
            {subject ? 'Update' : 'Create'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateSubjectWindow;