import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { NavLink } from 'react-router-dom';
import { Route } from 'react-router';

import s from './LinksGroup.scss';

class LinksGroup extends Component {
  /* eslint-disable */
  static propTypes = {
    header: PropTypes.node.isRequired,
    headerLink: PropTypes.string,
    childrenLinks: PropTypes.array,
    iconName: PropTypes.string.isRequired,
    className: PropTypes.string,
    badge: PropTypes.string,
  };
  /* eslint-enable */

  static defaultProps = {
    headerLink: null,
    childrenLinks: null,
    className: '',
  };

  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
    };
  }

  render() {
    if (!this.props.childrenLinks) {
      return (
        <li className={[s.headerLink, this.props.className].join(' ')}>
          <NavLink to={this.props.headerLink} activeClassName={s.headerLinkActive} exact>
            <span className={s.icon}>
              <i className={`fa ${this.props.iconName}`} />
            </span>
            {this.props.header}
          </NavLink>
        </li>
      );
    }
    /* eslint-disable */
    return (
      <Route
        path={this.props.headerLink}
        children={({ match }) => {
          const expanded = !!match || this.state.isOpen;
          return (
            <li className={[s.headerLink, this.props.className].join(' ')}>
              <a
                className={match ? s.headerLinkActive : ''}
                onClick={() => this.setState({ isOpen: !this.state.isOpen })}
              >
                <i className={`glyphicon ${this.props.iconName}`} />
                {this.props.header}
              </a>
            </li>
          );
        }}
      />
    );
  }

}

export default withStyles(s)(LinksGroup);
