import React, { useState } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { Badge } from 'reactstrap';

import s from './Filters.module.scss';

const Filters = ({ filter, openMessage, compose }) => {
  const [activeButtonId, setActiveButtonId] = useState(0);

  const handleButtonClick = (id, filterCond) => {
    setActiveButtonId(id);
    openMessage(null);
    filter(filterCond);
  };

  const mainButtons = [
    { id: 0, title: 'Inbox', notifications: 2, filter: null },
    { id: 1, title: 'Starred', filter: 'starred' },
    { id: 2, title: 'Sent Mail', filter: 'sent' },
    { id: 3, title: 'Draft', notifications: 3, lable: 'danger', filter: 'draft' },
    { id: 4, title: 'Trash', filter: 'trash' },
  ];
  const quickViewButton = [
    { id: 0, title: 'Work', colour: 'danger' },
    { id: 1, title: 'Private', colour: 'success' },
    { id: 2, title: 'Saved', colour: 'primary' },
  ];

  return (
    <div className={s.filters}>
      <button
        className="btn btn-danger btn-block"
        onClick={() => compose(true)}
      >
        Compose
      </button>
      <div className={s.mainFilterButtons}>
        {mainButtons.map((button) =>
          <button
            className={cx('btn', s.button, { [s.buttonActive]: button.id === activeButtonId })}
            key={button.id}
            onClick={() => handleButtonClick(button.id, button.filter)}
          >
            {button.title}
            {button.notifications &&
              <Badge color={button.lable || 'default'} pill>{button.notifications}</Badge>}
          </button>,
        )}
      </div>
      <div>
        <h6>QUICK VIEW</h6>
        {quickViewButton.map((button) =>
          <button className={cx('btn', s.button)} key={button.id}>
            {button.title}
            <i className={cx('fa fa-circle', { [`text-${button.colour}`]: true })} />
          </button>,
        )}
      </div>
    </div>
  );
};

Filters.propTypes = {
  filter: PropTypes.func.isRequired,
  openMessage: PropTypes.func.isRequired,
  compose: PropTypes.func.isRequired,
};

export default Filters;
