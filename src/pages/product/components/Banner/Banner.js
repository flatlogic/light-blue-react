import React from 'react';
import PropTypes from 'prop-types';

import General from '../General/General';
import Selects from '../Selects/Selects';
import Bag from '../Bag/Bag';

import mastercard from '../../../../images/payments/master.png';
import visa from '../../../../images/payments/visa.png';
import paypal from '../../../../images/payments/paypal.png';

import s from './Banner.module.scss';

const Banner = ({ data }) => (
  <div className={s.productDetailsBanner}>
    <div className={s.productPhoto} style={{ backgroundImage: `url(${data.img})` }} />
    <div className={s.productInfo}>
      <General {...data} />
      <button className={`btn-link ${s.productGuide}`}>Size Guide</button>
      <Selects sizes={[1, 2, 3, 4, 5]} quantity={[1, 2, 3, 4, 5, 6, 7]} />
      <Bag />
      <div className={s.payments}>
        <div style={{ backgroundImage: `url(${visa})` }} />
        <div style={{ backgroundImage: `url(${mastercard})` }} />
        <div style={{ backgroundImage: `url(${paypal})` }} />
      </div>
      <span className={s.delivery}>FREE Delivery & Returns</span>
    </div>
  </div >
);

Banner.propTypes = {
  data: PropTypes.any.isRequired,
};

export default Banner;
