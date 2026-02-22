import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import Section from './components/Section/Section';
import Banner from './components/Banner/Banner';
import Description from './components/Description/Description';
import Slider from './components/Slider/Slider';
import { getProductsRequest } from '../../actions/products';

const fallbackProduct = {
    img: 'static/media/img1.jpg',
    title: 'trainers',
    subtitle: 'Trainers In White',
    price: 76,
    rating: 4.6,
    description_1: "Sneakers (also known as athletic shoes, tennis shoes,gym shoes, runners, takkies, or trainers) are shoes primarily designed for sports or other forms of physical exercise, but which are now also often used for everyday wear.",
    description_2: "The term generally describes a type of footwear with a flexible sole made of rubber or synthetic material and an upper part made of leather or synthetic materials.",
    code: 135234,
    hashtag: "whitetrainers",
    technology: [
        "Ollie patch",
        "Cup soles",
        "Vulcanized rubber soles"
    ],
    reviews: 32
};

const Product = () => {
    const dispatch = useDispatch();
    const products = useSelector((state) => state.products.data);
    const { id } = useParams();

    React.useEffect(() => {
        window.scrollTo(0,0);
        dispatch(getProductsRequest());
    }, [dispatch]);

    const parsedId = id ? parseInt(id, 10) : null;
    const product = parsedId ? products.find((p) => p.id === parsedId) : fallbackProduct;

    return (
        <div className="product-details">
            <h1 className="page-title">E-commerce - <span className="fw-semi-bold">Product Detail</span></h1>
            {
                product && (
                    <div>
                        <Banner data={product}/>
                        <Section title="Product Description" h>
                            <Description data={product}/>
                        </Section>
                        <Section title="You may also like">
                            <Slider slides={products}/>
                        </Section>
                    </div>
                )
            }
        </div>
    );
};

export default Product;
