import React, { useState } from 'react';
import styles from './styles.module.sass';
import buttons from '../styles/buttons.module.sass';
import containers from '../styles/containers.module.sass';
import inputs from '../styles/inputs.module.sass';
import { IQueue } from '../../models/queue';

export interface ICreateQueueProps {
  queue?: IQueue;
  onSubmit: (data: any) => void;
  onClose: () => void;
}

const CreateQueueWindow: React.FC<ICreateQueueProps> = ({ queue, onSubmit, onClose }) => {
  const [title, setTitle] = useState<string>(queue ? queue.title : '');
  const [description, setDescription] = useState<string>(queue ? queue.description : '');
  const [startDate, setStartDate] = useState<Date>(queue ? queue.startDate : new Date());
  const [endDate, setEndDate] = useState<Date>(queue ? queue.endDate : new Date());

  const handleOutsideClick = (event: any) => {
    if (event.target.id === 'background') {
      onClose();
    }
  };
  return (
    <div className={containers.modal_background} onClick={handleOutsideClick} id="background">
      <form className={containers.window}>
        <span className={styles.title}>Create a new queue</span>
        <span className={styles.label}>Type a subject title</span>
        <input type="text"
               className={inputs.input_standard}
               defaultValue={queue?.title}
               onChange={event => setTitle(event.target.value)}
        />
        <span className={styles.label}>Type a subject description</span>
        <input type="text"
               className={inputs.input_standard}
               defaultValue={queue?.description}
               onChange={event => setDescription(event.target.value)}
        />
        <span className={styles.label}>Set subject start date</span>
        <input type="date"
               className={inputs.input_standard}
               onChange={event => setStartDate(new Date(event.target.value))}
               defaultValue={new Date().toString()}
        />
        <span className={styles.label}>Set subject end date</span>
        <input type="date"
               className={inputs.input_standard}
               onChange={event => setEndDate(new Date(event.target.value))}
               defaultValue={new Date().toString()}
        />
        <div className={containers.actions_panel}>
          <button onClick={() => onClose()} className={`${buttons.button} ${buttons.grey}`}>Cancel</button>
          <button onClick={() => onSubmit({ title, description, startDate, endDate })}
                  className={`${buttons.button} ${buttons.green}`}>
            {queue ? 'Update' : 'Create'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateQueueWindow;