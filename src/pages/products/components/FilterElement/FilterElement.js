import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  UncontrolledButtonDropdown,
  DropdownMenu,
  DropdownToggle,
  DropdownItem,
} from 'reactstrap';

import s from './FilterElement.module.scss';

const FilterElement = ({ options, defaultLable, color }) => {
  const [currentOption, setCurrentOption] = useState(options[0]);

  return (
    <div className={s.filterElement}>
      <div className={s.filterElementLable}>{defaultLable}</div>
      <UncontrolledButtonDropdown>
        <DropdownToggle
          caret color={color}
          className={`dropdown-toggle-split me-1 ${s.back}`}
        >
          {currentOption}&nbsp;&nbsp;
        </DropdownToggle>
        <DropdownMenu>
          {options.map((item) =>
            <DropdownItem key={item} onClick={() => setCurrentOption(item)}>{item}</DropdownItem>,
          )}
        </DropdownMenu>
      </UncontrolledButtonDropdown>
    </div>
  );
};

FilterElement.propTypes = {
  defaultLable: PropTypes.string.isRequired,
  options: PropTypes.any.isRequired,
};

export default FilterElement;
