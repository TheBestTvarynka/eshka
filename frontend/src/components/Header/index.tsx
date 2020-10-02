import React, { FC } from 'react';
import styles from './styles.module.sass';

const Header: FC = () => {
  return (
    <div className={styles.header}>
      <div className={styles.header_group}>
        <img src="https://img.icons8.com/color/48/000000/e-key.png"
             alt="Logo"
             className={styles.logo}
        />
        <span className={styles.app_name}>Eshka</span>
      </div>
      <div className={styles.header_group}>
        <img src="https://img.icons8.com/flat_round/64/000000/plus.png" alt="Add"/>
        <img src="https://img.icons8.com/color/48/000000/test-account.png" alt="Profile"/>
        <img src="https://img.icons8.com/fluent-systems-regular/48/000000/exit.png" alt="SignOut"/>
      </div>
    </div>
  );
};

export default Header;