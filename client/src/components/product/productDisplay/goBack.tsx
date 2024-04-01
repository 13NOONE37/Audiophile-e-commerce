'use client';
import { useRouter } from 'next/navigation';
import React from 'react';
import styles from './productDisplay.module.css';
const GoBack = () => {
  const router = useRouter();

  return (
    <button
      onClick={() => {
        router.back();
      }}
      className={styles.goBack}
    >
      Go Back
    </button>
  );
};

export default GoBack;
