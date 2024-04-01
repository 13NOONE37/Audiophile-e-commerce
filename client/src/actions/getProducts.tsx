import qs from 'qs';

const getPreviewProducts = async (
  category: 'headphones' | 'speakers' | 'earphones',
) => {
  const reqOptions: RequestInit = {
    headers: {
      Authorization: `Bearer ${process.env.API_TOKEN}`,
    },
  };
  const query = qs.stringify(
    {
      filters: {
        category: {
          $eq: category,
        },
      },
      sort: ['createdAt:desc'],
      fields: ['name', 'price', 'slug', 'short_description'],
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
export default getPreviewProducts;
