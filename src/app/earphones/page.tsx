import { FC } from 'react';
import styles from './page.module.css';

import React from 'react';
import Categories from '@/components/categories/categories';
import Outro from '@/components/outro/outro';

const page: FC = () => {
  return (
    <>
      earphones
      <Categories />
      <Outro />
    </>
  );
};

export default page;
