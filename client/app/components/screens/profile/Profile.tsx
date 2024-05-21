import React from 'react';
import { UserProfileProps } from './profile.interface';

import styles from './Profile.module.css';


const UserProfile: React.FC<UserProfileProps> = ({ id, name, email, role }) => {
  return (
    <div className={styles.container}>
      <h1>Профиль пользователя</h1>
      <div className={styles.profileInfo}>
        <p><strong>ID:</strong> {id}</p>
        <p><strong>Имя:</strong> {name}</p>
        <p><strong>Email:</strong> {email}</p>
        <p><strong>Роль:</strong> {role}</p>
      </div>
    </div>
  );
};

export default UserProfile