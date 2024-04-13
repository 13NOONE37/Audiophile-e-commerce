'use client';
import React, {
  ReactNode,
  forwardRef,
  useContext,
  useEffect,
  useState,
} from 'react';
import cx from 'classnames';
import styles from './cartModal.module.css';
import LinkButton from '@/components/buttons/linkButton';
import CartContext from '@/providers/cartProvider/cartProvider';

import CartItemsDisplay from './cartItemsDisplay';
import getCartProducts, { CartProductType } from '@/actions/getCartProducts';
import formatPrice from '@/utils/formatPrice';

interface Props {
  children?: ReactNode;
  showCart: boolean;
}

const CartModal = forwardRef<HTMLDivElement, Props>((props, ref) => {
  const { items, setItems } = useContext(CartContext);
  const [productsDatabase, setProductsDatabase] = useState<
    CartProductType[] | []
  >([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    if (items.length < 1) {
      setTotalPrice(0);
      return;
    }

    const getData = async () => {
      const data = (await getCartProducts(items)) as CartProductType[];
      setProductsDatabase(data);
      setTotalPrice(
        items.reduce((prev, { slug, quantity }) => {
          const price = data.find((item) => item.slug === slug)?.price || 0;
          return prev + quantity * price;
        }, 0),
      );
    };

    getData();
  }, [items]);

  const handleRemoveAll = () => {
    setItems([]);
    setTotalPrice(0);
  };

  return (
    <div
      className={cx(styles.cartModalContainer, {
        [styles['cartModalContainer__show']]: props.showCart,
      })}
    >
      <div className={styles.cartModal} aria-hidden={props.showCart} ref={ref}>
        <div className={styles.cartContent}>
          <div className={styles.heading}>
            <span className={styles.quantity}>Cart({items.length})</span>
            <button className={styles.remove} onClick={handleRemoveAll}>
              Remove all
            </button>
          </div>
          <CartItemsDisplay productsDatabase={productsDatabase} />

          <div className={styles.summary}>
            <span className={styles.name}>Total</span>
            <span className={styles.total}>{formatPrice(totalPrice)}</span>
          </div>
          <LinkButton
            style="primary"
            href="/checkout"
            additionalClassnames={[
              styles.cta,
              cx({ [styles['cta__disabled']]: items.length < 1 }),
            ]}
          >
            Checkout
          </LinkButton>
        </div>
      </div>
    </div>
  );
});

export default CartModal;
