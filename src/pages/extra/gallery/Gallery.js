import React, { useMemo, useState } from 'react';
import {
  Button,
  ButtonGroup,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from 'reactstrap';

import s from './Gallery.module.scss';

import pic1 from '../../../images/pictures/1.jpg';
import pic2 from '../../../images/pictures/2.jpg';
import pic3 from '../../../images/pictures/3.jpg';
import pic4 from '../../../images/pictures/4.jpg';
import pic5 from '../../../images/pictures/5.jpg';
import pic6 from '../../../images/pictures/6.jpg';
import pic8 from '../../../images/pictures/8.jpg';
import pic9 from '../../../images/pictures/9.jpg';
import pic10 from '../../../images/pictures/10.jpg';
import pic11 from '../../../images/pictures/11.jpg';
import pic13 from '../../../images/pictures/13.jpg';
import pic14 from '../../../images/pictures/14.jpg';

const items = [
  {
    name: 'Mountains',
    groups: [
      'nature',
    ],
    src: pic1,
    date: '10 mins',
  },
  {
    name: 'Empire State Pigeon',
    groups: [
      'people',
    ],
    src: pic2,
    date: '1 hour',
    like: true,
  },
  {
    name: 'Big Lake',
    groups: [
      'nature',
    ],
    src: pic3,
    date: '2 mins',
    like: true,
  },
  {
    name: 'Forest',
    groups: [
      'nature',
    ],
    src: pic4,
    date: '2 mins',
    like: true,
  },
  {
    name: 'Smile',
    groups: [
      'people',
    ],
    src: pic5,
    date: '2 mins',
  },
  {
    name: 'Smile',
    groups: [
      'people',
    ],
    src: pic6,
    date: '1 hour',
    like: true,
  },
  {
    name: 'Fog',
    groups: [
      'nature',
    ],
    src: pic8,
    date: '2 mins',
    like: true,
  },
  {
    name: 'Beach',
    groups: [
      'people',
    ],
    src: pic9,
    date: '2 mins',
  },
  {
    name: 'Pause',
    groups: [
      'people',
    ],
    src: pic10,
    date: '3 hour',
    like: true,
  },
  {
    name: 'Space',
    groups: [
      'space',
    ],
    src: pic11,
    date: '3 hour',
    like: true,
  },
  {
    name: 'Shuttle',
    groups: [
      'space',
    ],
    src: pic13,
    date: '35 mins',
    like: true,
  },
  {
    name: 'Sky',
    groups: [
      'space',
    ],
    src: pic14,
    date: '2 mins',
  },
];

const Gallery = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const [lightboxIsOpen, setLightboxIsOpen] = useState(false);
  const [children, setChildren] = useState(items);
  const [activeGroup, setActiveGroup] = useState('all');
  const [order, setOrder] = useState('asc');

  const currentItem = useMemo(() => children[currentImage], [children, currentImage]);

  const openLightbox = (index, event) => {
    event.preventDefault();
    setCurrentImage(index);
    setLightboxIsOpen(true);
  };

  const gotoPrevious = () => {
    setCurrentImage((prevImage) => Math.max(prevImage - 1, 0));
  };

  const gotoNext = () => {
    setCurrentImage((prevImage) => Math.min(prevImage + 1, children.length - 1));
  };

  const closeLightbox = () => {
    setCurrentImage(0);
    setLightboxIsOpen(false);
  };

  const filterChildren = (type) => {
    setChildren(type === 'all' ? items : items.filter((child) => {
      const group = child.groups.find((itemGroup) => itemGroup === type);
      return !!group;
    }));
    setActiveGroup(type);
    setCurrentImage(0);
  };

  const orderChildren = (sortOrder) => {
    const sortedChildren = [...children].sort((a, b) => {
      const nameA = a.name.toLowerCase();
      const nameB = b.name.toLowerCase();

      if (nameA < nameB) {
        return sortOrder === 'asc' ? -1 : 1;
      }

      if (nameA > nameB) {
        return sortOrder === 'asc' ? 1 : -1;
      }
      return 0;
    });

    setChildren(sortedChildren);
    setOrder(sortOrder);
    setCurrentImage((prevImage) => Math.min(prevImage, sortedChildren.length - 1));
  };

  return (
    <div className={s.root}>
        <h1 className="page-title">Media - <span className="fw-semi-bold">Images</span>
        </h1>

        <div className={s.galleryControls}>
          <ButtonGroup id="shuffle-buttons">
            <Button color="default" onClick={() => filterChildren('all')} active={activeGroup === 'all'}>All</Button>
            <Button color="default" onClick={() => filterChildren('nature')} active={activeGroup === 'nature'}>Nature</Button>
            <Button color="default" onClick={() => filterChildren('people')} active={activeGroup === 'people'}>People</Button>
            <Button color="default" onClick={() => filterChildren('space')} active={activeGroup === 'space'}>Space</Button>
          </ButtonGroup>
          <ButtonGroup id="order-buttons">
            <Button color="default" onClick={() => orderChildren('asc')} active={order === 'asc'}><i className="fa fa-sort-numeric-asc" /></Button>
            <Button color="default" onClick={() => orderChildren('desc')} active={order === 'desc'}><i className="fa fa-sort-numeric-desc" /></Button>
          </ButtonGroup>
        </div>
        <div className={s.gallery}>
          {children.map((item, index) => {
            const key = item.name + index;
            return (
              <div key={key} className={`${s.picture} card`}>
                <a href={item.src} onClick={e => openLightbox(index, e)}><img className="figure-img" src={item.src} alt="..." /></a>
                <div className={s.description}>
                  <h6 className="mt-0 mb-xs">{item.name}</h6>
                  <ul className="post-links">
                    <li><button className="btn-link">{item.date}</button></li>
                    <li><button className="btn-link"><span className="text-danger"><i className={`fa ${item.like ? 'fa-heart' : 'fa-heart-o'}`} /> Like</span></button></li>
                    <li><button className="btn-link">Details</button></li>
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
        <Modal isOpen={lightboxIsOpen} toggle={closeLightbox} centered size="xl">
          <ModalHeader toggle={closeLightbox}>
            {currentItem ? currentItem.name : 'Image'}
          </ModalHeader>
          <ModalBody className="d-flex justify-content-center">
            {currentItem && (
              <img
                className="img-fluid"
                src={currentItem.src}
                alt={currentItem.name}
              />
            )}
          </ModalBody>
          <ModalFooter className="justify-content-between">
            <Button
              color="default"
              onClick={gotoPrevious}
              disabled={currentImage <= 0}
            >
              Previous
            </Button>
            <span className="text-muted">
              {children.length ? currentImage + 1 : 0} / {children.length}
            </span>
            <Button
              color="default"
              onClick={gotoNext}
              disabled={currentImage >= children.length - 1}
            >
              Next
            </Button>
          </ModalFooter>
        </Modal>
      </div>
  );
};

export default Gallery;
