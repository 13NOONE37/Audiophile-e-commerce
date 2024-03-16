'use client';
import React, { FC, useEffect, useRef, useState } from 'react';
import cx from 'classnames';
import styles from './header.module.css';
import Link from 'next/link';

import Logo from '../../../public/images/shared/desktop/logo.svg';
import Image from 'next/image';
import IconHamburger from '@/icons/IconHamburger';
import IconCart from '@/icons/IconCart';
import Categories from '../categories/categories';

interface HeaderProps {
  className?: string[];
}
const Header: FC<HeaderProps> = ({ className = [] }) => {
  const [showMenu, setShowMenu] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const toggleNavigation = (force: boolean) => {
    setShowMenu(force);
    document.body.classList.toggle(styles['body__no-scroll'], force);
  };
  const handleMenu = (e: MouseEvent) => {
    if (
      !showMenu ||
      !containerRef.current ||
      containerRef.current?.contains(e.target as Node)
    ) {
      return;
    }
    toggleNavigation(false);
  };
  useEffect(() => {
    if (!showMenu) {
      document.body.classList.remove(styles['body__no-scroll']);
    }
    document.addEventListener('click', handleMenu);

    return () => {
      document.removeEventListener('click', handleMenu);
    };
  }, [showMenu]);

  return (
    <>
      <header className={cx(styles.header, ...className)}>
        <div className={styles.content}>
          <button
            className={styles.hamburger}
            aria-label={'Open navigation'}
            onClick={(e) => {
              e.stopPropagation();
              toggleNavigation(!showMenu);
            }}
          >
            <IconHamburger />
          </button>
          <Link href={'/'} className={styles.logo} aria-label="Go to home page">
            <Image src={Logo} alt={'Audiophile logo'} />
          </Link>

          <nav className={styles.navigation}>
            <ul>
              <li>
                <Link href={'/'}>Home</Link>
              </li>
              <li>
                <Link href={'/headphones'}>Headphones</Link>{' '}
              </li>
              <li>
                <Link href={'/speakers'}>Speakers</Link>{' '}
              </li>
              <li>
                <Link href={'/earphones'}>Earphones</Link>{' '}
              </li>
            </ul>
          </nav>

          <button className={styles.cart} aria-label={'Open cart'}>
            <IconCart />
          </button>
        </div>
      </header>
      <div
        className={cx(styles.mobileNavigationContainer, {
          [styles['mobileNavigationContainer__show']]: showMenu,
        })}
      >
        <nav
          className={styles.mobileNavigation}
          aria-hidden={showMenu}
          ref={containerRef}
        >
          <Categories />
        </nav>
      </div>
    </>
  );
};

export default Header;
