import React, { useState } from 'react';
import styles from './styles.module.sass';
import buttons from '../styles/buttons.module.sass';
import containers from '../styles/containers.module.sass';
import inputs from '../styles/inputs.module.sass';
import { IQueue } from '../../models/queue';
import dateTimeHelper from '../../helpers/dateTimeHelper';

export interface ICreateQueueProps {
  queue?: IQueue;
  onSubmit: (data: any) => void;
  onClose: () => void;
}

const CreateQueueWindow: React.FC<ICreateQueueProps> = ({ queue, onSubmit, onClose }) => {
  const [title, setTitle] = useState<string>(queue ? queue.title : '');
  const [description, setDescription] = useState<string>(queue ? queue.description : '');
  const [startDate, setStartDate] = useState<string[]>(queue
    ? [dateTimeHelper.dateToInputDate(queue.startDate), dateTimeHelper.dateToInputTime(queue.startDate)]
    : [dateTimeHelper.dateToInputDate(new Date()), '09:00']
  );
  const [endDate, setEndDate] = useState<string[]>(queue
    ? [dateTimeHelper.dateToInputDate(queue.endDate), dateTimeHelper.dateToInputTime(queue.endDate)]
    : [dateTimeHelper.dateToInputDate(new Date()), '10:00']
  );

  const handleOutsideClick = (event: any) => {
    if (event.target.id === 'background') {
      onClose();
    }
  };
  return (
    <div className={containers.modal_background} onClick={handleOutsideClick} id="background">
      <form className={containers.window}>
        <span className={styles.title}>{queue ? 'Update' : 'Create new'} queue</span>
        <span className={styles.label}>Type a queue name</span>
        <input type="text"
               className={inputs.input_standard}
               defaultValue={queue?.title}
               onChange={event => setTitle(event.target.value)}
        />
        <span className={styles.label}>Type a queue description</span>
        <input type="text"
               className={inputs.input_standard}
               defaultValue={queue?.description}
               onChange={event => setDescription(event.target.value)}
        />
        <span className={styles.label}>Set queue start date & time</span>
        <div className={styles.datetime_selection}>
          <input type="date"
                 className={inputs.input_standard}
                 onChange={event => {
                   console.log(event.target.value);
                   setStartDate([event.target.value, startDate[1]]);
                 }}
                 defaultValue={startDate[0]}
          />
          <input type="time"
                 className={inputs.input_standard}
                 onChange={event => {
                   console.log(event.target.value);
                   setStartDate([startDate[0], event.target.value]);
                 }}
                 defaultValue={startDate[1]}
          />
        </div>
        <span className={styles.label}>Set queue end date & time</span>
        <div className={styles.datetime_selection}>
          <input type="date"
                 className={inputs.input_standard}
                 onChange={event => {
                   console.log(event.target.value);
                   setEndDate([event.target.value, endDate[1]]);
                 }}
                 defaultValue={endDate[0]}
          />
          <input type="time"
                 className={inputs.input_standard}
                 onChange={event => {
                   console.log(event.target.value);
                   setEndDate([endDate[0], event.target.value]);
                 }}
                 defaultValue={endDate[1]}
          />
        </div>
        <div className={containers.actions_panel}>
          <button onClick={() => onClose()} className={`${buttons.button} ${buttons.grey}`}>Cancel</button>
          <button onClick={() => onSubmit({
                    title,
                    description,
                    startDate: new Date(startDate.join(' ')),
                    endDate: new Date(endDate.join(' '))
                  })}
                  className={`${buttons.button} ${buttons.green}`}>
            {queue ? 'Update' : 'Create'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateQueueWindow;