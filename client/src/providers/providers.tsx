'use client';

import React, { FC, useEffect, useLayoutEffect, useState } from 'react';
import CartContext, { CartItemType } from './cartProvider/cartProvider';
import { parse, stringify } from 'qs';

interface ProvidersProps {
  children: React.ReactNode;
}
export const STORAGE_CART_NAME = 'storage_cart_content';

const Providers: FC<ProvidersProps> = ({ children }) => {
  const [items, setItems] = useState<CartItemType[]>([]);

  useEffect(() => {
    localStorage.setItem(STORAGE_CART_NAME, stringify(items));
  }, [items]);

  useLayoutEffect(() => {
    const cartContent = localStorage.getItem(STORAGE_CART_NAME);
    if (!cartContent) return;

    const newContent = Object.values(parse(cartContent));
    if (newContent.length < 1) return;

    setItems(
      newContent.map((item: any) => ({
        slug: item.slug,
        quantity: parseInt(item.quantity),
      })),
    );
  }, []);

  return (
    <CartContext.Provider value={{ items, setItems }}>
      {children}
    </CartContext.Provider>
  );
};
export default Providers;
