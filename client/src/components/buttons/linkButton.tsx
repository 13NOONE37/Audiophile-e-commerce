import React, { FC } from 'react';
import cx from 'classnames';
import Link from 'next/link';
import styles from './button.module.css';
import { ButtonProps } from './button';

interface LinkProps extends Omit<ButtonProps, 'onClick'> {
  href: string;
  scroll?: boolean;
}
const LinkButton: FC<LinkProps> = ({
  style,
  href,
  additionalClassnames = [],
  scroll = true,
  children,
}) => {
  return (
    <Link
      href={href}
      className={cx(
        styles.button,
        styles.link,
        styles[style],
        ...additionalClassnames,
      )}
      scroll={scroll}
    >
      {children}
    </Link>
  );
};

export default LinkButton;
