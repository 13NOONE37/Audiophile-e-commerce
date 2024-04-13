import React, { FC, HTMLInputTypeAttribute, useId } from 'react';
import cx from 'classnames';
import styles from './input.module.css';
import { FormikHandlers } from 'formik';

interface InputProps {
  value: string;
  error: string | undefined;
  touched: boolean | undefined;
  name: string;
  handleChange: FormikHandlers['handleChange'];
  handleBlur: FormikHandlers['handleBlur'];

  label: string;
  placeholder: string;
  inputType: HTMLInputTypeAttribute;
  additionalClassnames?: string[];
}
const Input: FC<InputProps> = ({
  value,
  error,
  touched,
  name,
  handleChange,
  handleBlur,

  label,
  placeholder,
  inputType,
  additionalClassnames = [],
}) => {
  const id = useId();
  return (
    <div
      className={cx(styles.container, ...additionalClassnames, {
        [styles.container__error]: error && touched,
      })}
    >
      <input
        id={id}
        type={inputType}
        value={value}
        name={name}
        placeholder={placeholder}
        onChange={handleChange}
        onBlur={handleBlur}
        className={styles.input}
      />
      <label htmlFor={id} className={styles.label}>
        {label}
      </label>
      {error && touched ? <span className={styles.error}>{error}</span> : ''}
    </div>
  );
};

export default Input;
