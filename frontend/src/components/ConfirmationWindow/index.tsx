import React from 'react';
import styles from './styles.module.sass';
import buttons from '../styles/buttons.module.sass';
import containers from '../styles/containers.module.sass';

export interface IConfirmationWindowProps {
  title: string;
  question: string;
  submitValue: string;
  onSubmit: () => void;
  cancelValue: string;
  onCancel: () => void;
}

const ConfirmationWindow: React.FC<IConfirmationWindowProps> = ({
  title, question, submitValue, onSubmit, cancelValue, onCancel
}) => {
  const handleOutsideClick = (event: any) => {
    if (event.target.id === 'background') {
      onCancel();
    }
  };
  return (
    <div className={containers.modal_background} onClick={handleOutsideClick} id="background">
      <div className={containers.window}>
        <span className={styles.title}>{title}</span>
        <span className={styles.question}>{question}</span>
        <div className={containers.actions_panel}>
          <button onClick={onCancel} className={`${buttons.button} ${buttons.green}`}>{cancelValue}</button>
          <button onClick={onSubmit} className={`${buttons.button} ${buttons.red}`}>{submitValue}</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationWindow;