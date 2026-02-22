import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Navbar,
  Nav,
  NavItem,
  NavLink,
  InputGroupText,
  InputGroup,
  Input,
  UncontrolledAlert,
  Dropdown,
  Collapse,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Badge,
  ButtonGroup,
  Button,
  Form,
} from 'reactstrap';

import Notifications from '../Notifications';
import PowerIcon from '../Icons/HeaderIcons/PowerIcon';
import BellIcon from '../Icons/HeaderIcons/BellIcon';
import SettingsIcon from '../Icons/HeaderIcons/SettingsIcon';
import MessageIcon from '../Icons/HeaderIcons/MessageIcon';
import BurgerIcon from '../Icons/HeaderIcons/BurgerIcon';
import SearchIcon from '../Icons/HeaderIcons/SearchIcon';
import ArrowIcon from '../Icons/HeaderIcons/ArrowIcon';

import { logoutUser } from '../../actions/auth';
import { openSidebar, closeSidebar, changeSidebarPosition, changeSidebarVisibility } from '../../actions/navigation';

import sender1 from '../../images/people/a1.jpg';
import sender2 from '../../images/people/a5.jpg';
import sender3 from '../../images/people/a4.jpg';

import adminDefault from '../../images/chat/chat2.png';

import s from './Header.module.scss';

