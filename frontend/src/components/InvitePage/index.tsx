import React, { useState } from 'react';
import styles from './styles.module.sass';
import containers from '../styles/containers.module.sass';
import inputs from '../styles/inputs.module.sass';

export interface IInvitePageProps {
  onClose: () => void;
}

const InvitePage: React.FC<IInvitePageProps> = ({ onClose }) => {
  const [copied, setCopied] = useState<boolean>(false);
  const handleOutsideClick = (event: any) => {
    if (event.target.id === 'background') {
      onClose();
    }
  };
  return (
    <div className={containers.modal_background} onClick={handleOutsideClick} id="background">
      <div className={containers.window}>
        <span className={styles.title}>Get the link for joining</span>
        <div className={styles.actions}>
          <div className={styles.input_group}>
            <input className={`${inputs.input_standard} ${styles.input}`} disabled value="https://eshla.com/join/foforeoierJNfr94jnv"/>
            <button className={styles.copy} onClick={() => setCopied(true)}>Copy</button>
          </div>
          <button className={`${styles.copy} ${styles.regenerate}`}>Regenerate</button>
        </div>
        {copied && <span className={styles.copied}>Link copied!</span>}
      </div>
    </div>
  );
};

export default InvitePage;