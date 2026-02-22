import React from 'react';
import PropTypes from 'prop-types';
import s from './ColorPicker.module.scss';

const CustomColorPicker = ({ colors, activeColor, updateColor, customizationItem }) => {
  if (customizationItem === 'navbar') {
    return (
      <div>
        <ul className={s.colorsList}>
          {Object.entries(colors).map((color) => (
            <li
              key={color[1]}
              className={`${s.colorBox} ${(activeColor === color[1]) ? s.active : ''}`}
              style={{ background: color[1] }}
              onClick={() => updateColor(color[1])}
            />
          ))}
        </ul>
      </div>
    );
  }

  return (
    <div>
      <ul className={s.colorsList}>
        {Object.entries(colors).map((color) => (
          <li
            key={color[1]}
            className={`${s.colorBox} ${(activeColor === color[0]) ? s.active : ''}`}
            style={{ background: color[1] }}
            onClick={() => updateColor(color[0])}
          />
        ))}
      </ul>
    </div>
  );
};

CustomColorPicker.propTypes = {
  colors: PropTypes.object,
  activeColor: PropTypes.string,
  updateColor: PropTypes.func,
  customizationItem: PropTypes.string,
};

export default CustomColorPicker
