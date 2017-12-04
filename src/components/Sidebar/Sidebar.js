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

  componentDidMount() {
    this.element.addEventListener('transitionend', () => {
      if (this.props.sidebarOpen) {
        this.element.classList.add(s.sidebarOpen);
      } else {
        this.element.classList.remove(s.sidebarOpen);
      }
    }, false);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.sidebarOpen !== this.props.sidebarOpen) {
      if (nextProps.sidebarOpen) {
        this.element.style.height = `${this.element.scrollHeight}px`;
      } else {
        this.element.style.height = `${this.element.scrollHeight}px`;
        this.element.classList.remove(s.sidebarOpen);
        setTimeout(() => {
          this.element.style.height = '';
        }, 0);
      }
    }
  }

  dismissAlert(id) {
    this.props.dispatch(dismissAlert(id));
  }

  render() {
    return (
      /* eslint-disable */
      <div className={s.root}>
        <nav className={`${s.sidebar} sidebar`}
             ref={(nav) => { this.element = nav; }}
        >
          <ul className={s.nav}>
            <LinksGroup header="Dashboard" headerLink="/app" iconName="fa-home" />
            <LinksGroup header={<span>LB Package <sup className="text-warning fw-bold">4.0</sup></span>} headerLink="/app/package" iconName="fa-database" />
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
                  name: 'Article', link: '/app/forms/article',
                },
                {
                  name: 'Elements', link: '/app/forms/elements',
                },
                {
                  name: 'Validation', link: '/app/forms/validation',
                },
                {
                  name: 'Wizard', link: '/app/forms/wizard',
                },
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
                },
                {
                  name: 'Charts', link: '/app/statistics/charts',
                },
                {
                  name: 'Realtime', link: '/app/statistics/realtime'
                }
              ]}
            />
            <LinksGroup
              onActiveSidebarItemChange={() => this.props.dispatch(changeActiveSidebarItem('/app/ui'))}
              isActive={this.props.activeItem === '/app/ui'}
              header="User Interface"
              iconName="fa-magic"
              headerLink="/app/ui"
              childrenLinks={[
                {
                  name: 'Buttons', link: '/app/ui/buttons',
                },
                {
                  name: 'Dialogs', link: '/app/ui/dialogs',
                },
                {
                  name: 'Notifications', link: '/app/ui/notifications',
                },
                {
                  name: 'Icons', link: '/app/ui/icons',
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
              onActiveSidebarItemChange={() => this.props.dispatch(changeActiveSidebarItem('/app/components'))}
              isActive={this.props.activeItem === '/app/components'}
              header="Components"
              iconName="fa-tree"
              headerLink="/app/components"
              childrenLinks={[
                {
                  name: 'Calendar', link: '/app/components/calendar',
                },
                {
                  name: 'Maps', link: '/app/components/maps',
                },
                {
                  name: 'Gallery', link: '/app/components/gallery',
                },
                {
                  name: 'Fileuploader', link: '/app/components/fileupload',
                },
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
                },
                {
                  name: 'Dynamic', link: '/app/tables/dynamic',
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
                },
                {
                  name: 'Live', link: '/app/widgets/live',
                }
              ]}
            />
            <LinksGroup
              onActiveSidebarItemChange={() => this.props.dispatch(changeActiveSidebarItem('/app/special'))}
              isActive={this.props.activeItem === '/app/special'}
              header="Special"
              iconName="fa-leaf"
              headerLink="/app/special"
              childrenLinks={[
                {
                  name: <span>Search <sup className="text-warning fw-bold">new</sup></span>, link: '/app/special/search',
                },
                {
                  name: 'Invoice', link: '/app/special/invoice',
                },
                {
                  name: <span>Inbox &nbsp; <span className="badge badge-danger">3</span></span>, link: '/app/special/inbox',
                },
                {
                  name: 'Error Page', link: '/error',
                },
              ]}
            />
          </ul>
          <h6 className={s.navTitle}>
            Labels
            <a className={s.actionLink}>
              <i className={`${s.glyphiconSm} glyphicon glyphicon-plus float-right`} />
            </a>
          </h6>
          <ul className={`${s.sidebarLabels} text-list`}>
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
      </div>
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
