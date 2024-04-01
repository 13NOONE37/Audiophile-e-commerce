import React from 'react';
import { FC } from 'react';
import styles from '../products.module.css';

import HeaderIndicator from '@/components/headerIndicator/headerIndicator';
import { ApiProductProduct } from '@/strapiTypes/contentTypes';
import ProductPreview from '@/components/productPreview/productPreview';
import getPreviewProducts from '@/actions/getProducts';

const page: FC = async () => {
  const data = (await getPreviewProducts('headphones')) as ApiProductProduct[];

  return (
    <>
      <HeaderIndicator>Headphones</HeaderIndicator>
      <section className={styles.products}>
        <div className={styles.content}>
          {data.map((item, index) => {
            return (
              <ProductPreview
                name={item.attributes.name}
                description={item.attributes.short_description}
                slug={item.attributes.slug}
                alt_text={item.attributes.preview_image.alt_text}
                mobile_image={`${process.env.API_URL}${item.attributes.preview_image.mobile.data.attributes.url}`}
                tablet_image={`${process.env.API_URL}${item.attributes.preview_image.tablet.data.attributes.url}`}
                desktop_image={`${process.env.API_URL}${item.attributes.preview_image.desktop.data.attributes.url}`}
                isNew={index === 0}
                isReversed={index % 2 != 0}
              />
            );
          })}
        </div>
      </section>
    </>
  );
};

export default page;
