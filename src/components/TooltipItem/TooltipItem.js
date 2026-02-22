import React, { useState } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import PropTypes from 'prop-types';
import { Button, Tooltip } from 'reactstrap';

import s from './TooltipItem.scss';

const TooltipItem = ({ id, item }) => {
  const [tooltipOpen, setTooltipOpen] = useState(false);

  const toggle = () => {
    setTooltipOpen((prevState) => !prevState);
  };

  return (
    <span>
      <Button className="me-1" color="default" id={`Tooltip-${id}`}>
        {item.text}
      </Button>
      <Tooltip
        placement={item.placement} isOpen={tooltipOpen}
        target={`Tooltip-${id}`} toggle={toggle}
      >
        Tooltip Content!
      </Tooltip>
    </span>
  );
};

TooltipItem.propTypes = {
  id: PropTypes.string.isRequired,
  item: PropTypes.shape({
    text: PropTypes.string.isRequired,
    placement: PropTypes.string,
  }),
};

TooltipItem.defaultProps = {
  item: { placement: '' },
};

export default withStyles(s)(TooltipItem);
