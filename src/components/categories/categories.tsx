import React, { FC } from 'react';
import Image, { type StaticImageData } from 'next/image';
import Link from 'next/link';
import styles from './categories.module.css';
import HeadphonesImage from '../../../public/images/shared/desktop/image-category-thumbnail-headphones.png';
import SpeakersImage from '../../../public/images/shared/desktop/image-category-thumbnail-speakers.png';
import EarphonesImage from '../../../public/images/shared/desktop/image-category-thumbnail-earphones.png';
import IconArrowRight from '@/icons/IconArrowRight';

const Categories: FC = () => {
  return (
    <section className={styles.categories}>
      <div className={styles.content}>
        <Card
          src={HeadphonesImage}
          alt={'Headphones'}
          name="Headphones"
          href="/headphones"
        />
        <Card
          src={SpeakersImage}
          alt={'Speakers'}
          name="Speakers"
          href="/speakers"
        />
        <Card
          src={EarphonesImage}
          alt={'Earphones'}
          name="Earphones"
          href="/earphones"
        />
      </div>
    </section>
  );
};
export default Categories;

const Card: FC<{
  src: StaticImageData;
  alt: string;
  name: string;
  href: string;
}> = ({ src, alt, name, href }) => {
  return (
    <Link href={href} className={styles.card}>
      <div className={styles.imageContainer}>
        <Image src={src} alt={alt} className={styles.image} />
      </div>
      <span className={styles.name}>{name}</span>
      <span className={styles.link}>
        <span>Shop</span>
        <IconArrowRight />
      </span>
    </Link>
  );
};
