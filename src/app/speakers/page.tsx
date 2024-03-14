import { FC } from 'react';
import styles from './page.module.css';

import React from 'react';
import Outro from '@/components/outro/outro';
import Categories from '@/components/categories/categories';

const page: FC = () => {
  return (
    <>
      speakers
      <Categories />
      <Outro />
    </>
  );
};

export default page;
