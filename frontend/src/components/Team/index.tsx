import React from 'react';
import styles from './styles.module.sass';

const teamMock = {
  id: '1',
  title: 'IP-82',
  description: 'IP-82 - group of KPI university. 121 specialization. FICT faculty. Third year of bachelors degree.',
  members: [
    { id: '1', fullName: 'Kirito Mikoto', logo: 'https://img.icons8.com/color/48/000000/test-account.png' },
    { id: '2', fullName: 'Madara Uchiha', logo: 'https://img.icons8.com/color/48/000000/test-account.png' },
    { id: '3', fullName: 'Kimimaru Ootsuki', logo: 'https://img.icons8.com/color/48/000000/test-account.png' }],
  subjects: [
    { id: '1', title: 'Math' },
    { id: '2', title: 'Funtional Programming' },
    { id: '3', title: 'OOP: Java' }]
};

const Team = () => {
  return (
    <div className={styles.team}>
      <div className={styles.team_content}>
        <span className={styles.title}>{teamMock.title}</span>
        <span className={styles.description}>{teamMock.description}</span>
        <div className={styles.team_data}>
          <div className={styles.item_list}>
            <span className={styles.list_title}>Members</span>
            {teamMock.members.map(member => (
              <div key={member.id} className={styles.list_item}>
                <img src={member.logo} alt="ProfilePicture" />
                <span>{member.fullName}</span>
              </div>
            ))}
          </div>
          <div className={styles.item_list}>
            <span className={styles.list_title}>Subjects</span>
            {teamMock.subjects.map(subject => (
              <div key={subject.id} className={styles.list_item}>
                <span>{subject.title}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className={styles.team_actions}>
        <button className={styles.blue}>Manage</button>
        <button className={styles.green}>Invite</button>
        <button className={styles.red}>Leave</button>
      </div>
    </div>
  );
}

export default Team;