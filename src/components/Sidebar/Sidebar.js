import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Progress, Alert } from 'reactstrap';
import { withRouter } from 'react-router-dom';
import { dismissAlert } from '../../actions/alerts';
import s from './Sidebar.module.scss';
import LinksGroup from './LinksGroup';

import DashboardIcon from '../Icons/SidebarIcons/DashboardIcon';
import UserIcon from '../Icons/SidebarIcons/UserIcon';
import EcommerceIcon from '../Icons/SidebarIcons/EcommerceIcon';
import LBPackageIcon from '../Icons/SidebarIcons/LBPackageIcon';
import EmailIcon from '../Icons/SidebarIcons/EmailIcon';
import DocumentationIcon from '../Icons/SidebarIcons/DocumentationIcon';
import CoreIcon from '../Icons/SidebarIcons/CoreIcon';
import UIElementsIcon from '../Icons/SidebarIcons/UIElementsIcon';
import GridIcon from '../Icons/SidebarIcons/GridIcon';
import FormsIcon from '../Icons/SidebarIcons/FormsIcon';
import ChartsIcon from '../Icons/SidebarIcons/ChartsIcon';
import TablesIcon from '../Icons/SidebarIcons/TablesIcon';
import MapsIcon from '../Icons/SidebarIcons/MapsIcon';
import ExtraIcon from '../Icons/SidebarIcons/ExtraIcon';
import MenuIcon from '../Icons/SidebarIcons/MenuIcon';

import { changeActiveSidebarItem } from '../../actions/navigation';
import { logoutUser } from '../../actions/auth';

class Sidebar extends React.Component {
  static propTypes = {
    sidebarStatic: PropTypes.bool,
    sidebarOpened: PropTypes.bool,
    dispatch: PropTypes.func.isRequired,
    activeItem: PropTypes.string,
    location: PropTypes.shape({
      pathname: PropTypes.string,
    }).isRequired,
  };

  static defaultProps = {
    sidebarStatic: false,
    activeItem: '',
  };

  constructor(props) {
    super(props);

    this.doLogout = this.doLogout.bind(this);
  }

