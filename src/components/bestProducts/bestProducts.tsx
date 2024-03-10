import React, { FC } from 'react';
import styles from './bestProducts.module.css';
import { getImageProps } from 'next/image';

const BestProducts: FC = () => {
  return (
    <section className={styles.products}>
      <div className={styles.content}>
        <PrimaryContent />
        <SecondaryContent />
        <TertiaryContent />
      </div>
    </section>
  );
};

export default BestProducts;

import PrimaryDesktop from '../../../public/images/home/desktop/image-speaker-zx9.png';
import PrimaryTablet from '../../../public/images/home/tablet/image-speaker-zx9.png';
import PrimaryMobile from '../../../public/images/home/mobile/image-speaker-zx9.png';
const PrimaryContent: FC = () => {
  const altText = 'ZX9 speaker';
  const {
    props: { srcSet: desktop },
  } = getImageProps({
    src: PrimaryDesktop,
    alt: altText,
  });
  const {
    props: { srcSet: tablet },
  } = getImageProps({
    src: PrimaryTablet,
    alt: altText,
  });
  const {
    props: { srcSet: mobile },
  } = getImageProps({
    src: PrimaryMobile,
    alt: altText,
  });

  return (
    <div className={styles.primary}>
      <picture>
        <source media="(min-width:1190px)" srcSet={desktop} />
        <source media="(min-width:710px)" srcSet={tablet} />
        <img srcSet={mobile} alt={altText} />
      </picture>
      <div className={styles.primaryContent}>
        <h2>ZX9 SPEAKER</h2>
        <p>
          Upgrade to premium speakers that are phenomenally built to deliver
          truly remarkable sound.
        </p>

        <LinkButton
          style={'primary'}
          href={`/product/asdf`}
          additionalClassnames={[styles.primaryButton]}
        >
          See product
        </LinkButton>
      </div>
    </div>
  );
};

import SecondaryDesktop from '../../../public/images/home/desktop/image-speaker-zx7.jpg';
import SecondaryTablet from '../../../public/images/home/tablet/image-speaker-zx7.jpg';
import SecondaryMobile from '../../../public/images/home/mobile/image-speaker-zx7.jpg';
const SecondaryContent: FC = () => {
  const altText = 'ZX7 speaker';
  const {
    props: { srcSet: desktop },
  } = getImageProps({
    src: SecondaryDesktop,
    alt: altText,
  });
  const {
    props: { srcSet: tablet },
  } = getImageProps({
    src: SecondaryTablet,
    alt: altText,
  });
  const {
    props: { srcSet: mobile },
  } = getImageProps({
    src: SecondaryMobile,
    alt: altText,
  });
  return (
    <div className={styles.secondaryContent}>
      <picture>
        <source media="(min-width:1190px)" srcSet={desktop} />
        <source media="(min-width:710px)" srcSet={tablet} />
        <img srcSet={mobile} alt={altText} />
      </picture>
      <h3 className={styles.secondaryHeading}>ZX7 SPEAKER</h3>
      <LinkButton
        style={'secondary'}
        href={`/product/asdf`}
        additionalClassnames={[styles.secondaryButton]}
      >
        See product
      </LinkButton>
    </div>
  );
};

import TertiaryDesktop from '../../../public/images/home/desktop/image-earphones-yx1.jpg';
import TertiaryTablet from '../../../public/images/home/tablet/image-earphones-yx1.jpg';
import TertiaryMobile from '../../../public/images/home/mobile/image-earphones-yx1.jpg';
import LinkButton from '../buttons/linkButton';
const TertiaryContent: FC = () => {
  const altText = 'YX1 earphones';
  const {
    props: { srcSet: desktop },
  } = getImageProps({
    src: TertiaryDesktop,
    alt: altText,
  });
  const {
    props: { srcSet: tablet },
  } = getImageProps({
    src: TertiaryTablet,
    alt: altText,
  });
  const {
    props: { srcSet: mobile },
  } = getImageProps({
    src: TertiaryMobile,
    alt: altText,
  });
  return (
    <>
      <div className={styles.tertiaryImage}>
        <picture>
          <source media="(min-width:1190px)" srcSet={desktop} />
          <source media="(min-width:710px)" srcSet={tablet} />
          <img srcSet={mobile} alt={altText} />
        </picture>
      </div>
      <div className={styles.tertiaryContent}>
        <h4 className={styles.secondaryHeading}>YX1 EARPHONES</h4>
        <LinkButton
          style={'secondary'}
          href={`/product/asdf`}
          additionalClassnames={[styles.secondaryButton]}
        >
          See product
        </LinkButton>
      </div>
    </>
  );
};