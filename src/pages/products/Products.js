import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import FilterElement from './components/FilterElement/FilterElement';
import ProductCard from './components/ProductCard/ProductCard';
import MobileModal from './components/MobileModal/MobileModal';

import s from './Products.module.scss';
import { getProductsRequest } from '../../actions/products';

const filtersData = [{
  title: 'Filter',
  data: [{
    id: 0,
    label: 'Type',
    options: ['Shoes', 'Boots', 'Trainers'],
  },
  {
    id: 1,
    label: 'Brands',
    options: ['All', 'Nike', 'Adidas'],
  },
  {
    id: 2,
    label: 'Size',
    options: [7, 8, 9, 10, 11, 12, 12.5, 13],
  },
  {
    id: 3,
    label: 'Colour',
    options: ['All', 'White', 'Black'],
  },
  {
    id: 4,
    label: 'Range',
    options: ['All', '-', 'None'],
  }],
},
{
  id: 6,
  title: 'Sort',
  data: ['Favourite', 'Price', 'Popular'],
}];

const ProductList = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.data);
  const [isModalActive, setIsModalActive] = useState(false);
  const [modalId, setModalId] = useState(null);

  useEffect(() => {
    dispatch(getProductsRequest());
  }, [dispatch]);

  const openModal = (id) => {
    setIsModalActive(true);
    setModalId(id);
  };

  const closeModal = () => {
    setIsModalActive(false);
    setModalId(null);
  };

  return (
    <div>
      {!isModalActive &&
        <div>
          {/* eslint-disable */}
          <h1 className="page-title">E-commerce - <span className="fw-semi-bold">Product Grid</span></h1>
          {/* eslint-enable */}
          <div className={s.productsListFilters}>
            {filtersData.map((item) =>
              (typeof item.data[0] === 'string'
                ? <FilterElement color="subtle-blue" defaultLable={item.title} options={item.data} key={item.id} />
                : item.data.map((i) =>
                  <FilterElement color="subtle-blue" defaultLable={i.label} options={i.options} key={i.id} />)),
            )}
          </div>
          <div className={s.mobileFilterButtons}>
            <button
              className="btn btn-transparent btn-lg text-white"
              onClick={() => openModal(1)}
            >
              Sort <i className="fa fa-2x fa-angle-down" />
            </button>
            <button
              className="btn btn-transparent btn-lg text-white"
              onClick={() => openModal(0)}
            >
              Filter <i className="fa fa-2x fa-angle-down" />
            </button>
          </div>
          <div className={s.productsListElements}>
            {products.map((item) => <ProductCard key={item.id} {...item} />)}
          </div>
        </div>
      }
      <MobileModal active={isModalActive && modalId === 0} data={filtersData[0]} close={closeModal} />
      <MobileModal active={isModalActive && modalId === 1} data={filtersData[1]} close={closeModal} />
    </div >
  );
};

export default ProductList;
