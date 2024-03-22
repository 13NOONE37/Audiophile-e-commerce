import React from 'react';
import { FC } from 'react';
import styles from '../products.module.css';

import HeaderIndicator from '@/components/headerIndicator/headerIndicator';
import { ApiProductProduct } from '@/strapiTypes/contentTypes';
import ProductPreview from '@/components/productPreview/productPreview';
import getPreviewProducts from '@/utils/getProducts';

// const getHeadphonesData = async () => {
//   const reqOptions: RequestInit = {
//     headers: {
//       Authorization: `Bearer ${process.env.API_TOKEN}`,
//     },
//   };
//   const query = qs.stringify(
//     {
//       filters: {
//         category: {
//           $eq: 'headphones',
//         },
//       },
//       sort: ['createdAt:desc'],

//       populate: {
//         cart_image: {
//           fields: ['url'],
//         },
//         product_image: {
//           populate: {
//             mobile: {
//               fields: 'url',
//             },
//             tablet: {
//               fields: 'url',
//             },
//             desktop: {
//               fields: 'url',
//             },
//           },
//         },
//         preview_image: {
//           populate: {
//             mobile: {
//               fields: 'url',
//             },
//             tablet: {
//               fields: 'url',
//             },
//             desktop: {
//               fields: 'url',
//             },
//           },
//         },
//         gallery_images: {
//           populate: {
//             mobile: {
//               fields: 'url',
//             },
//             tablet: {
//               fields: 'url',
//             },
//             desktop: {
//               fields: 'url',
//             },
//           },
//         },
//       },

//     },
//     { encodeValuesOnly: true },
//   );

//   const res = await fetch(
//     `${process.env.API_URL}/api/products?${query}`,
//     reqOptions,
//   );
//   const products = await res.json();
//   console.log(products.data[0].attributes);
//   return products.data;
// };

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
