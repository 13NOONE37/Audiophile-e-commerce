import BestProducts from '@/components/bestProducts/bestProducts';
import Categories from '@/components/categories/categories';
import HomeHero from '@/components/homeHero/homeHero';
import Outro from '@/components/outro/outro';
import { FC } from 'react';

import React from 'react';
import styles from './page.module.css';

const page: FC = () => {
  return (
    <>
      <HomeHero />
      <Categories className={styles.categories} />
      <BestProducts className={styles.bestProducts} />
      <Outro className={styles.outro} />
    </>
  );
};

export default page;
