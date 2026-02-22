import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { NavLink, matchPath, useLocation } from 'react-router-dom';
import { Collapse, Badge } from 'reactstrap';
import classnames from 'classnames';

import s from './LinksGroup.module.scss';

const LinksGroup = (props) => {
  const location = useLocation();
  const [headerLinkWasClicked, setHeaderLinkWasClicked] = useState(true);

  const togglePanelCollapse = (link, event) => {
    props.onActiveSidebarItemChange(link);
    setHeaderLinkWasClicked((prevState) => (
      !prevState || (props.activeItem && !props.activeItem.includes(props.index))
    ));
    event.preventDefault();
  };

  const renderSingleLink = (exact) => {
    if (props.isHeader) {
      return (
        <li className={[s.headerLink, props.className].join(' ')}>
          <NavLink
            to={props.link}
            className={({ isActive }) => classnames({ [s.headerLinkActive]: isActive })}
            end={exact}
            target={props.target}
          >
            <span className={s.icon}>
              {props.iconName}
            </span>
            {props.header}
            {' '}
            {props.label && (
              <sup className={`${s.headerLabel} text-${props.labelColor || 'warning'}`}>
                {props.label}
              </sup>
            )}
            {props.badge && <Badge className={s.badge} color="danger" pill>9</Badge>}
          </NavLink>
        </li>
      );
    }

    return (
      <li>
        <NavLink
          to={props.link}
          className={({ isActive }) => classnames({ [s.headerLinkActive]: isActive })}
          style={{ paddingLeft: `${40 + (10 * (props.deep - 1))}px` }}
          onClick={(event) => {
            if (props.link.includes('menu')) {
              event.preventDefault();
            }
          }}
          end={exact}
        >
          {props.header}
          {' '}
          {props.label && (
            <sup className={`${s.headerLabel} text-${props.labelColor || 'warning'}`}>
              {props.label}
            </sup>
          )}
        </NavLink>
      </li>
    );
  };

  const isOpen = props.activeItem
    && props.activeItem.includes(props.index)
    && headerLinkWasClicked;
  const exact = props.exact !== false;

  if (!props.childrenLinks) {
    return renderSingleLink(exact);
  }

  const linkMatch = matchPath(
    { path: props.link, end: false },
    location.pathname,
  );

  return (
    <li className={classnames({ [s.headerLink]: props.isHeader }, props.className)}>
      <a
        className={classnames(
          s.accordionToggle,
          { [s.headerLinkActive]: !!linkMatch },
          { [s.collapsed]: isOpen },
          'd-flex',
        )}
        style={{ paddingLeft: `${props.deep === 0 ? 10 : 35 + 10 * (props.deep - 1)}px` }}
        onClick={(event) => togglePanelCollapse(props.link, event)}
        href="#"
      >
        {props.isHeader ? (
          <span className={s.icon}>
            {props.iconName}
          </span>
        ) : null}
        {props.header}
        {' '}
        {props.label && (
          <sup className={`${s.headerLabel} text-${props.labelColor || 'warning'} ms-1`}>
            {props.label}
          </sup>
        )}
        <b className={['fa fa-angle-right', s.caret].join(' ')} />
      </a>
      <Collapse className={s.panel} isOpen={isOpen}>
        <ul>
          {props.childrenLinks.map((child, index) => (
            <div
              key={index.toString()}
              onClick={child.action ? props.action : null}
            >
              <LinksGroup
                doLogout={props.doLogout}
                onActiveSidebarItemChange={props.onActiveSidebarItemChange}
                activeItem={props.activeItem}
                header={child.header}
                link={child.link}
                index={child.index}
                childrenLinks={child.childrenLinks}
                deep={props.deep + 1}
              />
            </div>
          ))}
        </ul>
      </Collapse>
    </li>
  );
};

LinksGroup.propTypes = {
  header: PropTypes.node.isRequired,
  link: PropTypes.string.isRequired,
  childrenLinks: PropTypes.array,
  iconName: PropTypes.object,
  className: PropTypes.string,
  badge: PropTypes.string,
  label: PropTypes.string,
  activeItem: PropTypes.string,
  isHeader: PropTypes.bool,
  index: PropTypes.string,
  deep: PropTypes.number,
  onActiveSidebarItemChange: PropTypes.func,
  labelColor: PropTypes.string,
  exact: PropTypes.bool,
  action: PropTypes.func,
  CustomClickEvent: PropTypes.func,
  target: PropTypes.string,
};

LinksGroup.defaultProps = {
  link: '',
  childrenLinks: null,
  header: '',
  className: '',
  isHeader: false,
  deep: 0,
  activeItem: '',
  label: '',
  exact: true,
  target: undefined,
  badge: undefined,
  labelColor: undefined,
  onActiveSidebarItemChange: () => {},
  action: undefined,
  CustomClickEvent: undefined,
  index: undefined,
};

export default LinksGroup;
