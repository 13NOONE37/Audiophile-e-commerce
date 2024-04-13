import { FC } from 'react';

import React from 'react';
import Header from '@/components/header/header';
import Checkout from '@/components/checkout/checkout';

const page: FC = () => {
  return (
    <>
      <Header />
      <Checkout />
    </>
  );
};

export default page;
