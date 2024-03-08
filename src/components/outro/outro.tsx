import React, { FC } from 'react';
import styles from './outro.module.css';
import ImageMobile from '../../../public/images/shared/mobile/image-best-gear.jpg';
import ImageTablet from '../../../public/images/shared/tablet/image-best-gear.jpg';
import ImageDesktop from '../../../public/images/shared/desktop/image-best-gear.jpg';
import { getImageProps } from 'next/image';

const Outro: FC = () => {
  const altText =
    'Man with headphones on his head propably listening to music.';
  const {
    props: { srcSet: desktop },
  } = getImageProps({
    src: ImageDesktop,
    alt: altText,
    width: 544,
    height: 588,
  });
  const {
    props: { srcSet: tablet },
  } = getImageProps({
    src: ImageTablet,
    alt: altText,
    width: 1378,
    height: 600,
  });
  const {
    props: { srcSet: mobile },
  } = getImageProps({
    src: ImageMobile,
    alt: altText,
    width: 654,
    height: 600,
  });

  return (
    <section className={styles.outro}>
      <div className={styles.content}>
        <picture className={styles.imageContainer}>
          <source media="(min-width:1190px)" srcSet={desktop} />
          <source media="(min-width:550px)" srcSet={tablet} />
          <img srcSet={mobile} className={styles.image} alt={altText} />
        </picture>
        <div className={styles.textBlock}>
          <h2 className={styles.heading}>
            Bringing you the <span>best</span> audio gear
          </h2>
          <p className={styles.text}>
            Located at the heart of New York City, Audiophile is the premier
            store for high end headphones, earphones, speakers, and audio
            accessories. We have a large showroom and luxury demonstration rooms
            available for you to browse and experience a wide range of our
            products. Stop by our store to meet some of the fantastic people who
            make Audiophile the best place to buy your portable audio equipment.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Outro;
