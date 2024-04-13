'use client';
import React, { ButtonHTMLAttributes, FC, MouseEventHandler } from 'react';
import cx from 'classnames';
import styles from './button.module.css';

export interface ButtonProps {
  style: 'primary' | 'secondary';
  onClick: MouseEventHandler<HTMLButtonElement>;
  children: React.ReactNode;
  additionalClassnames?: String[];
  type?: 'submit' | 'button';
  disabled?: boolean;
}

const Button: FC<ButtonProps> = ({
  style,
  onClick,
  additionalClassnames = [],
  children,
  type = 'button',
  disabled = false,
}) => {
  return (
    <button
      onClick={onClick}
      className={cx(styles.button, styles[style], ...additionalClassnames)}
      type={type}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
