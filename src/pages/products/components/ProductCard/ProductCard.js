import React, { useState } from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

import Rating from '../../../product/components/Rating/Rating';

import star from '../../../../images/stars/star.svg';
import starFilled from '../../../../images/stars/star-filled.svg';

import s from './ProductCard.module.scss';

const ProductCard = ({
  img,
  title,
  subtitle,
  price,
  discount,
  rating,
  id,
  createdAt,
  updatedAt,
  favourite: initialFavourite,
}) => {
  const navigate = useNavigate();
  const [favourite, setFavourite] = useState(initialFavourite);

  const changeFavourite = () => {
    setFavourite((prevState) => !prevState);
  };

  const openProduct = (productId) => {
    navigate(`/app/ecommerce/product/${productId}`);
  };

  const newPrice = discount ? price - (price * discount / 100) : price;
  const label = discount ? "Sale" : createdAt === updatedAt ? "New" : null;

  return (
    <div className={[s.productCard, 'product-card'].join(' ')}>
      <div onClick={() => {openProduct(id)}} className={s.productCardPhoto} style={{ backgroundImage: `url(${img})` }}>
        {label && <div className={cx(s.label, label === 'Sale' ? 'bg-primary' : 'bg-success')}>{label}</div>}
        <button className={s.star} onClick={() => changeFavourite()}>
          <img src={favourite ? starFilled : star} alt="star" />
        </button>
      </div>
      <div className={s.productCardDataWrapper}>
        <div className={cx(s.productsCardTitle, 'title')}>{title}</div>
        <div className={cx(s.productsCardDescription, 'description')}>{subtitle}</div>
      </div>
      <div className={s.productsCardPrice}>
        {!discount
          ? `$${price}`
          : <div className={s.sale}>
            <span className={s.old}>${price}</span>
            {discount}% off
         <span className={s.new}> ${newPrice}</span>
          </div>
        }
        {rating && <Rating rating={rating} size="sm" />}
      </div>
    </div>
  );
};

ProductCard.propTypes = {
  img: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  price: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
  ]).isRequired,
  discount: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
  ]),
    rating: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
    ]).isRequired,
};

ProductCard.getDefaultProps = {
  rating: null,
};

export default ProductCard;
