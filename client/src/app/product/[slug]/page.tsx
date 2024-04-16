import React from 'react';
import { FC } from 'react';
import qs from 'qs';
import styles from './page.module.css';

import { ApiProductProduct } from '@/strapiTypes/contentTypes';
import ProductDisplay from '@/components/product/productDisplay/productDisplay';
import ProductDescription from '@/components/product/productDescription/productDescription';
import ProductImages, {
  ImageType,
} from '@/components/product/productImages/productImages';
import ProductRecomendations from '@/components/product/productRecomendations/productRecomendations';
import Head from 'next/head';
import { Metadata } from 'next';
const getProduct = async (slug: string) => {
  const reqOptions: RequestInit = {
    headers: {
      Authorization: `Bearer ${process.env.API_TOKEN}`,
    },
  };
  const query = qs.stringify(
    {
      filters: {
        slug: {
          $eq: slug,
        },
      },
      fields: [
        'name',
        'price',
        'slug',
        'short_description',
        'features',
        'specification',
      ],

      populate: {
        recomendations: {
          fields: 'slug',
        },
        product_image: {
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
        gallery_images: {
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
  return products.data[0];
};

interface pageProps {
  params: {
    slug: string;
  };
}
const page: FC<pageProps> = async ({ params }) => {
  const data = (await getProduct(params.slug)) as ApiProductProduct;

  return (
    <section className={styles.container}>
      <Head>
        <title>abc</title>
        <meta property="og:title" content="My page title" key="title" />
      </Head>
      <ProductDisplay
        slug={data.attributes.slug}
        name={data.attributes.name}
        description={data.attributes.short_description}
        price={data.attributes.price}
        alt_text={data.attributes.product_image.alt_text}
        mobile_image={`${process.env.API_URL}${data.attributes.product_image.mobile.data.attributes.url}`}
        tablet_image={`${process.env.API_URL}${data.attributes.product_image.tablet.data.attributes.url}`}
        desktop_image={`${process.env.API_URL}${data.attributes.product_image.desktop.data.attributes.url}`}
      />
      <ProductDescription
        features={data.attributes.features}
        specification={data.attributes.specification}
      />
      <ProductImages
        images={data.attributes.gallery_images.map(
          ({ alt_text, mobile, tablet, desktop }: any) => {
            return {
              mobile: `${process.env.API_URL}${mobile.data.attributes.url}`,
              tablet: `${process.env.API_URL}${tablet.data.attributes.url}`,
              desktop: `${process.env.API_URL}${desktop.data.attributes.url}`,
              alt: alt_text,
            } as ImageType;
          },
        )}
      />
      <ProductRecomendations recomendations={data.attributes.recomendations} />
    </section>
  );
};

export default page;

export async function generateMetadata({
  params,
}: pageProps): Promise<Metadata> {
  const data = (await getProduct(params.slug)) as ApiProductProduct;
  return {
    title: `${data.attributes.name}`,
    description: `${data.attributes.short_description}`,
    openGraph: {
      type: 'website',
      siteName: 'Audiophile store',
      title: `${data.attributes.name}`,
      description: `${data.attributes.short_description}`,
      images: [
        {
          url: `${process.env.API_URL}${data.attributes.cart_image}`,
          width: 150,
          height: 150,
          alt: data.attributes.name,
        },
        {
          url: `${process.env.API_URL}${data.attributes.product_image.mobile.data.attributes.url}`,
          width: 654,
          height: 654,
          alt: data.attributes.product_image.alt_text,
        },
      ],
    },
  };
}
