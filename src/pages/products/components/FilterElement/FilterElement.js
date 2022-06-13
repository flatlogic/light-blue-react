import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  UncontrolledButtonDropdown,
  DropdownMenu,
  DropdownToggle,
  DropdownItem,
} from 'reactstrap';

import s from './FilterElement.module.scss';

class FilterElement extends Component {
  static propTypes = {
    defaultLable: PropTypes.string.isRequired,
    options: PropTypes.any.isRequired,
  }

  state = {
    currentOption: this.props.options[0],
  }

  changeOption(currentOption) {
    this.setState({ currentOption });
  }

  render() {
    const { options, defaultLable, color } = this.props;
    const { currentOption } = this.state;
    return (
      <div className={s.filterElement}>
        <div className={s.filterElementLable}>{defaultLable}</div>
        <UncontrolledButtonDropdown>
          <DropdownToggle
            caret color={color}
            className={`dropdown-toggle-split me-xs ${s.back}`}
            // className="dropdown-toggle-split me-xs"
          >
            {currentOption}&nbsp;&nbsp;
          </DropdownToggle>
          <DropdownMenu>
            {options.map(item =>
              <DropdownItem key={item} onClick={() => this.changeOption(item)}>{item}</DropdownItem>,
            )}
          </DropdownMenu>
        </UncontrolledButtonDropdown>
      </div>
    );
  }
}

export default FilterElement;