function Header() {
  const dispatch = useDispatch();
  const isSidebarOpened = useSelector((store) => store.navigation.sidebarOpened);
  const sidebarVisibility = useSelector((store) => store.navigation.sidebarVisibility);
  const sidebarPosition = useSelector((store) => store.navigation.sidebarPosition);
  const user = useSelector((store) => store.auth.currentUser);

  const [messagesOpen, setMessagesOpen] = useState(false);
  const [supportOpen, setSupportOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  const avatar = user && user.avatar && user.avatar.length && user.avatar[0].publicUrl;
  const firstUserLetter = user && (user.firstName || user.email)[0].toUpperCase();

  const doLogout = () => {
    dispatch(logoutUser());
  };

  const toggleSidebar = () => {
    if (isSidebarOpened) {
      dispatch(closeSidebar());
    } else {
      dispatch(openSidebar());
    }
  };

  const moveSidebar = (position) => {
    dispatch(changeSidebarPosition(position));
  };

  const toggleVisibilitySidebar = (visibility) => {
    dispatch(changeSidebarVisibility(visibility));
  };

  return (
    <Navbar className="d-print-none">
      <div className={s.burger}>
        <NavLink onClick={toggleSidebar} className={`d-md-none ${s.navItem} text-white`} href="#">
          <BurgerIcon className={s.headerIcon} />
        </NavLink>
      </div>
      <div className={`d-print-none ${s.root}`}>
        <UncontrolledAlert className="me-3 d-lg-down-none animate__animated animate__bounceIn animate__delay-1s">
          Check out Light Blue
          <button
            className="btn-link"
            onClick={() => setSettingsOpen(true)}
          >
            <SettingsIcon className={`${s.settingsIcon} btn-link`} />
          </button> on the right!
        </UncontrolledAlert>
        <Collapse className={`${s.searchCollapse} ms-lg-0 me-md-3`} isOpen={searchOpen}>
          <InputGroup className={`${s.navbarForm} ${searchFocused ? s.navbarFormFocused : ''}`}>

            <InputGroupText className={s.inputAddon}>
              <i className="fa fa-search" />
            </InputGroupText>

            <Input
              id="search-input-2" placeholder="Search..." className="input-transparent"
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
            />
          </InputGroup>
        </Collapse>
        <Form className="d-md-down-none mx-3 my-auto">
          <InputGroup className={`input-group-no-border ${s.searchForm}`} >
            <InputGroupText className={s.inputGroupText}>
              <SearchIcon className={s.headerIcon} />
            </InputGroupText>
            <Input id="search-input" className="input-transparent" placeholder="Search Dashboard" />
          </InputGroup>
        </Form>

        <Nav className="ms-md-0">
          <Dropdown nav isOpen={notificationsOpen} toggle={() => setNotificationsOpen((prev) => !prev)} id="basic-nav-dropdown" className={`${s.notificationsMenu}`} >
            <DropdownToggle nav caret style={{ color: '#C1C3CF', padding: 0 }}>
              <span className={`${s.avatar} rounded-circle float-start`}>
                {avatar ? (
                  <img src={avatar} onError={e => e.target.src = adminDefault} alt="..." title={user && (user.firstName || user.email)} />
                ) : user && user.role === 'admin' ? (
                  <img src={adminDefault} onError={e => e.target.src = adminDefault} alt="..." title={user && (user.firstName || user.email)} />
                ) : <span title={user && (user.firstName || user.email)}>{firstUserLetter}</span>
                }
              </span>
              <span className={`small d-sm-down-none ${s.adminEmail}`}>{user ? (user.firstName || user.email) : 'Philip Smith'}</span>
              <Badge className={`d-sm-down-none ${s.badge}`} color="danger">9</Badge>
            </DropdownToggle>
            <DropdownMenu className={`${s.notificationsWrapper} py-0 animate__animated animate__faster animate__fadeInUp`}>
              <Notifications />
            </DropdownMenu>
          </Dropdown>
          <NavItem className="d-lg-none">
            <NavLink onClick={() => setSearchOpen((prev) => !prev)} className={s.navItem} href="#">
              <SearchIcon addId="header-search" className={s.headerIcon} />
            </NavLink>
          </NavItem>
          <Dropdown nav isOpen={messagesOpen} toggle={() => setMessagesOpen((prev) => !prev)}>
            <DropdownToggle nav className={`d-sm-down-none ${s.navItem} text-white`}>
              <MessageIcon className={s.headerIcon} />
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
                {/* eslint-disable-next-line */}
                <a href="#" className="text-white">
                  See all messages <ArrowIcon className={s.headerIcon} maskName="messagesArrow" />
                </a>
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
          <NavItem className={`${s.divider} d-none d-sm-block`} />
          <Dropdown className="d-none d-sm-block" nav isOpen={settingsOpen} toggle={() => setSettingsOpen((prev) => !prev)}>
            <DropdownToggle nav className={`${s.navItem} text-white`}>
              <SettingsIcon addId="header-settings" className={s.headerIcon} />
            </DropdownToggle>
            <DropdownMenu className={`${s.dropdownMenu} ${s.settings}`}>
              <h6>Sidebar on the</h6>
              <ButtonGroup size="sm">
                <Button color="primary" onClick={() => moveSidebar('left')} className={sidebarPosition === 'left' ? 'active' : ''}>Left</Button>
                <Button color="primary" onClick={() => moveSidebar('right')} className={sidebarPosition === 'right' ? 'active' : ''}>Right</Button>
              </ButtonGroup>
              <h6 className="mt-2">Sidebar</h6>
              <ButtonGroup size="sm">
                <Button color="primary" onClick={() => toggleVisibilitySidebar('show')} className={sidebarVisibility === 'show' ? 'active' : ''}>Show</Button>
                <Button color="primary" onClick={() => toggleVisibilitySidebar('hide')} className={sidebarVisibility === 'hide' ? 'active' : ''}>Hide</Button>
              </ButtonGroup>
            </DropdownMenu>
          </Dropdown>
          <Dropdown className="d-none d-sm-block" nav isOpen={supportOpen} toggle={() => setSupportOpen((prev) => !prev)}>
            <DropdownToggle nav className={`${s.navItem} text-white`}>
              <BellIcon className={s.headerIcon} />
              <span className={s.count}></span>
            </DropdownToggle>
            <DropdownMenu className={`${s.dropdownMenu} ${s.support}`}>
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
                {/* eslint-disable-next-line */}
                <a href="#" className="text-white">
                  See all tickets <ArrowIcon className={s.headerIcon} maskName="bellArrow" />
                </a>
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
          <NavItem>
            <NavLink onClick={doLogout} className={`${s.navItem} text-white`} href="#">
              <PowerIcon className={s.headerIcon} />
            </NavLink>
          </NavItem>
        </Nav>
      </div>
    </Navbar>
  );
}

export default Header;
