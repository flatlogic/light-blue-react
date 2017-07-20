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
} from 'reactstrap';
import { logoutUser } from '../../actions/user';

import i1 from '../../images/1.png';

import s from './Header.scss';

class Header extends React.Component {
  static propTypes = {
    // sidebarToggle: PropTypes.func.isRequired,
    dispatch: PropTypes.func.isRequired,
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
            <i className="fa fa-info-circle mr-xs" /> Check out Light Blue <a id="notification-link">settings</a> on
            the right!
          </UncontrolledAlert>
          <InputGroup size="sm" className={`${s.navbarForm} hidden-sm-down`}>
            <InputGroupAddon className={s.inputAddon}><i className="fa fa-search" /></InputGroupAddon>
            <Input id="search-input" placeholder="Search..." />
          </InputGroup>
          <Nav>
            <NavDropdown isOpen={this.state.messagesOpen} toggle={this.toggleMessagesDropdown} className="hidden-sm-down">
              <DropdownToggle nav>
                <i className={`${s.dropdownNavIcon} glyphicon glyphicon-globe`} />
              </DropdownToggle>
              <DropdownMenu right className="super-colors">
                <DropdownItem>
                  <img src={i1} alt="" />
                  <div className="details">
                    <div className="sender">Jane Hew</div>
                    <div className="text">
                      Hey, John! How is it going? ...
                    </div>
                  </div>
                </DropdownItem>
                <DropdownItem>
                  <img src={i1} alt="" />
                  <div className="details">
                    <div className="sender">Jane Hew</div>
                    <div className="text">
                      Hey, John! How is it going? ...
                    </div>
                  </div>
                </DropdownItem>
                <DropdownItem>
                  <img src={i1} alt="" />
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
            <NavDropdown isOpen={this.state.supportOpen} toggle={this.toggleSupportDropdown} className="hidden-sm-down">
              <DropdownToggle nav>
                <i className={`${s.dropdownNavIcon} glyphicon glyphicon-globe`} />
              </DropdownToggle>
              <DropdownMenu right className="super-colors">
                <DropdownItem>
                  <img src={i1} alt="" />
                  <div className="details">
                    <div className="sender">Jane Hew</div>
                    <div className="text">
                      Hey, John! How is it going? ...
                    </div>
                  </div>
                </DropdownItem>
                <DropdownItem>
                  <img src={i1} alt="" />
                  <div className="details">
                    <div className="sender">Jane Hew</div>
                    <div className="text">
                      Hey, John! How is it going? ...
                    </div>
                  </div>
                </DropdownItem>
                <DropdownItem>
                  <img src={i1} alt="" />
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
            <NavItem className={s.divider} />
            <NavDropdown isOpen={this.state.settingsOpen} toggle={this.toggleSettingsDropdown} className="hidden-sm-down">
              <DropdownToggle nav>
                <i className={`${s.dropdownNavIcon} glyphicon glyphicon-cog`} />
              </DropdownToggle>
              <DropdownMenu right className="super-colors">
                <DropdownItem>
                  <img src={i1} alt="" />
                  <div className="details">
                    <div className="sender">Jane Hew</div>
                    <div className="text">
                      Hey, John! How is it going? ...
                    </div>
                  </div>
                </DropdownItem>
                <DropdownItem>
                  <img src={i1} alt="" />
                  <div className="details">
                    <div className="sender">Jane Hew</div>
                    <div className="text">
                      Hey, John! How is it going? ...
                    </div>
                  </div>
                </DropdownItem>
                <DropdownItem>
                  <img src={i1} alt="" />
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
            <NavDropdown isOpen={this.state.accountOpen} toggle={this.toggleAccountDropdown} className="hidden-sm-down">
              <DropdownToggle nav>
                <i className={`${s.dropdownNavIcon} glyphicon glyphicon-user`} />
              </DropdownToggle>
              <DropdownMenu right className="super-colors">
                <DropdownItem>
                  <img src={i1} alt="" />
                  <div className="details">
                    <div className="sender">Jane Hew</div>
                    <div className="text">
                      Hey, John! How is it going? ...
                    </div>
                  </div>
                </DropdownItem>
                <DropdownItem>
                  <img src={i1} alt="" />
                  <div className="details">
                    <div className="sender">Jane Hew</div>
                    <div className="text">
                      Hey, John! How is it going? ...
                    </div>
                  </div>
                </DropdownItem>
                <DropdownItem>
                  <img src={i1} alt="" />
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
            <NavItem>
              <NavLink>
                <i className={`${s.dropdownNavIcon} glyphicon glyphicon-off`} />
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

