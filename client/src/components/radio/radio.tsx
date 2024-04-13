import React, { Dispatch, FC, SetStateAction, useId } from 'react';
import styles from './radio.module.css';
import { FormikHandlers } from 'formik';
interface RadioSelectionProps {
  value: string;
  handleChange: FormikHandlers['handleChange'];
  handleBlur: FormikHandlers['handleBlur'];
  text: string;
  name: string;
}
const RadioSelection: FC<RadioSelectionProps> = ({
  value,
  handleChange,
  handleBlur,
  text,
  name,
}) => {
  const id = useId();
  return (
    <div className={styles.container}>
      <input
        id={id}
        type={'radio'}
        name={name}
        value={text}
        checked={value === text}
        onChange={handleChange}
        onBlur={handleBlur}
        className={styles.input}
      />
      <label htmlFor={id} className={styles.label}>
        {text}
      </label>
    </div>
  );
};

export default RadioSelection;
