import React, { FC } from 'react';
import cx from 'classnames';
import styles from './productPreview.module.css';
import Link from 'next/link';
import LinkButton from '../buttons/linkButton';

interface ProductPreviewProps {
  name: string;
  description: string;
  slug: string;
  alt_text: string;
  mobile_image: string;
  tablet_image: string;
  desktop_image: string;
  isNew: boolean;
  isReversed: boolean;
}
const ProductPreview: FC<ProductPreviewProps> = ({
  name,
  description,
  slug,
  alt_text,
  mobile_image,
  tablet_image,
  desktop_image,
  isNew,
  isReversed,
}) => {
  return (
    <div
      className={cx(styles.container, {
        [styles.reversed]: isReversed,
      })}
    >
      <picture className={styles.imageContainer}>
        <source media="(min-width:1190px)" srcSet={desktop_image} />
        <source media="(min-width:550px)" srcSet={tablet_image} />
        <img srcSet={mobile_image} className={styles.image} alt={alt_text} />
      </picture>
      <div className={styles.content}>
        {isNew ? <span className={styles.newProduct}>New product</span> : ''}
        <h2 className={styles.name}>{name}</h2>
        <p className={styles.description}>{description}</p>
        <LinkButton
          href={`/product/${slug}`}
          style={'primary'}
          additionalClassnames={[styles.cta]}
        >
          See product
        </LinkButton>
      </div>
    </div>
  );
};

export default ProductPreview;
