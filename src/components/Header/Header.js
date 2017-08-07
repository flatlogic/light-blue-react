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
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Badge,
} from 'reactstrap';
import { logoutUser } from '../../actions/user';

import i1 from '../../images/1.png';
import i2 from '../../images/2.png';
import i3 from '../../images/3.png';

import s from './Header.scss';

class Header extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    togleSidebar: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.doLogout = this.doLogout.bind(this);
    this.onDismiss = this.onDismiss.bind(this);
    this.toggleMessagesDropdown = this.toggleMessagesDropdown.bind(this);
    this.toggleSupportDropdown = this.toggleSupportDropdown.bind(this);
    this.toggleSettingsDropdown = this.toggleSettingsDropdown.bind(this);
    this.toggleAccountDropdown = this.toggleAccountDropdown.bind(this);

    this.state = {
      visible: true,
      messagesOpen: false,
      supportOpen: false,
      settingsOpen: false,
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

  render() {
    return (
      <Navbar className={s.navbar}>
        <Nav>
          <UncontrolledAlert className={s.alert}>
            <i className="fa fa-info-circle mr-1" /> Check out Light Blue <a>settings</a> on
            the right!
          </UncontrolledAlert>
          <InputGroup size="sm" className={`${s.navbarForm} hidden-sm-down`}>
            <InputGroupAddon className={s.inputAddon}><i className="fa fa-search" /></InputGroupAddon>
            <Input id="search-input" placeholder="Search..." />
          </InputGroup>
          <Nav>
            <NavDropdown isOpen={this.state.messagesOpen} toggle={this.toggleMessagesDropdown}>
              <DropdownToggle nav>
                <i className={`${s.dropdownNavIcon} glyphicon glyphicon-comments`} />
              </DropdownToggle>
              <DropdownMenu className={s.dropdownMenu} right>
                <DropdownItem>
                  <img className={s.image} src={i1} alt="" />
                  <div className="details">
                    <div className="sender">Jane Hew</div>
                    <div className="text">
                      Hey, John! How is it going? ...
                    </div>
                  </div>
                </DropdownItem>
                <DropdownItem>
                  <img className={s.image} src={i2} alt="" />
                  <div className="details">
                    <div className="sender">Jane Hew</div>
                    <div className="text">
                      Hey, John! How is it going? ...
                    </div>
                  </div>
                </DropdownItem>
                <DropdownItem>
                  <img className={s.image} src={i3} alt="" />
                  <div className="details">
                    <div className="sender">Jane Hew</div>
                    <div className="text">
                      Hey, John! How is it going? ...
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
              <DropdownToggle nav>
                <i className={`${s.dropdownNavIcon} glyphicon glyphicon-globe`} />
              </DropdownToggle>
              <DropdownMenu right className={s.dropdownMenu}>
                <DropdownItem>
                  <div className="picture">
                    <Badge color="danger"><i className="fa fa-bell-o" /></Badge>
                  </div>
                  <div className="details">
                    Check out this awesome ticket
                  </div>
                </DropdownItem>
                <DropdownItem>
                  <div className="picture">
                    <Badge color="warning"><i className="fa fa-bell-o" /></Badge>
                  </div>
                  <div className="details">
                    What is the best way to get ...
                  </div>
                </DropdownItem>
                <DropdownItem>
                  <div className="picture">
                    <Badge color="success"><i className="fa fa-bell-o" /></Badge>
                  </div>
                  <div className="details">
                    This is just a simple notification
                  </div>
                </DropdownItem>
                <DropdownItem>
                  <div className="picture">
                    <Badge color="info"><i className="fa fa-bell-o" /></Badge>
                  </div>
                  <div className="details">
                    12 new orders has arrived today
                  </div>
                </DropdownItem>
                <DropdownItem>
                  <div className="picture">
                    <Badge color="danger"><i className="fa fa-bell-o" /></Badge>
                  </div>
                  <div className="details">
                    One more thing that just happened
                  </div>
                </DropdownItem>
                <DropdownItem>
                  <a>
                    See all messages <i className="fa fa-arrow-right" />
                  </a>
                </DropdownItem>
              </DropdownMenu>
            </NavDropdown>
            <NavItem className={s.divider} />
            <NavDropdown isOpen={this.state.settingsOpen} toggle={this.toggleSettingsDropdown} className="hidden-sm-down">
              <DropdownToggle nav>
                <i className={`${s.dropdownNavIcon} glyphicon glyphicon-cog`} />
              </DropdownToggle>
              <DropdownMenu right className={s.dropdownMenu}>
                <section className="settings-content">
                  <div className="setting clearfix">
                    <div>Sidebar on the</div>
                    { /* nRight = sidebar == 'right' */ }
                    <button type="button" className="btn btn-sm btn-secondary">Left</button>
                    <button type="button" className="btn btn-sm btn-secondary">Right</button>
                  </div>
                  <div className="setting clearfix">
                    <div>Sidebar</div>
                    { /* nRight = sidebar == 'right' */ }
                    <button type="button" className="btn btn-sm btn-secondary">Left</button>
                    <button type="button" className="btn btn-sm btn-secondary">Right</button>
                  </div>
                </section>
              </DropdownMenu>
            </NavDropdown>
            <NavDropdown isOpen={this.state.accountOpen} toggle={this.toggleAccountDropdown} className="hidden-sm-down">
              <DropdownToggle nav>
                <i className={`${s.dropdownNavIcon} glyphicon glyphicon-user`} />
              </DropdownToggle>
              <DropdownMenu right className={s.dropdownMenu}>
                <section>
                  <img src={i2} alt="" className={s.imageAccount} />
                  Philip Daineka
                </section>
                <DropdownItem>
                  <i className="fa fa-user" />
                  Profile
                </DropdownItem>
                <DropdownItem>
                  <i className="fa fa-calendar" />
                  Calendar
                </DropdownItem>
                <DropdownItem>
                  <i className="fa fa-inbox" />
                  Inbox
                </DropdownItem>
              </DropdownMenu>
            </NavDropdown>
            <NavItem className="hidden-sm-down">
              <NavLink onClick={this.doLogout}>
                <i className={`${s.dropdownNavIcon} glyphicon glyphicon-off`} />
              </NavLink>
            </NavItem>
            <NavItem className="hidden-md-up">
              <NavLink onClick={this.props.togleSidebar}>
                <i className={`${s.dropdownNavIcon} fa fa-bars`} />
              </NavLink>
            </NavItem>
          </Nav>
        </Nav>
      </Navbar>
    );
  }
}

function mapStateToProps() {
  return {};
}

export default withRouter(connect(mapStateToProps)(withStyles(s)(Header)));

