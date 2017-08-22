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
import { hideSidebar, moveSidebar } from '../../actions/navigation';

import i1 from '../../images/1.png';
import i2 from '../../images/2.png';
import i3 from '../../images/3.png';

import s from './Header.scss';

class Header extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    togleSidebar: PropTypes.func.isRequired,
    sidebarRight: PropTypes.bool.isRequired,
    sidebarHidden: PropTypes.bool.isRequired,
  };

  constructor(props) {
    super(props);

    this.doLogout = this.doLogout.bind(this);
    this.onDismiss = this.onDismiss.bind(this);
    this.toggleMessagesDropdown = this.toggleMessagesDropdown.bind(this);
    this.toggleSupportDropdown = this.toggleSupportDropdown.bind(this);
    this.toggleSettingsDropdown = this.toggleSettingsDropdown.bind(this);
    this.toggleAccountDropdown = this.toggleAccountDropdown.bind(this);
    this.toggleHide = this.toggleHide.bind(this);
    this.toggleMove = this.toggleMove.bind(this);

    this.state = {
      visible: true,
      messagesOpen: false,
      supportOpen: false,
      settingsOpen: false,
      mSelected: 0,
      hSelected: 0,
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

  toggleHide(selected) {
    this.setState({ hSelected: selected });

    if ((selected === 1 && this.props.sidebarHidden) ||
      (selected === 2 && !this.props.sidebarHidden)) {
      this.props.dispatch(hideSidebar());
    }
  }

  toggleMove(selected) {
    this.setState({ mSelected: selected });

    if ((selected === 1 && this.props.sidebarRight) ||
      (selected === 2 && !this.props.sidebarRight)) {
      this.props.dispatch(moveSidebar());
    }
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
            <Input id="search-input" placeholder="Search..." className="input-transparent" />
          </InputGroup>
          <Nav className={s.nav}>
            <NavDropdown isOpen={this.state.messagesOpen} toggle={this.toggleMessagesDropdown}>
              <DropdownToggle nav>
                <i className={`${s.dropdownNavIcon} glyphicon glyphicon-comments`} />
              </DropdownToggle>
              <DropdownMenu className={`${s.dropdownMenu} ${s.messages}`} right>
                <DropdownItem>
                  <img className={s.image} src={i1} alt="" />
                  <div className={s.details}>
                    <div>Jane Hew</div>
                    <div className={s.text}>
                      Hey, John! How is it going? ...
                    </div>
                  </div>
                </DropdownItem>
                <DropdownItem>
                  <img className={s.image} src={i2} alt="" />
                  <div className={s.details}>
                    <div>Alies Rumiancaŭ</div>
                    <div className={s.text}>
                      I will definitely buy this template
                    </div>
                  </div>
                </DropdownItem>
                <DropdownItem>
                  <img className={s.image} src={i3} alt="" />
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
              <DropdownToggle nav>
                <i className={`${s.dropdownNavIcon} glyphicon glyphicon-globe`} />
                <span className={s.count}>8</span>
              </DropdownToggle>
              <DropdownMenu right className={`${s.dropdownMenu} ${s.support}`}>
                <DropdownItem>
                  <div className="picture">
                    <Badge color="danger"><i className="fa fa-bell-o" /></Badge>
                  </div>
                  <div className={s.details}>
                    Check out this awesome ticket
                  </div>
                </DropdownItem>
                <DropdownItem>
                  <div className="picture">
                    <Badge color="warning"><i className="fa fa-question-circle" /></Badge>
                  </div>
                  <div className={s.details}>
                    What is the best way to get ...
                  </div>
                </DropdownItem>
                <DropdownItem>
                  <div className="picture">
                    <Badge color="success"><i className="fa fa-info-circle" /></Badge>
                  </div>
                  <div className={s.details}>
                    This is just a simple notification
                  </div>
                </DropdownItem>
                <DropdownItem>
                  <div className="picture">
                    <Badge color="info"><i className="fa fa-plus" /></Badge>
                  </div>
                  <div className={s.details}>
                    12 new orders has arrived today
                  </div>
                </DropdownItem>
                <DropdownItem>
                  <div className="picture">
                    <Badge color="danger"><i className="fa fa-tag" /></Badge>
                  </div>
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
            <NavDropdown isOpen={this.state.settingsOpen} toggle={this.toggleSettingsDropdown} className="hidden-sm-down">
              <DropdownToggle nav>
                <i className={`${s.dropdownNavIcon} glyphicon glyphicon-cog`} />
              </DropdownToggle>
              <DropdownMenu className={`${s.dropdownMenu} ${s.settings}`}>
                <section className="settings-content">
                  <div className="setting clearfix">
                    <div>Sidebar on the</div>
                    <button type="button" onClick={() => this.toggleMove(1)} className={`btn btn-sm btn-secondary ${this.state.mSelected === 1 ? 'active' : ''}`}>Left</button>
                    <button type="button" onClick={() => this.toggleMove(2)} className={`btn btn-sm btn-secondary ${this.state.mSelected === 2 ? 'active' : ''}`}>Right</button>
                  </div>
                  <div className="setting clearfix">
                    <div>Sidebar</div>
                    <button type="button" onClick={() => this.toggleHide(1)} className={`btn btn-sm btn-secondary ${this.state.hSelected === 1 ? 'active' : ''}`}>Show</button>
                    <button type="button" onClick={() => this.toggleHide(2)} className={`btn btn-sm btn-secondary ${this.state.hSelected === 2 ? 'active' : ''}`}>Hide</button>
                  </div>
                </section>
              </DropdownMenu>
            </NavDropdown>
            <NavDropdown isOpen={this.state.accountOpen} toggle={this.toggleAccountDropdown} className="hidden-sm-down">
              <DropdownToggle nav>
                <i className={`${s.dropdownNavIcon} glyphicon glyphicon-user`} />
              </DropdownToggle>
              <DropdownMenu right className={`${s.dropdownMenu} ${s.account}`}>
                <section>
                  <img src={i2} alt="" className={s.imageAccount} />
                  Philip Daineka
                </section>
                <DropdownItem>
                  <NavLink href="/profile">
                    <i className="fa fa-user" />
                    Profile
                  </NavLink>
                </DropdownItem>
                <DropdownItem>
                  <NavLink href="/calendar">
                    <i className="fa fa-calendar" />
                      Calendar
                  </NavLink>
                </DropdownItem>
                <DropdownItem>
                  <NavLink href="/inbox">
                    <i className="fa fa-inbox" />
                      Inbox
                  </NavLink>
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

function mapStateToProps(store) {
  return {
    sidebarHidden: store.navigation.sidebarHidden,
    sidebarRight: store.navigation.sidebarRight,
  };
}

export default withRouter(connect(mapStateToProps)(withStyles(s)(Header)));

