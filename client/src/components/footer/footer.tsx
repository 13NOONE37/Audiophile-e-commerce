import Link from 'next/link';
import React, { FC } from 'react';
import styles from './footer.module.css';

import Image from 'next/image';
import Logo from '../../../public/images/shared/desktop/logo.svg';
import IconFacebook from '@/icons/IconFacebook';
import IconTwitter from '@/icons/IconTwitter';
import IconInstagram from '@/icons/IconInstagram';

const Footer: FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.content}>
        <Image src={Logo} alt={'Audiophile logo'} />

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
        <p className={styles.information}>
          Audiophile is an all in one stop to fulfill your audio needs. We're a
          small team of music lovers and sound specialists who are devoted to
          helping you get the most out of personal audio. Come and visit our
          demo facility - we&apos;re open 7 days a week.
        </p>
        <span className={styles.copyright}>
          Copyright 2021. All Rights Reserved
        </span>
        <ul className={styles.socials}>
          <li>
            <a
              href={'https://www.facebook.com/'}
              target={'_blank'}
              rel="noopener noreferrer"
              aria-label="Facebook"
            >
              <IconFacebook />
            </a>
          </li>
          <li>
            <a
              href={'twitter.com'}
              target={'_blank'}
              rel="noopener noreferrer"
              aria-label="Twitter"
            >
              <IconTwitter />
            </a>
          </li>
          <li>
            <a
              href={'instagram.com'}
              target={'_blank'}
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <IconInstagram />
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
