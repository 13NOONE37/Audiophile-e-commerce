'use client';
import React, { FC, MouseEventHandler } from 'react';
import cx from 'classnames';
import styles from './button.module.css';

export interface ButtonProps {
  style: 'primary' | 'secondary';
  onClick: MouseEventHandler<HTMLButtonElement>;
  children: React.ReactNode;
  additionalClassnames?: String[];
}

const Button: FC<ButtonProps> = ({
  style,
  onClick,
  additionalClassnames = [],
  children,
}) => {
  return (
    <button
      onClick={onClick}
      className={cx(styles.button, styles[style], ...additionalClassnames)}
    >
      {children}
    </button>
  );
};

export default Button;
