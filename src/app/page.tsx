import Categories from '@/components/categories/categories';
import Outro from '@/components/outro/outro';
import { FC } from 'react';

import React from 'react';

const page: FC = () => {
  return (
    <>
      Home
      <Categories />
      <Outro />
    </>
  );
};

export default page;
