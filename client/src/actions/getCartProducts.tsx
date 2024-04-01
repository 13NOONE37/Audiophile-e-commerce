'use server';
import qs from 'qs';

export interface CartProductType {
  slug: string;
  name: string;
  price: number;
  cart_image: string;
}

const getCartProducts = async (items: { slug: string; quantity: number }[]) => {
  const reqOptions: RequestInit = {
    headers: {
      Authorization: `Bearer ${process.env.API_TOKEN}`,
    },
  };
  const query = qs.stringify(
    {
      filters: {
        slug: {
          $in: items.map(({ slug }) => slug),
        },
      },
      fields: ['short_name', 'slug', 'price'],

      populate: {
        cart_image: {
          fields: 'url',
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
  const readyProducts = products.data.map(({ attributes }: any) => {
    return {
      slug: attributes.slug,
      name: attributes.short_name,
      price: attributes.price,
      cart_image: `${process.env.API_URL}${attributes.cart_image.data.attributes.url}`,
    };
  });

  return readyProducts;
};

export default getCartProducts;
