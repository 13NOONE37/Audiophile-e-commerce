import React, { FC } from 'react';
import styles from './productDisplay.module.css';
import GoBack from './goBack';
import Button from '@/components/buttons/button';
import CartManagment from './CartManagment';
import formatPrice from '@/utils/formatPrice';

interface ProductDisplayProps {
  name: string;
  slug: string;
  description: string;
  price: number;
  alt_text: string;
  mobile_image: string;
  tablet_image: string;
  desktop_image: string;
}
const ProductDisplay: FC<ProductDisplayProps> = ({
  name,
  slug,
  description,
  price,
  alt_text,
  mobile_image,
  tablet_image,
  desktop_image,
}) => {
  const formattedPrice = formatPrice(price);
  //TODO:SEO for all pages head comoponent, niżej seo dla produktów
  //TODO: https://chat.openai.com/share/8710c7d8-9bf5-4dbe-930a-ac2dc099e100
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <GoBack />
        <picture className={styles.imageContainer}>
          <source media="(min-width:1190px)" srcSet={desktop_image} />
          <source media="(min-width:710px)" srcSet={tablet_image} />
          <img srcSet={mobile_image} className={styles.image} alt={alt_text} />
        </picture>
        <div className={styles.textContent}>
          {/* <div className={styles.newProduct}>New product</div> } */}
          <h2 className={styles.name}>{name}</h2>
          <p className={styles.description}>{description}</p>
          <div className={styles.price}>{formattedPrice}</div>
          <CartManagment slug={slug} />
        </div>
      </div>
    </div>
  );
};

export default ProductDisplay;
