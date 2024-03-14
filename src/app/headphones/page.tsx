import { FC } from 'react';
import styles from './page.module.css';

import React from 'react';
import Outro from '@/components/outro/outro';
import Categories from '@/components/categories/categories';
import HeaderIndicator from '@/components/headerIndicator/headerIndicator';
import Header from '@/components/header/header';

const page: FC = () => {
  return (
    <>
      <Header />
      <HeaderIndicator>Headphones</HeaderIndicator>
      <Categories />
      <Outro />
    </>
  );
};

export default page;
