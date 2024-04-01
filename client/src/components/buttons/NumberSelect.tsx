'use client';
import React, { FC } from 'react';
import cx from 'classnames';
import styles from './NumberSelect.module.css';
interface NumberSelectInputProps {
  value: number | string;
  setValue: (value: string) => void;
  handleReset: () => void;
  additionalClassnames?: String[];
}
const NumberSelectInput: FC<NumberSelectInputProps> = ({
  value,
  setValue,
  handleReset,
  additionalClassnames = [],
}) => {
  const handleDecrease = () => {
    if (typeof value !== 'number') return;
    setValue(`${value - 1}`);
  };
  const handleIncreace = () => {
    if (typeof value !== 'number') return;
    setValue(`${value + 1}`);
  };
  return (
    <div className={cx(styles.container, ...additionalClassnames)}>
      <button
        className={styles.decrease}
        onClick={handleDecrease}
        disabled={typeof value === 'number' && value <= 1}
      >
        -
      </button>
      <input
        type="number"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onBlur={() => handleReset()}
        className={styles.input}
      />
      <button className={styles.increase} onClick={handleIncreace}>
        +
      </button>
    </div>
  );
};

interface NumberSelectProps {
  value: number | string;
  handleDecrease: () => void;
  handleIncrease: () => void;
  additionalClassnames?: String[];
}
export const NumberSelect: FC<NumberSelectProps> = ({
  value,
  handleIncrease,
  handleDecrease,
  additionalClassnames = [],
}) => {
  return (
    <div
      className={cx(
        styles.container,
        styles.containerWithoutInput,
        ...additionalClassnames,
      )}
    >
      <button
        className={styles.decrease}
        onClick={(e) => {
          e.stopPropagation();
          handleDecrease();
        }}
      >
        -
      </button>
      <span className={styles.valuePlaceholder}>{value}</span>
      <button
        className={styles.increase}
        onClick={(e) => {
          e.stopPropagation();
          handleIncrease();
        }}
      >
        +
      </button>
    </div>
  );
};

export default NumberSelectInput;
