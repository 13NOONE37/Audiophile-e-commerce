import React, { FC } from 'react';
import styles from './productDescription.module.css';
import { BlocksContent, BlocksRenderer } from '@strapi/blocks-react-renderer';

interface ProductDescriptionProps {
  features: BlocksContent;
  specification: BlocksContent;
}
const ProductDescription: FC<ProductDescriptionProps> = ({
  features,
  specification,
}) => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.features}>
          <h2>Features</h2>
          <BlocksRenderer content={features} />
        </div>
        <div className={styles.specification}>
          <h2>In the box</h2>
          <div>
            <BlocksRenderer content={specification} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDescription;
