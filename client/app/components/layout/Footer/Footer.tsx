import React from 'react';
import styles from "./Footer.module.css"

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <p>Все права защищены &copy; 2024</p>
        <p>Контактная информация: example@example.com</p>
      </div>
    </footer>
  );
}