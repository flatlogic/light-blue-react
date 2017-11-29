import { connect } from 'react-redux';
import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import {
  Navbar,
  Nav,
  NavItem,
  NavLink,
  InputGroupAddon,
  InputGroup,
  Input,
  UncontrolledAlert,
  NavDropdown,
  NavbarBrand,
  Collapse,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Badge,
  ButtonGroup,
  Button,
} from 'reactstrap';
import { logoutUser } from '../../actions/user';
import { toggleVisibilitySidebar, positionSidebar, toggleSidebar } from '../../actions/navigation';

import sender1 from '../../images/1.png';
import sender2 from '../../images/2.png';
import sender3 from '../../images/3.png';

import s from './Header.scss';

class Header extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    sidebarState: PropTypes.string.isRequired,
    sidebarPosition: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);

    this.doLogout = this.doLogout.bind(this);
    this.onDismiss = this.onDismiss.bind(this);
    this.toggleMessagesDropdown = this.toggleMessagesDropdown.bind(this);
    this.toggleSupportDropdown = this.toggleSupportDropdown.bind(this);
    this.toggleSettingsDropdown = this.toggleSettingsDropdown.bind(this);
    this.toggleAccountDropdown = this.toggleAccountDropdown.bind(this);
    this.moveSidebar = this.moveSidebar.bind(this);
    this.toggleVisibilitySidebar = this.toggleVisibilitySidebar.bind(this);
    this.toggleSidebar = this.toggleSidebar.bind(this);
    this.toggleSearchOpen = this.toggleSearchOpen.bind(this);

    this.state = {
      visible: true,
      messagesOpen: false,
      supportOpen: false,
      settingsOpen: false,
      searchFocused: false,
      searchOpen: false,
    };
  }

  onDismiss() {
    this.setState({ visible: false });
  }

  doLogout() {
    this.props
      .dispatch(logoutUser());
  }

  toggleMessagesDropdown() {
    this.setState({
      messagesOpen: !this.state.messagesOpen,
    });
  }

  toggleSupportDropdown() {
    this.setState({
      supportOpen: !this.state.supportOpen,
    });
  }

  toggleSettingsDropdown() {
    this.setState({
      settingsOpen: !this.state.settingsOpen,
    });
  }

  toggleAccountDropdown() {
    this.setState({
      accountOpen: !this.state.accountOpen,
    });
  }

  toggleSearchOpen() {
    this.setState({
      searchOpen: !this.state.searchOpen,
    });
  }

  toggleVisibilitySidebar(state) {
    this.props.dispatch(toggleVisibilitySidebar(state));
  }

  moveSidebar(position) {
    this.props.dispatch(positionSidebar(position));
  }

  toggleSidebar() {
    this.props.dispatch(toggleSidebar());
  }

  render() {
    return (
      <Navbar className="d-print-none">
        <NavbarBrand className={`${s.logo} ${this.props.sidebarState === 'hide' ? `${s.logoHidden}` : ''}`} href="/">
          Light <strong>Blue</strong>
        </NavbarBrand>
        <UncontrolledAlert className={`${s.alert} d-md-none-down ml-auto mr-3`}>
          <i className="fa fa-info-circle mr-1" /> Check out Light Blue <a href="#" onClick={() => this.setState({ settingsOpen: true })}>settings</a> on
          the right!
        </UncontrolledAlert>
        <Collapse className={`${s.searchCollapse} ml-auto ml-lg-0 mr-md-3`} isOpen={this.state.searchOpen}>
          <InputGroup className={`${s.navbarForm} ${this.state.searchFocused ? s.navbarFormFocused : ''}`}>
            <InputGroupAddon className={s.inputAddon}><i className="fa fa-search" /></InputGroupAddon>
            <Input
              id="search-input" placeholder="Search..." className="input-transparent"
              onFocus={() => this.setState({ searchFocused: true })}
              onBlur={() => this.setState({ searchFocused: false })}
            />
          </InputGroup>
        </Collapse>
        <Nav className="ml-auto ml-md-0">
          <NavItem className="d-md-none">
            <NavLink onClick={this.toggleSearchOpen} className={s.navItem} href="#">
              <i className="glyphicon glyphicon-search" />
            </NavLink>
          </NavItem>
          <NavDropdown isOpen={this.state.messagesOpen} toggle={this.toggleMessagesDropdown}>
            <DropdownToggle nav className={s.navItem}>
              <i className="glyphicon glyphicon-comments" />
            </DropdownToggle>
            <DropdownMenu className={`${s.dropdownMenu} ${s.messages}`}>
              <DropdownItem>
                <img className={s.image} src={sender1} alt="" />
                <div className={s.details}>
                  <div>Jane Hew</div>
                  <div className={s.text}>
                    Hey, John! How is it going? ...
                  </div>
                </div>
              </DropdownItem>
              <DropdownItem>
                <img className={s.image} src={sender2} alt="" />
                <div className={s.details}>
                  <div>Alies Rumiancaŭ</div>
                  <div className={s.text}>
                    I will definitely buy this template
                  </div>
                </div>
              </DropdownItem>
              <DropdownItem>
                <img className={s.image} src={sender3} alt="" />
                <div className={s.details}>
                  <div>Michał Rumiancaŭ</div>
                  <div className={s.text}>
                    Is it really Lore ipsum? Lore ...
                  </div>
                </div>
              </DropdownItem>
              <DropdownItem>
                <a>
                  See all messages <i className="fa fa-arrow-right" />
                </a>
              </DropdownItem>
            </DropdownMenu>
          </NavDropdown>
          <NavDropdown isOpen={this.state.supportOpen} toggle={this.toggleSupportDropdown}>
            <DropdownToggle nav className={s.navItem}>
              <i className="glyphicon glyphicon-globe" />
              <span className={s.count}>8</span>
            </DropdownToggle>
            <DropdownMenu right className={`${s.dropdownMenu} ${s.support}`}>
              <DropdownItem>
                <Badge color="danger"><i className="fa fa-bell-o" /></Badge>
                <div className={s.details}>
                  Check out this awesome ticket
                </div>
              </DropdownItem>
              <DropdownItem>
                <Badge color="warning"><i className="fa fa-question-circle" /></Badge>
                <div className={s.details}>
                  What is the best way to get ...
                </div>
              </DropdownItem>
              <DropdownItem>
                <Badge color="success"><i className="fa fa-info-circle" /></Badge>
                <div className={s.details}>
                  This is just a simple notification
                </div>
              </DropdownItem>
              <DropdownItem>
                <Badge color="info"><i className="fa fa-plus" /></Badge>
                <div className={s.details}>
                  12 new orders has arrived today
                </div>
              </DropdownItem>
              <DropdownItem>
                <Badge color="danger"><i className="fa fa-tag" /></Badge>
                <div className={s.details}>
                  One more thing that just happened
                </div>
              </DropdownItem>
              <DropdownItem>
                <a>
                  See all tickets <i className="fa fa-arrow-right" />
                </a>
              </DropdownItem>
            </DropdownMenu>
          </NavDropdown>
          <NavItem className={s.divider} />
          <NavDropdown isOpen={this.state.settingsOpen} toggle={this.toggleSettingsDropdown} className="d-sm-none-down">
            <DropdownToggle nav className={s.navItem}>
              <i className="glyphicon glyphicon-cog" />
            </DropdownToggle>
            <DropdownMenu className={`${s.dropdownMenu} ${s.settings}`}>
              <h6>Sidebar on the</h6>
              <ButtonGroup size="sm">
                <Button onClick={() => this.moveSidebar('left')} className={this.props.sidebarPosition === 'left' ? 'active' : ''}>Left</Button>
                <Button onClick={() => this.moveSidebar('right')} className={this.props.sidebarPosition === 'right' ? 'active' : ''}>Right</Button>
              </ButtonGroup>
              <h6 className="mt-2">Sidebar</h6>
              <ButtonGroup size="sm">
                <Button onClick={() => this.toggleVisibilitySidebar('show')} className={this.props.sidebarState === 'show' ? 'active' : ''}>Show</Button>
                <Button onClick={() => this.toggleVisibilitySidebar('hide')} className={this.props.sidebarState === 'hide' ? 'active' : ''}>Hide</Button>
              </ButtonGroup>
            </DropdownMenu>
          </NavDropdown>
          <NavDropdown isOpen={this.state.accountOpen} toggle={this.toggleAccountDropdown} className="d-sm-none-down">
            <DropdownToggle nav className={s.navItem}>
              <i className="glyphicon glyphicon-user" />
            </DropdownToggle>
            <DropdownMenu right className={`${s.dropdownMenu} ${s.account}`}>
              <section>
                <img src={sender2} alt="" className={s.imageAccount} />
                Philip Daineka
              </section>
              <DropdownItem>
                <NavLink href="/profile">
                  <i className="fa fa-user fa-fw" />
                  Profile
                </NavLink>
              </DropdownItem>
              <DropdownItem>
                <NavLink href="/calendar">
                  <i className="fa fa-calendar fa-fw" />
                  Calendar
                </NavLink>
              </DropdownItem>
              <DropdownItem>
                <NavLink href="/inbox">
                  <i className="fa fa-inbox fa-fw" />
                  Inbox
                </NavLink>
              </DropdownItem>
            </DropdownMenu>
          </NavDropdown>
          <NavItem className="d-sm-none-down">
            <NavLink onClick={this.doLogout} className={s.navItem} href="#">
              <i className="glyphicon glyphicon-off" />
            </NavLink>
          </NavItem>
          <NavItem className="d-md-none">
            <NavLink onClick={this.toggleSidebar} className={s.navItem} href="#">
              <i className="fa fa-bars" />
            </NavLink>
          </NavItem>
        </Nav>
      </Navbar>
    );
  }
}

function mapStateToProps(store) {
  return {
    sidebarState: store.navigation.sidebarState,
    sidebarPosition: store.navigation.sidebarPosition,
  };
}

export default withRouter(connect(mapStateToProps)(withStyles(s)(Header)));

