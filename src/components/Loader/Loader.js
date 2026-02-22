import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import s from './Loader.module.scss';

const Loader = ({ className, size }) => (
  <div className={cx(s.root, className)}>
    <i className="la la-spinner la-spin" style={{ fontSize: size }} />
  </div>
);

Loader.propTypes = {
  className: PropTypes.string,
  size: PropTypes.number.isRequired,
};

Loader.defaultProps = {
  className: '',
  size: 21,
};

export default Loader;