  componentDidMount() {
    this.element.addEventListener('transitionend', () => {
      if (this.props.sidebarOpened) {
        this.element.classList.add(s.sidebarOpen);
      }
    }, false);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.sidebarOpened !== this.props.sidebarOpened) {
      if (nextProps.sidebarOpened) {
        this.element.style.height = `${this.element.scrollHeight}px`;
      } else {
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

  doLogout() {
    this.props.dispatch(logoutUser());
  }

  render() {
    return (
      <nav
        className={cx(s.root)}
        ref={(nav) => { this.element = nav; }}
      >
        <header className={s.logo}>
          <a href="https://demo.flatlogic.com/light-blue-react/">Light <span className="fw-bold">Blue</span></a>
        </header>
        <ul className={s.nav}>
          <h5 className={[s.navTitle, s.groupTitle].join(' ')}>APP</h5>
          <LinksGroup
            onActiveSidebarItemChange={activeItem => this.props.dispatch(changeActiveSidebarItem(activeItem))}
            activeItem={this.props.activeItem}
            header="Dashboard"
            isHeader
            iconName={<DashboardIcon className={s.menuIcon}/>}
            link="/app/main"
            index="main"
            childrenLinks={[
              {
                header: 'Analytics', link: '/app/main/analytics',
              },
              {
                header: 'Visits', link: '/app/main/dashboard',
              },
              {
                header: 'Widgets', link: '/app/main/widgets',
              },
            ]}
          />
          <LinksGroup
            onActiveSidebarItemChange={activeItem => this.props.dispatch(changeActiveSidebarItem(activeItem))}
            activeItem={this.props.activeItem}
            header="Users"
            isHeader
            labelColor="primary"
            iconName={<UserIcon className={s.menuIcon} />}
            link="/admin"
            index="admin"
            label="Real App"
            exact={false}
            childrenLinks={[
                {
                  header: 'User Management', link: '/admin/users',
                },
                {
                  header: 'My Profile', link: '/app/profile',
                },
                {
                    header: 'Edit Profile', link: '/app/edit_profile',
                },
                {
                    header: 'Change Password', link: '/app/password',
                },
              ]}
            />
            <LinksGroup
                onActiveSidebarItemChange={activeItem => this.props.dispatch(changeActiveSidebarItem(activeItem))}
                activeItem={this.props.activeItem}
                header="E-commerce"
                isHeader
                iconName={<EcommerceIcon className={s.menuIcon}/>}
                link="/app/ecommerce"
                index="ecommerce"
                // label="NodeJS/.NET"
                labelColor="danger"
                exact={false}
                childrenLinks={[
                    {
                        header: 'Product Management', link: '/app/ecommerce/management',
                    },
                    {
                        header: 'Products Grid', link: '/app/ecommerce/products',
                    },
                    {
                        header: 'Product Page', link: '/app/ecommerce/product',
                    },
                ]}
            />
          <LinksGroup
            onActiveSidebarItemChange={activeItem => this.props.dispatch(changeActiveSidebarItem(activeItem))}
            activeItem={this.props.activeItem}
            header="LB Package"
            link="/app/package"
            isHeader
            iconName={<LBPackageIcon className={s.menuIcon}/>}
            index="packages"
          />
          <LinksGroup
            onActiveSidebarItemChange={activeItem => this.props.dispatch(changeActiveSidebarItem(activeItem))}
            activeItem={this.props.activeItem}
            header="Email"
            link="/app/inbox"
            isHeader
            iconName={<EmailIcon className={s.menuIcon}/>}
            index="inbox"
            badge="9"
          />
          <LinksGroup
            onActiveSidebarItemChange={activeItem => this.props.dispatch(changeActiveSidebarItem(activeItem))}
            activeItem={this.props.activeItem}
            header="Documentation"
            link="/documentation"
            isHeader
            iconName={<DocumentationIcon className={s.menuIcon}/>}
            index="documentation"
            label="new"
            target="_blank"
            labelColor="success"
          />
          <h5 className={[s.navTitle, s.groupTitle].join(' ')}>TEMPLATE</h5>
          <LinksGroup
            onActiveSidebarItemChange={activeItem => this.props.dispatch(changeActiveSidebarItem(activeItem))}
            activeItem={this.props.activeItem}
            header="Core"
            isHeader
            iconName={<CoreIcon className={s.menuIcon}/>}
            link="/app/core"
            index="core"
            childrenLinks={[
              {
                header: 'Typography', link: '/app/core/typography',
              },
              {
                header: 'Colors', link: '/app/core/colors',
              },
              {
                header: 'Grid', link: '/app/core/grid',
              },
            ]}
          />
          <LinksGroup
            onActiveSidebarItemChange={activeItem => this.props.dispatch(changeActiveSidebarItem(activeItem))}
            activeItem={this.props.activeItem}
            header="UI Elements"
            isHeader
            iconName={<UIElementsIcon className={s.menuIcon} />}
            link="/app/ui"
            index="ui"
            childrenLinks={[
              {
                header: 'Alerts', link: '/app/ui/alerts',
              },
              {
                header: 'Badge', link: '/app/ui/badge',
              },
              {
                header: 'Buttons', link: '/app/ui/buttons',
              },
              {
                header: 'Card', link: '/app/ui/card',
              },
              {
                header: 'Carousel', link: '/app/ui/carousel',
              },
              {
                header: 'Jumbotron', link: '/app/ui/jumbotron',
              },
              {
                header: 'Icons', link: '/app/ui/icons',
              },
              {
                header: 'List Groups', link: '/app/ui/list-groups',
              },
              {
                header: 'Modal', link: '/app/ui/modal',
              },
              {
                header: 'Nav', link: '/app/ui/nav',
              },
              {
                header: 'Navbar', link: '/app/ui/navbar',
              },
              {
                header: 'Notifications', link: '/app/ui/notifications',
              },
              {
                header: 'Pagination', link: '/app/tables/dynamic',
              },
              {
                header: 'Popovers & Tooltips', link: '/app/ui/popovers',
              },
              {
                header: 'Progress', link: '/app/ui/progress',
              },
              {
                header: 'Tabs & Accordion', link: '/app/ui/tabs-accordion',
              },
            ]}
          />
          <LinksGroup
            onActiveSidebarItemChange={activeItem => this.props.dispatch(changeActiveSidebarItem(activeItem))}
            activeItem={this.props.activeItem}
            header="Forms"
            isHeader
            iconName={<FormsIcon className={s.menuIcon} />}
            link="/app/forms"
            index="forms"
            childrenLinks={[
              {
                header: 'Forms Elements', link: '/app/forms/elements',
              },
              {
                header: 'Forms Validation', link: '/app/forms/validation',
              },
              {
                header: 'Forms Wizard', link: '/app/forms/wizard',
              },
            ]}
          />
          <LinksGroup
            onActiveSidebarItemChange={activeItem => this.props.dispatch(changeActiveSidebarItem(activeItem))}
            activeItem={this.props.activeItem}
            header="Charts"
            link="/app/charts"
            isHeader
            iconName={<ChartsIcon className={s.menuIcon} />}
            index="charts"
            childrenLinks={[
              {
                header: 'Charts Overview', link: '/app/charts/overview',
              },
              {
                header: 'Apex Charts', link: '/app/charts/apex',
              },
              {
                header: 'Echarts Charts', link: '/app/charts/echarts',
              },
              {
                header: 'Highcharts Charts', link: '/app/charts/highcharts',
              },
            ]}
          />
          <LinksGroup
            header="Grid"
            link="/app/grid"
            isHeader
            iconName={<GridIcon className={s.menuIcon} />}
          />
          <LinksGroup
            onActiveSidebarItemChange={t => this.props.dispatch(changeActiveSidebarItem(t))}
            activeItem={this.props.activeItem}
            header="Tables"
            isHeader
            iconName={<TablesIcon className={s.menuIcon} />}
            link="/app/tables"
            index="tables"
            childrenLinks={[
              {
                header: 'Tables Basic', link: '/app/tables/static',
              },
              {
                header: 'Tables Dynamic', link: '/app/tables/dynamic',
              },
            ]}
          />
          <LinksGroup
            onActiveSidebarItemChange={activeItem => this.props.dispatch(changeActiveSidebarItem(activeItem))}
            activeItem={this.props.activeItem}
            header="Maps"
            isHeader
            iconName={<MapsIcon className={s.menuIcon} />}
            link="/app/maps"
            index="maps"
            childrenLinks={[
              {
                header: 'Google Maps', link: '/app/maps/google',
              },
              {
                header: 'Vector Map', link: '/app/maps/vector',
              },
            ]}
          />
          <LinksGroup
            onActiveSidebarItemChange={activeItem => this.props.dispatch(changeActiveSidebarItem(activeItem))}
            activeItem={this.props.activeItem}
            header="Extra"
            isHeader
            iconName={<ExtraIcon className={s.menuIcon} />}
            link="/app/extra"
            index="extra"
            childrenLinks={[
              {
                header: 'Calendar', link: '/app/extra/calendar',
              },
              {
                header: 'Invoice', link: '/app/extra/invoice',
              },
              {
                header: 'Login Page', link: '/login', onClick: this.doLogout,
              },
              {
                header: 'Error Page', link: '/error',
              },
              {
                header: 'Gallery', link: '/app/extra/gallery',
              },
              {
                header: 'Search Result', link: '/app/extra/search',
              },
              {
                header: 'Time line', link: '/app/extra/timeline',
              },
            ]}
          />
          <LinksGroup
            onActiveSidebarItemChange={activeItem => this.props.dispatch(changeActiveSidebarItem(activeItem))}
            activeItem={this.props.activeItem}
            header="Menu Levels"
            isHeader
            iconName={<MenuIcon className={s.menuIcon} />}
            link="/app/menu"
            index="menu"
            childrenLinks={[
              {
                header: 'Level 1.1', link: '/app/menu/level1',
              },
              {
                header: 'Level 1.2',
                link: '/app/menu/level_12',
                index: 'level_12',
                childrenLinks: [
                  {
                    header: 'Level 2.1',
                    link: '/app/menu/level_12/level_21',
                    index: 'level_21',
                  },
                  {
                    header: 'Level 2.2',
                    link: '/app/menu/level_12/level_22',
                    index: 'level_22',
                    childrenLinks: [
                      {
                        header: 'Level 3.1',
                        link: '/app/menu/level_12/level_22/level_31',
                        index: 'level_31',
                      },
                      {
                        header: 'Level 3.2',
                        link: '/app/menu/level_12/level_22/level_32',
                        index: 'level_32 ',
                      },
                    ],
                  },
                  {
                    header: 'Level 2.3',
                    link: '/app/menu/level_12/level_23',
                    index: 'level_23',
                  },
                ],
              },
            ]}
          />
        </ul>
        <h5 className={[s.navTitle, s.groupTitle].join(' ')}>
          LABELS
          {/* eslint-disable-next-line */}
        </h5>
        {/* eslint-disable */}
        <ul className={s.sidebarLabels}>
          <li>
            <a href="#">
              <i className="fa fa-circle text-success mr-2" />
              <span className={s.labelName}>My Recent</span>
            </a>
          </li>
          <li>
            <a href="#">
              <i className="fa fa-circle text-primary mr-2" />
              <span className={s.labelName}>Starred</span>
            </a>
          </li>
          <li>
            <a href="#">
              <i className="fa fa-circle text-danger mr-2" />
              <span className={s.labelName}>Background</span>
            </a>
          </li>
        </ul>
        {/* eslint-enable */}
        <h5 className={[s.navTitle, s.groupTitle].join(' ')}>
          PROJECTS
        </h5>
        <div className={s.sidebarAlerts}>
          {this.props.alertsList.map(alert => // eslint-disable-line
            <Alert
              key={alert.id}
              className={s.sidebarAlert} color="transparent"
              isOpen={true} // eslint-disable-line
              toggle={() => { this.dismissAlert(alert.id); }}
            >
              <span>{alert.title}</span><br />
              <Progress className={`bg-subtle-blue progress-xs mt-1`} color={alert.color} value={alert.value} />
              <span className={s.alertFooter}>{alert.footer}</span>
            </Alert>,
          )}
        </div>
      </nav >
    );
  }
}

function mapStateToProps(store) {
  return {
    sidebarOpened: store.navigation.sidebarOpened,
    sidebarStatic: store.navigation.sidebarStatic,
    alertsList: store.alerts.alertsList,
    activeItem: store.navigation.activeItem,
  };
}

export default withRouter(connect(mapStateToProps)(Sidebar));
