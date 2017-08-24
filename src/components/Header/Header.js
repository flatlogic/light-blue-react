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
  NavbarToggler,
  NavbarBrand,
  Collapse,
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
    toggleSidebar: PropTypes.func.isRequired,
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
      <Navbar>
        <NavbarBrand className={s.logo} href="/">
          Light <strong>Blue</strong>
        </NavbarBrand>
        <Nav className="ml-auto">
          <NavItem>
            <NavLink href="/components/">Components</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="https://github.com/reactstrap/reactstrap">Github</NavLink>
          </NavItem>
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

