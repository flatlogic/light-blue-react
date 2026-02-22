import React, { useState } from 'react';
import cx from 'classnames';
import { Button } from 'reactstrap';
import { useDispatch } from 'react-redux';
import {
  changeThemeColor
} from '../../actions/layout';
import CustomColorPicker from '../ColorPicker';
import config from '../../config';

import Widget from '../Widget';

import s from './Helper.module.scss'; // eslint-disable-line

const Helper = () => {
  const dispatch = useDispatch();
  const [isOpened, setIsOpened] = useState(false);
  const themeColor = localStorage.getItem("themeColor");

  const toggle = () => {
    setIsOpened((prevState) => !prevState);
  };

  const updateColor = (value) => {
    localStorage.setItem("themeColor", value);
    dispatch(changeThemeColor(value));
  };

  return (
    <div className={cx(s.themeHelper, { [s.themeHelperOpened]: isOpened })}>
      <div className={`${s.themeHelperBtn} bg-primary helper-button`} onClick={toggle}>
        <div className={cx(s.themeHelperSpinner, 'text-white')}>
          <i className="la la-cog" />
          <i className="la la-cog" />
        </div>
      </div>
      <Widget
        className={s.themeHelperContent}
      >
        <div className={s.helperHeader}>
          <h5 className="m-0">Theme</h5>
        </div>

        <div className="theme-settings">
          <h5 className="mt-4 navbar-color-picker">Theme Color</h5>
          <CustomColorPicker
            colors={config.app.colors}
            activeColor={themeColor}
            updateColor={updateColor}
            customizationItem={"navbar"}
          />
        </div>
        <div className="d-grid mt-5">
          <Button
            href="https://flatlogic.com/templates/light-blue-react"
            target="_blank"
            className="btn-rounded-f btn-block fs-mini purchase-button"
            color="info"
          >
            <span className="text-white">Purchase</span>
          </Button>
          <Button
            href="https://demo.flatlogic.com/light-blue-react/#/documentation/getting-started/overview"
            target="_blank"
            className="btn-rounded-f btn-block fs-mini text-white mt-4"
            color="primary"
          >
            Documentation
          </Button>
        </div>
        <div className="d-flex justify-content-between mt-4">
          <Button
            href="https://flatlogic.com/forum"
            target="_blank"
            className="btn-default btn-rounded-f fs-mini text-white px-2"
          >
            <i className="glyphicon glyphicon-headphones me-1" />
            Support
          </Button>
          <Button
            href="https://github.com/flatlogic/light-blue-react-template"
            target="_blank"
            className="btn-default btn-rounded-f fs-mini text-white px-2"
          >
            <i className="fa fa-github me-1" />
            Github
          </Button>
        </div>
        <div className="mt-lg d-flex flex-column align-items-center theme-helper__sharing">
          <span className="fs-sm">
            Thank you for sharing!
          </span>
          <div className="d-flex justify-content-center text-light mt-2">
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://twitter.com/intent/tweet?text=Amazing%20dashboard%20built%20with%20NodeJS,%20React%20and%20Bootstrap!&url=https://github.com/flatlogic/react-dashboard&via=flatlogic"
            >
              <i className="fa fa-twitter pe-1" />
            </a>
            <a
              href="https://www.facebook.com/search/top/?q=flatlogic%20llc"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fa fa-facebook pl-1" />
            </a>
          </div>
        </div>
      </Widget>
    </div>
  );
};

export default Helper;
