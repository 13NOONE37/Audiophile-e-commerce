'use client';
import React, { useContext, useEffect, useRef, useState } from 'react';
import cx from 'classnames';
import styles from './checkout.module.css';
import GoBack from '../product/productDisplay/goBack';
import Billing from './billing/billing';
import Summary from './summary/summary';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import CartContext, {
  CartItemType,
} from '@/providers/cartProvider/cartProvider';
import getCartProducts, { CartProductType } from '@/actions/getCartProducts';
import LinkButton from '../buttons/linkButton';
import formatPrice from '@/utils/formatPrice';
import IconOrderConfirmation from '@/icons/IconOrderConfirmation';
import FocusTrap from 'focus-trap-react';
import useDetectOutsideClick from '@/hooks/useDetectOutsideClick';
import Button from '../buttons/button';
import { useRouter } from 'next/navigation';

export interface CheckoutFormikValuesType {
  name: string;
  email: string;
  phone: string;
  address: string;
  zip: string;
  city: string;
  country: string;
  paymentOption: string;
  eMoneyNumber: string;
  eMoneyPin: string;
}

const Checkout = () => {
  const router = useRouter();

  const { items, setItems } = useContext(CartContext);
  const [productsDatabase, setProductsDatabase] = useState<
    CartProductType[] | []
  >([]);

  const thanksBoxRef = useRef<HTMLDivElement>(null);
  const [showThanks, setShowThanks] = useState(false);
  const [showMore, setShowMore] = useState(false);

  const VAT_RATE = 20; // in %
  const SHIPPING_COST = 50;
  const [totalPrice, setTotalPrice] = useState(0);
  const shippingPrice = totalPrice > 0 ? SHIPPING_COST : 0;
  const vatPrice = (totalPrice / 100) * VAT_RATE;
  const grandTotalPrice = totalPrice + shippingPrice;

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

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      phone: '',
      address: '',
      zip: '',
      city: '',
      country: '',
      paymentOption: 'e-Money',
      eMoneyNumber: '',
      eMoneyPin: '',
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .max(32, 'Must be 32 characters or less')
        .required('Required'),
      email: Yup.string()
        .matches(
          /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
          'Invalid email address',
        )
        .required('Required'),
      phone: Yup.string()
        .matches(
          /^(\+\d{1,2} ?)?(\d{3}[- .]|\(\d{3}\)[- .])?\d{3}[- .]?\d{4}$/,
          'Invalid Phone Number',
        )
        .required('Required'),
      address: Yup.string().required('Required'),
      zip: Yup.string()
        .matches(/^\d{5}$/, 'Invalid ZIP Code')
        .required('Required'),
      city: Yup.string().required('Required'),
      country: Yup.string().required('Required'),
      paymentOption: Yup.string(),
      eMoneyNumber: Yup.string().when('paymentOption', {
        is: 'e-Money',
        then: (schema) =>
          schema
            .matches(/^\d+$/, 'Invalid e-Money Number')
            .required('Required'),
        otherwise: (schema) => schema.optional(),
      }),
      eMoneyPin: Yup.string().when('paymentOption', {
        is: 'e-Money',
        then: (schema) =>
          schema.matches(/^\d{4}$/, 'Invalid e-Money PIN').required('Required'),
        otherwise: (schema) => schema.optional(),
      }),
    }),
    onSubmit: (values) => {
      setShowThanks(true);
      localStorage.clear(); //In case if user refresh page
      //and not proper closed modal before data won't be cached
    },
  });

  const handleToggleModal = (force: boolean) => {
    setShowThanks(force);
    if (showThanks && force === false) {
      setItems([]);
      setTotalPrice(0);
    }
  };
  useDetectOutsideClick(thanksBoxRef, handleToggleModal);

  return (
    <div className={styles.container}>
      <form onSubmit={formik.handleSubmit} className={styles.content}>
        <div className={styles.goBack}>
          <GoBack />
        </div>
        <Billing formik={formik} />
        <Summary
          productsDatabase={productsDatabase}
          totalPrice={totalPrice}
          shippingPrice={shippingPrice}
          vatPrice={vatPrice}
          grandTotalPrice={grandTotalPrice}
        />
      </form>
      <FocusTrap
        active={showThanks}
        focusTrapOptions={{
          allowOutsideClick: true,
        }}
      >
        <div
          className={cx(styles.modalContainer, {
            [styles['modalContainer__show']]: showThanks,
          })}
        >
          <div className={styles.modalContent} ref={thanksBoxRef}>
            <IconOrderConfirmation />
            <h4 className={styles.heading}>
              Thank you<br></br> for your order
            </h4>
            <p className={styles.text}>
              You will receive an email confirmation shortly.
            </p>
            <div className={styles.summaryBox}>
              <ul
                className={cx(styles.items, {
                  [styles['items__showMore']]: showMore,
                })}
              >
                {items.map((item) => {
                  const properties = productsDatabase.find(
                    (item2) => item2.slug === item.slug,
                  );

                  return (
                    <li
                      className={styles.item}
                      key={`cartModalThanks_${item.slug}`}
                    >
                      <img
                        className={styles['item--image']}
                        src={properties?.cart_image}
                        alt={properties?.name}
                      />
                      <span className={styles['item--name']}>
                        {properties?.name}
                      </span>
                      <span className={styles['item--price']}>
                        {properties?.price
                          ? formatPrice(properties.price)
                          : '-'}
                      </span>
                      <span className={styles['item--quantity']}>
                        x{item.quantity}
                      </span>
                    </li>
                  );
                })}
              </ul>
              {items.length > 1 ? (
                <div className={styles.viewLessMoreContainer}>
                  <div className={styles.splitter}></div>
                  <button
                    type="button"
                    className={styles.viewLessMoreButton}
                    onClick={() => setShowMore(!showMore)}
                  >
                    {showMore
                      ? 'View less'
                      : `and ${items.length - 1} other item(s)`}
                  </button>
                </div>
              ) : (
                ''
              )}
              <div className={styles['summaryBox__prices']}>
                <span className={styles['summaryBox__prices--name']}>
                  Grand total
                </span>
                <span className={styles['summaryBox__prices--value']}>
                  {formatPrice(grandTotalPrice)}
                </span>
              </div>
            </div>
            <Button
              onClick={() => {
                setItems([]);
                router.replace('/');
              }}
              style={'primary'}
              additionalClassnames={[styles.cta]}
            >
              Back to home
            </Button>
            {/* <LinkButton
              href={'/'}
              style={'primary'}
              additionalClassnames={[styles.cta]}
            >
              Back to home
            </LinkButton> */}
          </div>
        </div>
      </FocusTrap>
    </div>
  );
};

export default Checkout;
