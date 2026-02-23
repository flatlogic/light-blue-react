import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import s from './Skycon.module.scss';

const ICON_MAP = {
  CLEAR_DAY: 'bi-sun-fill',
  CLEAR_NIGHT: 'bi-moon-stars-fill',
  PARTLY_CLOUDY_DAY: 'bi-cloud-sun-fill',
  PARTLY_CLOUDY_NIGHT: 'bi-cloud-moon-fill',
  CLOUDY: 'bi-cloud-fill',
  RAIN: 'bi-cloud-rain-heavy-fill',
  SLEET: 'bi-cloud-sleet-fill',
  SNOW: 'bi-cloud-snow-fill',
  WIND: 'bi-wind',
  FOG: 'bi-cloud-fog2-fill',
};

const parseSize = (size) => {
  const numericSize = Number(size);
  if (Number.isFinite(numericSize) && numericSize > 0) {
    return `${numericSize}px`;
  }

  if (typeof size === 'string' && size.trim()) {
    return size;
  }

  return '24px';
};

const Skycon = ({
  className,
  color,
  autoPlay,
  icon,
  width,
  height,
  ...restProps
}) => {
  const iconClassName = ICON_MAP[icon] || ICON_MAP.CLEAR_DAY;
  const widthPx = parseSize(width);
  const heightPx = parseSize(height);
  const fontSize = Number.parseInt(widthPx, 10) <= Number.parseInt(heightPx, 10) ? widthPx : heightPx;

  return (<span
    className={cx(
      'bi',
      iconClassName,
      s.icon,
      {
        [s.animated]: autoPlay && icon !== 'WIND',
        [s.wind]: autoPlay && icon === 'WIND',
      },
      className,
    )}
    style={{ color, width: widthPx, height: heightPx, fontSize }}
    {...restProps}
  />);
};

Skycon.propTypes = {
  className: PropTypes.string,
  color: PropTypes.string,
  autoPlay: PropTypes.bool,
  icon: PropTypes.oneOf([  // eslint-disable-line
    'CLEAR_DAY',
    'CLEAR_NIGHT',
    'PARTLY_CLOUDY_DAY',
    'PARTLY_CLOUDY_NIGHT',
    'CLOUDY',
    'RAIN',
    'SLEET',
    'SNOW',
    'WIND',
    'FOG',
  ]),
  width: PropTypes.string.isRequired,
  height: PropTypes.string.isRequired,
};

Skycon.defaultProps = {
  className: '',
  color: null,
  autoPlay: true,
  width: '100%',
  height: '100%',
};

export default Skycon;
