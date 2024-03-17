import React, { FC } from 'react';
import styles from './headerIndicator.module.css';
interface HeaderIndicatorProps {
  children: React.ReactNode;
}
const HeaderIndicator: FC<HeaderIndicatorProps> = ({ children }) => {
  return (
    <section className={styles.container}>
      <h1 className={styles.heading}>{children}</h1>
    </section>
  );
};

export default HeaderIndicator;
