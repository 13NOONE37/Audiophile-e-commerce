'use client';
import React, { FC, useContext, useState } from 'react';
import styles from './productDisplay.module.css';
import Button from '@/components/buttons/button';
import CartContext from '@/providers/cartProvider/cartProvider';
import NumberSelectInput from '@/components/buttons/NumberSelect';

const CartManagment: FC<{ slug: string }> = ({ slug }) => {
  const [count, setCount] = useState<number | string>(1);
  const handleCount = (value: string) => {
    const newValue = parseInt(value);
    if (newValue < 1) {
      setCount(1);
      return;
    }

    setCount(newValue);
  };
  const handleReset = () => {
    if (count) return;
    setCount(1);
  };

  const { items, setItems } = useContext(CartContext);
  const addToCart = (slug: string, quantity: number) => {
    if (items.find((item) => item.slug === slug)) {
      //Item already in cart
      setItems((prevItems) =>
        prevItems.map((item) => {
          if (item.slug === slug) {
            return {
              ...item,
              quantity: item.quantity + quantity,
            };
          }

          return item;
        }),
      );
      return;
    }

    setItems((prevItems) => [
      ...prevItems,
      {
        slug: slug,
        quantity: quantity,
      },
    ]);
  };
  return (
    <div className={styles.cartManagment}>
      <NumberSelectInput
        value={count}
        setValue={handleCount}
        handleReset={handleReset}
      />

      <Button
        style={'primary'}
        onClick={() => {
          //Only if user typed a number in a field
          if (typeof count === 'number') {
            addToCart(slug, count);
          }
        }}
        additionalClassnames={[styles.addToCart]}
      >
        Add to cart
      </Button>
    </div>
  );
};

export default CartManagment;
