import React, { useState, useEffect } from 'react';
import styles from './styles.module.sass';
import containers from '../styles/containers.module.sass';
import inputs from '../styles/inputs.module.sass';
import Loader from '../Loader';
import apiClient from '../../helpers/webApi.helper';

export interface IInvitePageProps {
  id?: number | undefined;
  onClose: () => void;
}

const InvitePage: React.FC<IInvitePageProps> = ({ onClose, id }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [link, setLink] = useState<string>('');

  const handleOutsideClick = (event: any) => {
    if (event.target.id === 'background') {
      onClose();
    }
  };

  const regenerateLink = () => {
    if (!id) return;
    setLoading(true);
    apiClient.get({ endpoint: `/team/join-link/${id}?force=true` }).then(res => {
      res.text().then(l => setLink(l));
      setLoading(false);
    });
  }

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    apiClient.get({ endpoint: `/team/join-link/${id}` }).then(res => {
      res.text().then(l => setLink(l));
      setLoading(false);
    });
  }, []);

  return (
    <div className={containers.modal_background} onClick={handleOutsideClick} id="background">
      <div className={containers.window}>
        <span className={styles.title}>Get the link for joining</span>
        {loading
          ? <Loader />
          : <div className={styles.actions}>
              <div className={styles.input_group}>
                <input className={`${inputs.input_standard} ${styles.input}`}
                       disabled value={link}
                />
                <button className={styles.copy}
                        onClick={() =>
                          navigator.clipboard.writeText(link).then(() => {
                            setTimeout(() => setCopied(false), 3000);
                            setCopied(true);
                          })
                        }>
                  Copy
                </button>
              </div>
              <button className={`${styles.copy} ${styles.regenerate}`} onClick={() => regenerateLink()}>
                Regenerate
              </button>
            </div>
        }
        <span className={styles.copied}>{copied ? 'Link copied!' : '' }</span>
      </div>
    </div>
  );
};

export default InvitePage;