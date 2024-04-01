'use client';
import React, { FC, useContext, useEffect, useRef, useState } from 'react';
import cx from 'classnames';
import styles from './header.module.css';
import Link from 'next/link';

import Logo from '../../../public/images/shared/desktop/logo.svg';
import Image from 'next/image';
import IconHamburger from '@/icons/IconHamburger';
import IconCart from '@/icons/IconCart';
import Categories from '../categories/categories';
import CartContext from '@/providers/cartProvider/cartProvider';
import useDetectOutsideClick from '@/hooks/useDetectOutsideClick';
import CartModal from './cartModal/cartModal';
import FocusTrap from 'focus-trap-react';

interface HeaderProps {
  className?: string[];
}
const Header: FC<HeaderProps> = ({ className = [] }) => {
  const cart = useContext(CartContext);

  const [showMenu, setShowMenu] = useState(false);
  const [showCart, setShowCart] = useState(false);

  const menuRef = useRef<HTMLDivElement>(null);
  const cartRef = useRef<HTMLDivElement>(null);

  const toggleMenu = (force: boolean) => {
    setShowMenu(force);
  };
  const toggleCart = (force: boolean) => {
    setShowCart(force);
  };

  useDetectOutsideClick(menuRef, toggleMenu);
  useDetectOutsideClick(cartRef, toggleCart);

  return (
    <>
      <header className={cx(styles.header, ...className)}>
        <div className={styles.content}>
          <button
            className={styles.hamburger}
            aria-label={'Open navigation'}
            onClick={(e) => {
              e.stopPropagation();
              toggleCart(false);
              toggleMenu(!showMenu);
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
                <Link href={'/headphones'}>Headphones</Link>
              </li>
              <li>
                <Link href={'/speakers'}>Speakers</Link>
              </li>
              <li>
                <Link href={'/earphones'}>Earphones</Link>
              </li>
            </ul>
          </nav>

          <div className={styles.cartContainer}>
            {cart.items.length > 0 ? (
              <span className={styles.cartCount}>{cart.items.length}</span>
            ) : (
              ''
            )}
            <button
              className={cx(styles.cart, {
                [styles.cart__disabled]: showMenu,
              })}
              aria-label={'Open cart'}
              onClick={(e) => {
                e.stopPropagation();
                toggleCart(!showCart);
              }}
            >
              <IconCart />
            </button>
          </div>
        </div>
      </header>
      <FocusTrap
        active={showCart}
        focusTrapOptions={{
          allowOutsideClick: true,
        }}
      >
        <CartModal showCart={showCart} ref={cartRef} />
      </FocusTrap>

      <FocusTrap
        active={showMenu}
        focusTrapOptions={{
          allowOutsideClick: true,
        }}
      >
        <div
          className={cx(styles.mobileNavigationContainer, {
            [styles['mobileNavigationContainer__show']]: showMenu,
          })}
        >
          <nav
            className={styles.mobileNavigation}
            aria-hidden={showMenu}
            ref={menuRef}
          >
            <Categories className={styles.categories} />
          </nav>
        </div>
      </FocusTrap>
    </>
  );
};

export default Header;
