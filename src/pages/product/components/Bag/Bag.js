import React, { useState } from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';

import bag from '../../../../images/bag.svg';
import star from '../../../../images/stars/star.svg';
import starFilled from '../../../../images/stars/star-filled.svg';
import s from './Bag.module.scss';

const Bag = ({ favourite: initialFavourite }) => {
  const [favourite, setFavourite] = useState(initialFavourite || false);

  const changeFavourite = () => {
    setFavourite((prevState) => !prevState);
  };

  return (
    <div className={s.bag}>
      <button className={cx('btn', s.add)}>
        add to bag
        <img src={bag} alt="bag" />
      </button>
      <button className={cx('btn', s.star)} onClick={changeFavourite}>
        <img src={favourite ? starFilled : star} alt="star" />
      </button>
    </div>
  );
};

Bag.propTypes = {
  favourite: PropTypes.bool,
};

Bag.defaultProps = {
  favourite: false,
};

export default Bag;
