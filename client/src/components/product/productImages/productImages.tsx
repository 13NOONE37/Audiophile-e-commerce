import React, { FC } from 'react';
import cx from 'classnames';
import styles from './productImages.module.css';

export interface ImageType {
  mobile: string;
  tablet: string;
  desktop: string;
  alt: string;
}
interface ProductImagesProps {
  images: ImageType[];
}

const ProductImages: FC<ProductImagesProps> = ({ images }) => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={cx(styles.imageBox, styles.topLeftImage)}>
          <picture>
            <source media="(min-width:1190px)" srcSet={images[0].desktop} />
            <source media="(min-width:710px)" srcSet={images[0].tablet} />
            <img src={images[0].mobile} alt={images[0].alt} />
          </picture>
        </div>
        <div className={cx(styles.imageBox, styles.bottomLeftImage)}>
          <picture>
            <source media="(min-width:1190px)" srcSet={images[1].desktop} />
            <source media="(min-width:710px)" srcSet={images[1].tablet} />
            <img src={images[1].mobile} alt={images[1].alt} />
          </picture>
        </div>
        <div className={cx(styles.imageBox, styles.rightImage)}>
          <picture>
            <source media="(min-width:1190px)" srcSet={images[2].desktop} />
            <source media="(min-width:710px)" srcSet={images[2].tablet} />
            <img src={images[2].mobile} alt={images[2].alt} />
          </picture>
        </div>
      </div>
    </div>
  );
};

export default ProductImages;
