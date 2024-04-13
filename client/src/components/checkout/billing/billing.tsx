import React, { FC, useState } from 'react';
import cx from 'classnames';

import styles from './billing.module.css';
import RadioSelection from '@/components/radio/radio';
import Input from '@/components/input/input';
import { FormikProps } from 'formik';
import { CheckoutFormikValuesType } from '../checkout';
import IconCashOnDelivery from '@/icons/IconCashOnDelivery';

interface Props {
  formik: FormikProps<CheckoutFormikValuesType>;
}
const Billing: FC<Props> = ({
  formik: { handleChange, handleBlur, values, errors, touched },
}) => {
  return (
    <div className={styles.billing}>
      <h1 className={styles.heading}>Checkout</h1>
      <div className={cx(styles.fieldsBox, styles['fieldsBox__billing'])}>
        <h2 className={styles.sectionHeading}>Billing details</h2>
        <div className={styles['fieldsBox--fields']}>
          <Input
            name={'name'}
            error={errors.name}
            touched={touched.name}
            value={values.name}
            handleChange={handleChange}
            handleBlur={handleBlur}
            placeholder={'Alexei Ward'}
            inputType={'text'}
            label={'Name'}
          />
          <Input
            name={'email'}
            error={errors.email}
            touched={touched.email}
            value={values.email}
            handleChange={handleChange}
            handleBlur={handleBlur}
            placeholder={'alexei@mail.com'}
            inputType={'email'}
            label={'Email Address'}
          />
          <Input
            name={'phone'}
            error={errors.phone}
            touched={touched.phone}
            value={values.phone}
            handleChange={handleChange}
            handleBlur={handleBlur}
            placeholder={'+1 202-555-0136'}
            inputType={'text'}
            label={'Phone Number'}
          />
        </div>
      </div>
      <div className={cx(styles.fieldsBox, styles['fieldsBox__shipping'])}>
        <h2 className={styles.sectionHeading}>Shipping info</h2>

        <div className={styles['fieldsBox--fields']}>
          <Input
            name={'address'}
            error={errors.address}
            touched={touched.address}
            value={values.address}
            handleChange={handleChange}
            handleBlur={handleBlur}
            placeholder={'1137 Williams Avenue'}
            inputType={'text'}
            label={'Address'}
            additionalClassnames={[styles['input__address']]}
          />

          <Input
            name={'zip'}
            error={errors.zip}
            touched={touched.zip}
            value={values.zip}
            handleChange={handleChange}
            handleBlur={handleBlur}
            placeholder={'10001'}
            inputType={'text'}
            label={'ZIP Code'}
            additionalClassnames={[styles['input__zip']]}
          />
          <Input
            name={'city'}
            error={errors.city}
            touched={touched.city}
            value={values.city}
            handleChange={handleChange}
            handleBlur={handleBlur}
            placeholder={'New York'}
            inputType={'text'}
            label={'City'}
            additionalClassnames={[styles['input__city']]}
          />
          <Input
            name={'country'}
            error={errors.country}
            touched={touched.country}
            value={values.country}
            handleChange={handleChange}
            handleBlur={handleBlur}
            placeholder={'United States'}
            inputType={'text'}
            label={'Country'}
            additionalClassnames={[styles['input__country']]}
          />
        </div>
      </div>
      <div className={cx(styles.fieldsBox, styles['fieldsBox__payment'])}>
        <h2 className={styles.sectionHeading}>Payment details</h2>
        <span className={styles.standaloneLabel}>Payment Method</span>
        <div className={styles['fieldsBox--radios']}>
          <RadioSelection
            name={'paymentOption'}
            text={'e-Money'}
            value={values.paymentOption}
            handleChange={handleChange}
            handleBlur={handleBlur}
          />
          <RadioSelection
            name={'paymentOption'}
            text={'Cash on Delivery'}
            value={values.paymentOption}
            handleChange={handleChange}
            handleBlur={handleBlur}
          />
        </div>
        {values.paymentOption === 'e-Money' ? (
          <div className={styles['fieldsBox--fields']}>
            <Input
              name={'eMoneyNumber'}
              error={errors.eMoneyNumber}
              touched={touched.eMoneyNumber}
              value={values.eMoneyNumber}
              handleChange={handleChange}
              handleBlur={handleBlur}
              placeholder={'238521993'}
              inputType={'text'}
              label={'e-Money Number'}
            />
            <Input
              name={'eMoneyPin'}
              error={errors.eMoneyPin}
              touched={touched.eMoneyPin}
              value={values.eMoneyPin}
              handleChange={handleChange}
              handleBlur={handleBlur}
              placeholder={'6891'}
              inputType={'text'}
              label={'e-Money PIN'}
            />
          </div>
        ) : (
          <div className={styles.cashOnDeliveryContainer}>
            <IconCashOnDelivery />
            <p>
              The ‘Cash on Delivery’ option enables you to pay in cash when our
              delivery courier arrives at your residence. Just make sure your
              address is correct so that your order will not be cancelled.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Billing;
