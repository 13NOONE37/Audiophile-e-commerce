import React, { FC } from 'react';
import qs from 'qs';
import styles from './productRecomendations.module.css';
import LinkButton from '@/components/buttons/linkButton';

type ProductImage = {
  data: {
    id: number;
    attributes: {
      url: string;
    };
  };
};
interface ProductType {
  id: number;
  attributes: {
    short_name: string;
    slug: string;
    preview_image: {
      id: number;
      alt_text: string;
      mobile: ProductImage;
      tablet: ProductImage;
      desktop: ProductImage;
    };
  };
}
const getRecomendations = async (recomendations: RecomendationType[]) => {
  const reqOptions: RequestInit = {
    headers: {
      Authorization: `Bearer ${process.env.API_TOKEN}`,
    },
  };
  const query = qs.stringify(
    {
      filters: {
        slug: {
          $in: recomendations.map(({ slug }) => slug),
        },
      },
      fields: ['short_name', 'slug'],

      populate: {
        preview_image: {
          populate: {
            mobile: {
              fields: 'url',
            },
            tablet: {
              fields: 'url',
            },
            desktop: {
              fields: 'url',
            },
          },
        },
      },
    },
    { encodeValuesOnly: true },
  );

  const res = await fetch(
    `${process.env.API_URL}/api/products?${query}`,
    reqOptions,
  );
  const products = await res.json();

  return products.data;
};

interface RecomendationType {
  id: number;
  slug: string;
}
const ProductRecomendations: FC<{
  recomendations: RecomendationType[];
}> = async ({ recomendations }) => {
  const data = (await getRecomendations(recomendations)) as ProductType[];
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h2>You may also like</h2>
        <div className={styles.products}>
          {data.map((item) => (
            <RecomendationContainer
              name={item.attributes.short_name}
              slug={item.attributes.slug}
              alt={item.attributes.preview_image.alt_text}
              mobile_image={`${process.env.API_URL}${item.attributes.preview_image.mobile.data.attributes.url}`}
              tablet_image={`${process.env.API_URL}${item.attributes.preview_image.tablet.data.attributes.url}`}
              desktop_image={`${process.env.API_URL}${item.attributes.preview_image.desktop.data.attributes.url}`}
              key={item.id}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

interface RecomendationContainerProps {
  name: string;
  slug: string;
  alt: string;
  mobile_image: string;
  tablet_image: string;
  desktop_image: string;
}
const RecomendationContainer: FC<RecomendationContainerProps> = ({
  name,
  slug,
  alt,
  mobile_image,
  tablet_image,
  desktop_image,
}) => {
  return (
    <div className={styles.product}>
      <picture>
        <source media="(min-width:1190px)" srcSet={mobile_image} />
        <source media="(min-width:710px)" srcSet={desktop_image} />
        <img src={tablet_image} alt={alt} />
      </picture>
      <h3>{name}</h3>
      <LinkButton
        href={`/product/${slug}`}
        style={'primary'}
        additionalClassnames={[styles.cta]}
      >
        See product
      </LinkButton>
    </div>
  );
};
export default ProductRecomendations;
