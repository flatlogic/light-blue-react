import React, { useState } from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';

import ModalMenuOption from '../MobileMenuOption/MobileMenuOption';

import closeImg from '../../../../images/cancel.svg';
import backImg from '../../../../images/back.svg';

import s from './MobileModal.module.scss';

const MobileModal = ({ active, close, data: modalData }) => {
  const [isPageOpened, setIsPageOpened] = useState(false);
  const [activePageId, setActivePageId] = useState(0);
  const [activeOptions, setActiveOptions] = useState({});
  const isPages = typeof modalData.data[0] !== 'string';

  const toggleOptionActive = (field, value) => {
    const newActiveOption = {
      ...activeOptions,
      [field]: value,
    };

    setActiveOptions(newActiveOption);
  };

  const handleBackClick = () => {
    setActivePageId(null);
    setIsPageOpened(false);
  };

  const handleCloseClick = () => {
    setActivePageId(null);
    setIsPageOpened(false);

    close();
  };

  const openPage = (index) => {
    setActivePageId(index);
    setIsPageOpened(true);
  };

  const { data, title } = modalData;
  const openedPage = isPageOpened && data[activePageId];
  const renderedTitle = openedPage ? openedPage.label : title;

  return (
    <div className={cx(s.mobileModal, { [s.mobileModalActive]: active })}>
      <div className={s.mobileModalTitle}>
        <button onClick={openedPage ? handleBackClick : handleCloseClick}>
          <img className={cx({ back: openedPage })} src={openedPage ? backImg : closeImg} alt="close" />
        </button>
        <h5>{renderedTitle}</h5>
      </div>
      <ul className={s.mobileModalBody}>
        {/* eslint-disable */}
        {isPages
          ? !isPageOpened
            ? data.map(({ label, id }, index) => <li onClick={() => openPage(index)} key={id}>{label}</li>)
            : openedPage.options.map((option, index) => <ModalMenuOption
              active={activeOptions[renderedTitle] === index}
              onClick={() => toggleOptionActive(renderedTitle, index)}
              key={index}
            >
              {option}
            </ModalMenuOption>)
          : data.map((option, index) => <ModalMenuOption
            active={activeOptions[renderedTitle] === index}
            onClick={() => toggleOptionActive(renderedTitle, index)}
            key={index}
          >
            {option}
          </ModalMenuOption>)}
        {/* eslint-enable */}
      </ul>
    </div >
  );
};

MobileModal.propTypes = {
  active: PropTypes.bool,
  close: PropTypes.func.isRequired,
  data: PropTypes.any.isRequired,
};

MobileModal.defaultProps = {
  active: false,
};

export default MobileModal;
