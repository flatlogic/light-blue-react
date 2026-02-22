import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

const Skycons = require('skycons')(window || {});

const Skycon = ({
  color,
  autoPlay,
  icon,
  width,
  height,
  ...restProps
}) => {
  const canvasRef = useRef(null);
  const skyconsRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) {
      return undefined;
    }

    const skycons = new Skycons({ color });
    skyconsRef.current = skycons;
    skycons.add(canvasRef.current, Skycons[icon]);

    if (autoPlay) {
      skycons.play();
    } else {
      skycons.pause();
    }

    return () => {
      if (canvasRef.current) {
        skycons.remove(canvasRef.current);
      }
      skycons.pause();
    };
  }, [autoPlay, color, icon]);

  return (
    <canvas ref={canvasRef} width={width} height={height} {...restProps} />
  );
};

Skycon.propTypes = {
  color: PropTypes.string.isRequired,
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
  color: null,
  autoPlay: true,
  width: '100%',
  height: '100%',
};

export default Skycon;
