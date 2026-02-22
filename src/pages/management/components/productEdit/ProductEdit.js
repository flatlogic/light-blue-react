import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import TagsInput from 'react-tagsinput'
import {
  Input,
  Label,
  Form,
  FormGroup,
  Col,
  Button,
  ButtonToolbar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Popover,
  PopoverHeader,
  PopoverBody
} from "reactstrap";

import {
  loadProductRequest,
  receiveProduct,
  updateProduct,
  updateProductRequest,
  createProductRequest,
  deleteProductRequest,
  getProductsImagesRequest
} from '../../../../actions/products';
import Widget from '../../../../components/Widget';
import Loader from '../../../../components/Loader';
import s from './ProductEdit.module.scss';

const ProductEdit = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  const products = useSelector((state) => state.products.data);
  const images = useSelector((state) => state.products.images);
  const isReceiving = useSelector((state) => state.products.isReceiving);
  const isUpdating = useSelector((state) => state.products.isUpdating);
  const isDeleting = useSelector((state) => state.products.isDeleting);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [popover, setPopover] = useState(false);
  const description1 = useRef(null);
  const description2 = useRef(null);
  const productId = parseInt(id, 10) || -1;

  const findProduct = (value) => products.find((p) => p.id === value);

  useEffect(() => {
    const newProduct = {
      id: -1,
      price: 0.01,
      rating: 5,
      technology: []
    };
    const product = findProduct(productId);
    if (productId > -1) {
      if (!product) {
        dispatch(loadProductRequest(productId));
      }
    } else if (!product) {
      dispatch(receiveProduct(newProduct));
    }
    dispatch(getProductsImagesRequest(newProduct));
  }, [dispatch, productId]);

  useEffect(() => {
    const product = findProduct(productId) || {
      technology: []
    };
    if (description1.current) {
      description1.current.value = product.description_1 || "";
    }

    if (description2.current) {
      description2.current.value = product.description_2 || "";
    }
  }, [products, productId]);

  const requestUpdateProduct = () => {
    const product = findProduct(productId);
    if (product) {
      dispatch(updateProductRequest(product));
    }
  };

  const requestCreateProduct = () => {
    const product = findProduct(productId);
    if (!product) {
      return;
    }
    dispatch(createProductRequest({
      product,
      history: {
        push: navigate,
        location,
      }
    }));
  };

  const requestDeleteProduct = () => {
    dispatch(deleteProductRequest({
      id: productId,
      history: {
        push: navigate,
        location,
      }
    }));
  };

  const updateProductField = (value, key) => {
    const product = findProduct(productId);
    if (!product) {
      return;
    }
    product[key] = value;
    dispatch(updateProduct(product));
  };

  const goBack = () => {
    navigate('/app/ecommerce/management');
  };

  const isNew = productId === -1;
  const product = findProduct(productId) || {
    technology: []
  };
  const image = product ? product.img : null;

  return (
    <div>
      <h2 className="page-title">Product - <span className="fw-semi-bold">Detail</span></h2>
      <Widget title={(isNew ? "New" : "Edit") + " product"} collapse close>
        {!isNew && isReceiving ? <Loader size={40}/> :
          <Form>
            <FormGroup row>
              <Label md={2} for="productImage">Image</Label>
              <Col md={5}>
                <Dropdown isOpen={dropdownOpen} toggle={() => setDropdownOpen((prevState) => !prevState)}
                          id="productImage">
                  <DropdownToggle caret color="info">
                    {image && <img className={s.productImage} alt="img" src={image}/>}
                  </DropdownToggle>
                  <DropdownMenu>
                    {images.map((img) => (
                      <DropdownItem key={img} onClick={() => updateProductField(img, 'img')}>
                        <img className={s.productImage} alt={img} src={img}/>
                      </DropdownItem>
                    ))}
                  </DropdownMenu>
                </Dropdown>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label md={2} for="productTitle">Title</Label>
              <Col md={5}>
                <Input className="input-transparent" id="productTitle" type="text" defaultValue={product.title}
                       onChange={(event) => updateProductField(event.target.value, 'title')}/>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label md={2} for="productSubtitle">Subtitle</Label>
              <Col md={5}>
                <Input className="input-transparent" id="productSubtitle" type="text" defaultValue={product.subtitle}
                       onChange={(event) => updateProductField(event.target.value, 'subtitle')}/>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label md={2} for="productPrice">Price</Label>
              <Col md={2}>
                <Input className="input-transparent" id="productPrice" type="number" step={0.01} min={0.01}
                       defaultValue={product.price}
                       onChange={(event) => updateProductField(event.target.value, 'price')}/>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label md={2} for="productDiscount">Discount</Label>
              <Col md={2}>
                <Input className="input-transparent" id="productDiscount" type="number" step={1} min={0} max={100}
                       defaultValue={product.discount || 0}
                       onChange={(event) => updateProductField(event.target.value, 'discount')}/>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label md={2} for="productDescription_1">Description 1</Label>
              <Col md={5}>
                <textarea rows={3} className="form-control input-transparent" id="productDescription_1"
                          ref={description1}
                          onChange={(event) => updateProductField(event.target.value, 'description_1')}/>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label md={2} for="productDescription_2">Description 2</Label>
              <Col md={5}>
                <textarea rows={3} className="form-control input-transparent" id="productDescription_2"
                          ref={description2}
                          onChange={(event) => updateProductField(event.target.value, 'description_2')}/>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label md={2} for="productCode">Code</Label>
              <Col md={2}>
                <Input className="input-transparent" id="productCode" type="text"
                       defaultValue={product.code}
                       onChange={(event) => updateProductField(event.target.value, 'code')}/>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label md={2} for="productHashtag">Hashtag</Label>
              <Col md={5}>
                <Input className="input-transparent" id="productHashtag" type="text"
                       defaultValue={product.hashtag}
                       onChange={(event) => updateProductField(event.target.value, 'hashtag')}/>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label md={2} for="productTechnology">Technology</Label>
              <Col md={5}>
                <TagsInput className="react-tagsinput form-control input-transparent" id="productTechnology"
                           value={product.technology}
                           onChange={(tags) => updateProductField(tags, 'technology')}/>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label md={2} for="productRating">Rating</Label>
              <Col md={2}>
                <Input className="input-transparent" id="productRating" step={0.1} min={0} max={5} type="number"
                       defaultValue={product.rating}
                       onChange={(event) => updateProductField(event.target.value, 'rating')}/>
              </Col>
            </FormGroup>
            <ButtonToolbar>
              <Button color="success"
                      onClick={!isNew ? requestUpdateProduct : requestCreateProduct}>
                {isUpdating ? <Loader/> : 'Save'}
              </Button>
              <Button color="default" onClick={() => {
                goBack()
              }}>Back</Button>
              {!isNew && (
                <span>
                  <Button id="deleteProductPopover" color="danger">
                    {isDeleting ? <Loader/> : 'Delete'}
                  </Button>
                  <Popover className="popover-danger" target="deleteProductPopover"
                           placement="top"
                           isOpen={popover}
                           toggle={() => {
                             setPopover((prevState) => !prevState);
                           }}
                  >
                    <PopoverHeader className="px-5">Are you sure?</PopoverHeader>
                    <PopoverBody className="px-5 d-flex justify-content-center">
                      <ButtonToolbar>
                        <Button color="success" size="xs" onClick={requestDeleteProduct}>
                          Yes
                        </Button>
                        <Button color="danger" size="xs" onClick={() => {
                          setPopover((prevState) => !prevState);
                        }}>
                          No
                        </Button>
                      </ButtonToolbar>
                    </PopoverBody>
                  </Popover>
                </span>
              )}
            </ButtonToolbar>
          </Form>
        }
      </Widget>
    </div>

  );
};

export default ProductEdit;
