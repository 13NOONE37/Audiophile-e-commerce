import React, { FC, useContext } from 'react';
import cx from 'classnames';
import styles from './summary.module.css';
import { CartProductType } from '@/actions/getCartProducts';
import Button from '@/components/buttons/button';
import formatPrice from '@/utils/formatPrice';
import CartContext from '@/providers/cartProvider/cartProvider';
interface Props {
  productsDatabase: CartProductType[] | [];
  totalPrice: number;
  vatPrice: number;
  shippingPrice: number;
  grandTotalPrice: number;
}
const Summary: FC<Props> = ({
  productsDatabase,
  totalPrice,
  vatPrice,
  shippingPrice,
  grandTotalPrice,
}) => {
  const { items } = useContext(CartContext);

  return (
    <div className={styles.summary}>
      <h3 className={styles.heading}>Summary</h3>
      {items.length > 0 ? (
        <ul className={styles.items}>
          {items.map((item) => {
            const properties = productsDatabase.find(
              (item2) => item2.slug === item.slug,
            );
            return (
              <li className={styles.item} key={`checkout_summary_${item.slug}`}>
                <img
                  className={styles['item--image']}
                  src={properties?.cart_image}
                  alt={properties?.name}
                />
                <span className={styles['item--name']}>{properties?.name}</span>
                <span className={styles['item--price']}>
                  {properties?.price ? formatPrice(properties.price) : '-'}
                </span>
                <span className={styles['item--quantity']}>
                  x{item.quantity}
                </span>
              </li>
            );
          })}
        </ul>
      ) : (
        <span className={styles.empty}>Your cart is empty</span>
      )}

      <div className={cx(styles.priceBox, styles['priceBox--total'])}>
        <span className={styles['priceBox--name']}>Total</span>
        <span className={styles['priceBox--value']}>
          {formatPrice(totalPrice)}
        </span>
      </div>

      <div className={cx(styles.priceBox, styles['priceBox--shipping'])}>
        <span className={styles['priceBox--name']}>Shipping</span>
        <span className={styles['priceBox--value']}>
          {formatPrice(shippingPrice)}
        </span>
      </div>
      <div className={cx(styles.priceBox, styles['priceBox--vat'])}>
        <span className={styles['priceBox--name']}>VAT (included)</span>
        <span className={styles['priceBox--value']}>
          {formatPrice(vatPrice)}
        </span>
      </div>
      <div className={cx(styles.priceBox, styles['priceBox--grandTotal'])}>
        <span className={styles['priceBox--name']}>Grand total</span>
        <span className={styles['priceBox--value']}>
          {formatPrice(grandTotalPrice)}
        </span>
      </div>

      <Button
        style={'primary'}
        onClick={() => {}}
        additionalClassnames={[styles.cta]}
        type={'submit'}
        disabled={totalPrice <= 0}
      >
        Continue & pay
      </Button>
    </div>
  );
};

export default Summary;
