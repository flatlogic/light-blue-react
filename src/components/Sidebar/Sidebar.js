import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { Progress, Alert, NavItem, NavLink } from 'reactstrap';
import { withRouter } from 'react-router-dom';

import s from './Sidebar.scss';
import LinksGroup from './LinksGroup/LinksGroup';
import { dismissAlert } from '../../actions/alerts';

class Sidebar extends React.Component {

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    openSidebar: PropTypes.bool.isRequired,
  };

  dismissAlert(id) {
    this.props.dispatch(dismissAlert(id));
  }

  render() {
    return (
      /* eslint-disable */
      <nav className={[s.root, 'sidebar', this.props.openSidebar ? s.show : ''].join(' ')}>
        <ul className={s.nav}>
          <LinksGroup header="Dashboard" headerLink="/app" iconName="fa-home" />
          <LinksGroup header="Another Page" headerLink="/app/another" iconName="fa-tree" />
        </ul>
        <h5 className={s.navTitle}>
          Labels
          <a className={s.actionLink}>
            <i className={`${s.glyphiconSm} glyphicon glyphicon-plus float-right`} />
          </a>
        </h5>
        <ul className={s.sidebarLabels}>
          <NavItem>
            <NavLink>
              <i className="fa fa-circle text-warning" />
              <span className={s.labelName}>My Recent</span>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink>
              <i className="fa fa-circle text-gray" />
              <span className={s.labelName}>Starred</span>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink>
              <i className="fa fa-circle text-danger" />
              <span className={s.labelName}>Background</span>
            </NavLink>
          </NavItem>
        </ul>
        <h5 className={s.navTitle}>
          Projects
        </h5>
        <div className={s.sidebarAlerts}>
          {this.props.alertsList.map(alert => // eslint-disable-line
            <Alert
              key={alert.id}
              className={s.sidebarAlert} color="transparent"
              isOpen={true} // eslint-disable-line
              toggle={() => {
                this.dismissAlert(alert.id);
              }}
            >
              <span className="text-white fw-semi-bold">{alert.title}</span><br />
              <Progress className={`${s.sidebarProgress} progress-xs mt-1`} color={alert.color} value={alert.value} />
              <small>{alert.footer}</small>
            </Alert>,
          )}
        </div>
      </nav>
    );
  }
}


function mapStateToProps(store) {
  return {
    alertsList: store.alerts.alertsList,
  };
}

export default withRouter(connect(mapStateToProps)(withStyles(s)(Sidebar)));
