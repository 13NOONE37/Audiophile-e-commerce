import React, { FC, useContext } from 'react';
import styles from './cartModal.module.css';
import { CartProductType } from '@/actions/getCartProducts';
import CartContext, {
  CartItemType,
} from '@/providers/cartProvider/cartProvider';
import { NumberSelect } from '@/components/buttons/NumberSelect';
import formatPrice from '@/utils/formatPrice';

interface Props {
  productsDatabase: CartProductType[];
}
const CartItemsDisplay: FC<Props> = ({ productsDatabase }) => {
  const { items, setItems } = useContext(CartContext);

  const handleDecrease = (item: CartItemType) => {
    if (item.quantity - 1 < 1) {
      //Remove from cart
      setItems((prev) => prev.filter((newItem) => newItem.slug !== item.slug));
    } else {
      //Update cart
      setItems((prev) =>
        prev.map((newItem) => {
          if (newItem.slug === item.slug) {
            return {
              ...newItem,
              quantity: item.quantity - 1,
            };
          }
          return newItem;
        }),
      );
    }
  };
  const handleIncrease = (item: CartItemType) => {
    setItems((prev) =>
      prev.map((newItem) => {
        if (newItem.slug === item.slug) {
          return {
            ...newItem,
            quantity: item.quantity + 1,
          };
        }
        return newItem;
      }),
    );
  };

  return (
    <ul className={styles.items}>
      {items.map((item) => {
        const properties = productsDatabase.find(
          (item2) => item2.slug === item.slug,
        );

        return (
          <li className={styles.item} key={`cart_item__${item.slug}`}>
            <img src={properties?.cart_image} alt={properties?.name} />
            <span className={styles['item--name']}>{properties?.name}</span>
            <span className={styles['item--price']}>
              {properties?.price ? formatPrice(properties.price) : '-'}
            </span>
            <NumberSelect
              value={item.quantity}
              handleDecrease={() => handleDecrease(item)}
              handleIncrease={() => handleIncrease(item)}
              additionalClassnames={[styles.numberSelect]}
            />
          </li>
        );
      })}
    </ul>
  );
};

export default CartItemsDisplay;
