import Categories from '@/components/categories/categories';
import Header from '@/components/header/header';
import Outro from '@/components/outro/outro';

import styles from './layout.module.css';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      {children}
      <Categories className={styles.categories} />
      <Outro className={styles.outro} />
    </>
  );
}
