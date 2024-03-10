import BestProducts from '@/components/bestProducts/bestProducts';
import Categories from '@/components/categories/categories';
import Outro from '@/components/outro/outro';
import { FC } from 'react';

import React from 'react';

const page: FC = () => {
  return (
    <>
      Home
      <Categories />
      <BestProducts />
      <Outro />
    </>
  );
};

export default page;
