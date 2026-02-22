import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  UncontrolledButtonDropdown,
  DropdownMenu,
  DropdownToggle,
  DropdownItem,
} from 'reactstrap';

import s from './Selects.module.scss';

const Selects = ({ sizes, quantity }) => {
  const [currentSize, setCurrentSize] = useState('Select size');
  const [currentQuantity, setCurrentQuantity] = useState(1);

  return (
    <div className={s.selects}>
      <UncontrolledButtonDropdown>
        <DropdownToggle
          caret color="custom-dark"
          className="dropdown-toggle-split me-1"
        >
          {currentSize === 'Select size'
            ? currentSize
            : `Size: ${currentSize}`}
        </DropdownToggle>
        <DropdownMenu>
          {sizes.map((item) =>
            <DropdownItem key={item} onClick={() => setCurrentSize(item)}>{item}</DropdownItem>,
          )}
        </DropdownMenu>
      </UncontrolledButtonDropdown>
      <UncontrolledButtonDropdown>
        <DropdownToggle
          caret color="custom-dark"
          className="dropdown-toggle-split me-1"
        >
          {currentQuantity}
        </DropdownToggle>
        <DropdownMenu>
          {quantity.map((item) =>
            <DropdownItem key={item} onClick={() => setCurrentQuantity(item)}>{item}</DropdownItem>,
          )}
        </DropdownMenu>
      </UncontrolledButtonDropdown>
    </div>
  );
};

Selects.propTypes = {
  sizes: PropTypes.any.isRequired,
  quantity: PropTypes.any.isRequired,
};

export default Selects;
