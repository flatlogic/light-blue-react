import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Popover, PopoverBody, PopoverHeader, Alert } from 'reactstrap';

import {
  Button,
  ButtonToolbar,
  Input,
} from "reactstrap";

import Widget from '../../components/Widget';
import Rating from '../product/components/Rating/Rating';
import s from './Management.module.scss';

import { getProductsRequest, deleteProductRequest } from '../../actions/products'
import Loader from '../../components/Loader';
import cx from 'classnames';

const Management = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const products = useSelector((state) => state.products.data);
  const isReceiving = useSelector((state) => state.products.isReceiving);
  const isDeleting = useSelector((state) => state.products.isDeleting);
  const idToDelete = useSelector((state) => state.products.idToDelete);
  const [popovers, setPopovers] = useState({});
  const [promoAlert, setPromoAlert] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  useEffect(() => {
    dispatch(getProductsRequest());
    const timeoutId = setTimeout(() => {
      setPromoAlert(true);
    }, 100);

    return () => clearTimeout(timeoutId);
  }, [dispatch]);

  const imageFormatter = (cell) => (
    <img src={cell} alt="..." className={s.image} title="image"/>
  );

  const ratingFormatter = (cell) => (
    <Rating rating={parseFloat(cell)}/>
  );

  const priceFormatter = (cell) => (
    <span className="text-success">{cell}</span>
  );

  const titleFormatter = (cell, row) => (
    cell ? (
      <Link className="text-primary" to={`/app/ecommerce/product/${row.id}`}>
        {cell[0].toUpperCase() + cell.slice(1)}
      </Link>
    ) : ""
  );

  const deleteProduct = (id) => {
    dispatch(deleteProductRequest({
      id,
      history: {
        push: navigate,
        location,
      }
    }));
  };

  const togglePopover = (id) => {
    setPopovers((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  const apiFormatter = (row) => (
    <ButtonToolbar>
      <Button color="primary" size="xs" onClick={() => navigate(`/app/ecommerce/management/${row.id}`)}>
        <span className="d-none d-md-inline-block">Edit</span>
        <span className="d-md-none"><i className='la la-edit'/></span>
      </Button>
      <Button id={`popoverDelete_${row.id}`} color="danger" size="xs">
        {isDeleting && idToDelete === row.id ? <Loader size={14}/> :
          <span>
            <span className="d-none d-md-inline-block">Delete</span>
            <span className="d-md-none"><i className='la la-remove'/></span>
          </span>
        }
      </Button>
      <Popover className="popover-danger" target={`popoverDelete_${row.id}`} placement="top" isOpen={popovers[row.id]}
               toggle={() => {togglePopover(row.id)}}
      >
        <PopoverHeader className="px-5">Are you sure?</PopoverHeader>
        <PopoverBody className="px-5 d-flex justify-content-center">
          <ButtonToolbar>
            <Button color="success" size="xs" onClick={() => {deleteProduct(row.id)}}>
              Yes
            </Button>
            <Button color="danger" size="xs" onClick={() => {togglePopover(row.id)}}>
              No
            </Button>
          </ButtonToolbar>
        </PopoverBody>
      </Popover>
    </ButtonToolbar>
  );

  const createNewProduct = () => {
    navigate('/app/ecommerce/management/create');
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    setPage(1);
  };

  const handlePageSizeChange = (event) => {
    setPageSize(Number(event.target.value));
    setPage(1);
  };

  const handlePageChange = (nextPage) => {
    setPage(nextPage);
  };

  const getFilteredProducts = (items) => {
    const normalizedQuery = searchQuery.trim().toLowerCase();

    if (!normalizedQuery) {
      return items;
    }

    return items.filter((product) => {
      const searchableParts = [
        product.id,
        product.title,
        product.subtitle,
        product.price,
      ];

      return searchableParts.some((part) =>
        String(part || '')
          .toLowerCase()
          .includes(normalizedQuery),
      );
    });
  };

  const showDesktopColumns = window.innerWidth >= 768;
  const filteredProducts = getFilteredProducts(products);
  const totalRows = filteredProducts.length;
  const totalPages = Math.max(1, Math.ceil(totalRows / pageSize));
  const currentPage = Math.min(page, totalPages);
  const pageStart = (currentPage - 1) * pageSize;
  const visibleProducts = filteredProducts.slice(pageStart, pageStart + pageSize);
  const pageStartNumber = totalRows ? pageStart + 1 : 0;
  const pageEndNumber = totalRows ? pageStart + visibleProducts.length : 0;

  return (
    <div>
      <div className="page-top-line">
        <h2 className="page-title">Product - <span className="fw-semi-bold">Management</span></h2>
        <Alert
          color="success"
          className={cx(s.promoAlert, {[s.showAlert]: promoAlert})}
        >
          This page is only available in <a className="text-white font-weight-bold" rel="noreferrer noopener" href="https://flatlogic.com/templates/light-blue-react-node-js" target="_blank">Light Blue React with NodeJS/.NET</a> integration!
        </Alert>
      </div>
      <Widget title="List of Products" collapse close className="overflow-auto"
              fetchingData={isReceiving}
      >
        <Button color="success" onClick={() => createNewProduct()}>Create Product</Button>
        <div className="d-flex justify-content-end my-lg">
          <Input
            type="search"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search products"
            className="w-auto"
          />
        </div>
        <div className="table-responsive">
          <table className={`table table-striped mb-0 ${s.bootstrapTable}`}>
            <thead>
            <tr>
              <th className="width-50"><span className="fs-sm">ID</span></th>
              <th><span className="fs-sm">Image</span></th>
              <th><span className="fs-sm">Title</span></th>
              {showDesktopColumns && (
                <th><span className="fs-sm">Subtitle</span></th>
              )}
              {showDesktopColumns && (
                <th><span className="fs-sm">Price($)</span></th>
              )}
              {showDesktopColumns && (
                <th><span className="fs-sm">Rating</span></th>
              )}
              <th><span className="fs-sm">Api</span></th>
            </tr>
            </thead>
            <tbody>
            {!visibleProducts.length && (
              <tr>
                <td colSpan={showDesktopColumns ? 7 : 4} className="text-center text-muted py-lg">
                  No products found
                </td>
              </tr>
            )}
            {visibleProducts.map((row) => (
              <tr key={row.id}>
                <td className="width-50">{row.id}</td>
                <td>{imageFormatter(row.img)}</td>
                <td>{titleFormatter(row.title, row)}</td>
                {showDesktopColumns && <td>{row.subtitle}</td>}
                {showDesktopColumns && <td>{priceFormatter(row.price)}</td>}
                {showDesktopColumns && <td>{ratingFormatter(row.rating)}</td>}
                <td>{apiFormatter(row)}</td>
              </tr>
            ))}
            </tbody>
          </table>
        </div>
        <div className="d-flex flex-wrap justify-content-between align-items-center mt-md gap-2">
          <small className="text-muted">
            Showing {pageStartNumber}-{pageEndNumber} of {totalRows}
          </small>
          <div className="d-flex align-items-center gap-2">
            <Input type="select" value={pageSize} onChange={handlePageSizeChange} className={s.pageSizeSelect}>
              <option value="10">10</option>
              <option value="25">25</option>
              <option value="50">50</option>
            </Input>
            <Button
              color="default"
              size="sm"
              disabled={currentPage <= 1}
              onClick={() => handlePageChange(currentPage - 1)}
            >
              Prev
            </Button>
            <span className="px-2">{currentPage} / {totalPages}</span>
            <Button
              color="default"
              size="sm"
              disabled={currentPage >= totalPages}
              onClick={() => handlePageChange(currentPage + 1)}
            >
              Next
            </Button>
          </div>
        </div>
      </Widget>
    </div>

  );
};

export default Management;
