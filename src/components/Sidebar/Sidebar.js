import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { Progress, Alert, NavItem, NavLink } from 'reactstrap';
import { withRouter } from 'react-router-dom';

import s from './Sidebar.scss';
import LinksGroup from './LinksGroup/LinksGroup';
import { dismissAlert } from '../../actions/alerts';
import { changeActiveSidebarItem } from '../../actions/navigation';

class Sidebar extends React.Component {

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    sidebarOpen: PropTypes.bool.isRequired,
  };

  dismissAlert(id) {
    this.props.dispatch(dismissAlert(id));
  }

  render() {
    return (
      /* eslint-disable */
      <nav className={[s.root, this.props.sidebarOpen ? s.sidebarOpen : '','sidebar'].join(' ')}
           ref="element"
           style={{height: this.props.sidebarOpen ? `${this.refs.element.scrollHeight}px` : 0}}>
        <ul className={s.nav}>
          <LinksGroup header="Dashboard" headerLink="/app" iconName="fa-home" />
          <LinksGroup
            onActiveSidebarItemChange={() => this.props.dispatch(changeActiveSidebarItem('/app/ui'))}
            isActive={this.props.activeItem === '/app/ui'}
            header="User Interface"
            iconName="fa-magic"
            headerLink="/app/ui"
            childrenLinks={[
              {
                name: 'Icons', link: '/app/ui/icons',
              },
              {
                name: 'Buttons', link: '/app/ui/buttons',
              },
              {
                name: 'Dialogs', link: '/app/ui/dialogs',
              },
              {
                name: 'Tabs', link: '/app/ui/tabs',
              },
              {
                name: 'Accordion', link: '/app/ui/accordion',
              }
            ]}
          />
          <LinksGroup
            onActiveSidebarItemChange={() => this.props.dispatch(changeActiveSidebarItem('/app/forms'))}
            isActive={this.props.activeItem === '/app/forms'}
            header="Forms"
            iconName="fa-pencil"
            headerLink="/app/forms"
            childrenLinks={[
              {
                name: 'Account', link: '/app/forms/account',
              },
              {
                name: 'Elements', link: '/app/forms/elements',
              }
            ]}
          />
          <LinksGroup
            onActiveSidebarItemChange={() => this.props.dispatch(changeActiveSidebarItem('/app/statistics'))}
            isActive={this.props.activeItem === '/app/statistics'}
            header="Statistics"
            iconName="fa-area-chart"
            headerLink="/app/statistics"
            childrenLinks={[
              {
                name: 'Stats', link: '/app/statistics/stats',
              }
            ]}
          />
          <LinksGroup
            onActiveSidebarItemChange={() => this.props.dispatch(changeActiveSidebarItem('/app/tables'))}
            isActive={this.props.activeItem === '/app/tables'}
            header="Tables"
            iconName="fa-cog"
            headerLink="/app/tables"
            childrenLinks={[
              {
                name: 'Static', link: '/app/tables/static',
              }
            ]}
          />
          <LinksGroup
            onActiveSidebarItemChange={() => this.props.dispatch(changeActiveSidebarItem('/app/widgets'))}
            isActive={this.props.activeItem === '/app/widgets'}
            header="Widgets"
            iconName="fa-th"
            headerLink="/app/widgets"
            childrenLinks={[
              {
                name: 'Basic', link: '/app/widgets/basic',
              }
            ]}
          />
        </ul>
        <h6 className={s.navTitle}>
          Labels
          <a className={s.actionLink}>
            <i className={`${s.glyphiconSm} glyphicon glyphicon-plus float-right`} />
          </a>
        </h6>
        <ul className={s.sidebarLabels}>
          <NavItem>
            <NavLink href="#">
              <i className="fa fa-circle text-warning" />
              <span className={s.labelName}>My Recent</span>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="#">
              <i className="fa fa-circle text-gray" />
              <span className={s.labelName}>Starred</span>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="#">
              <i className="fa fa-circle text-danger" />
              <span className={s.labelName}>Background</span>
            </NavLink>
          </NavItem>
        </ul>
        <h6 className={s.navTitle}>
          Projects
        </h6>
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
    sidebarOpen: store.navigation.sidebarOpen,
    activeItem: store.navigation.activeItem,
  };
}

export default withRouter(connect(mapStateToProps)(withStyles(s)(Sidebar)));
