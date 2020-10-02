import React from 'react';
import TeamsList from '../../components/TeamsList';
import Team from '../../components/Team';
import styles from './styles.module.sass';

const MainPage = () => {
  return (
    <div className={styles.main_page}>
      <TeamsList />
      <Team />
    </div>
  );
}

export default MainPage;