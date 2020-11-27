import React, { useState } from 'react';
import styles from './styles.module.sass';
import inputs from '../styles/inputs.module.sass';
import buttons from '../styles/buttons.module.sass';
import containers from '../styles/containers.module.sass';
import apiClient from '../../helpers/webApi.helper';
import { toastr } from 'react-redux-toastr';
import Loader from "../Loader";

export interface IJoinTeamWindowProps {
  onClose: () => void;
  onSuccess: () => void;
}

const JoinTeamWindow: React.FC<IJoinTeamWindowProps> = ({ onSuccess, onClose }) => {
  const [link, setLink] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleJoin = () => {
    if (!link) return;
    setLoading(true);
    apiClient.post({ endpoint: `/team/join/${link}` }).then(res => {
      setLoading(false);
      if (res.status === 200) {
        toastr.success('Joining success!', '');
        onSuccess();
      } else {
        res.text().then(text => toastr.error(text, ''));
      }
    }).catch(() => {
      setLoading(false);
      toastr.error('Error with joining!', '');
    });
  };

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
               placeholder="aAbBbd"
               onChange={event => setLink(event.target.value)}
        />
        <span className={styles.hint}>*You can join only with provided id</span>
        {loading
          ? <Loader />
          : <div className={containers.actions_panel}>
              <button onClick={onClose} className={`${buttons.button} ${buttons.grey}`}>Cancel</button>
              <button onClick={handleJoin} className={`${buttons.button} ${buttons.green}`}>Join</button>
            </div>
        }
      </form>
    </div>
  );
};

export default JoinTeamWindow;