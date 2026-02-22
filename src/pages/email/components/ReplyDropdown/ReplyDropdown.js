import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  ButtonDropdown,
  Button,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';

const ReplyDropdown = ({ compose }) => {
  const [open, setOpen] = useState(false);

  const toggle = () => {
    setOpen((pvState) => !pvState);
  };

  return (
    <ButtonDropdown isOpen={open} toggle={toggle}>
      <Button size="sm" id="dropdownFour" color="default" onClick={() => compose()}>
        <i className="fa fa-reply" /> Reply
      </Button>
      <DropdownToggle size="sm" color="default" className="dropdown-toggle-split">
        <i className="fa fa-angle-down" />
      </DropdownToggle>
      <DropdownMenu>
        <DropdownItem><i className="fa fa-reply" /> Reply</DropdownItem>
        <DropdownItem><i className="fa fa-arrow-right" /> Forward</DropdownItem>
        <DropdownItem><i className="fa fa-print" /> Print</DropdownItem>
        <DropdownItem divider />
        <DropdownItem><i className="fa fa-ban" /> Spam</DropdownItem>
        <DropdownItem><i className="fa fa-trash" /> Delete</DropdownItem>
      </DropdownMenu>
    </ButtonDropdown>
  );
};

ReplyDropdown.propTypes = {
  compose: PropTypes.func.isRequired,
};

export default ReplyDropdown;
