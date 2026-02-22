import React from 'react';
import classnames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { Col } from 'reactstrap';
import s from '../components/Sidebar/Sidebar.module.scss';
import sd from './styles.module.scss'
import { LinksGroup } from './components';

import { changeActiveSidebarItem } from '../actions/navigation';

const Sidebar = ({ width }) => {
  const dispatch = useDispatch();
  const activeItem = useSelector((store) => store.navigation.activeItem);

  return (
    <Col xl={2} md={3}>
      <nav
        className={[s.root, sd.sidebar, width > 768 && s.staticSidebar].join(' ')}
      >
        <ul>
          <LinksGroup
            onActiveSidebarItemChange={(item) => dispatch(changeActiveSidebarItem(item))}
            activeItem={activeItem}
            header="Getting Started"
            isHeader
            link="/documentation/getting-started"
            index="getting-started"
            childrenLinks={[
              {
                header: 'Overview', link: '/documentation/getting-started/overview',
              },
              {
                header: 'Licences', link: '/documentation/getting-started/licences',
              },
              {
                header: 'Quick Start', link: '/documentation/getting-started/quick-start',
              }
            ]}
          />
          <LinksGroup
            onActiveSidebarItemChange={(item) => dispatch(changeActiveSidebarItem(item))}
            activeItem={activeItem}
            header="Pages"
            isHeader
            link="/documentation/pages"
            index="pages"
          />
          <LinksGroup
            onActiveSidebarItemChange={(item) => dispatch(changeActiveSidebarItem(item))}
            activeItem={activeItem}
            header="Components"
            isHeader
            link="/documentation/components"
            index="components"
            childrenLinks={[
              {
                header: 'Alerts', link: '/documentation/components/alerts',
              },
              {
                header: 'Badge', link: '/documentation/components/badge',
              },
              {
                header: 'Buttons', link: '/documentation/components/buttons',
              },
              {
                header: 'Card', link: '/documentation/components/card',
              },
              {
                header: 'Carousel', link: '/documentation/components/carousel',
              },
              {
                header: 'Modal', link: '/documentation/components/modal',
              },
              {
                header: 'Nav', link: '/documentation/components/nav',
              },
              {
                header: 'Navbar', link: '/documentation/components/navbar',
              },
              {
                header: 'Popovers & Tooltips', link: '/documentation/components/popovers',
              },
              {
                header: 'Progress', link: '/documentation/components/progress',
              },
              {
                header: 'Tabs & Accordion', link: '/documentation/components/tabs-accordion',
              },
            ]}
          />
          <LinksGroup
            onActiveSidebarItemChange={(item) => dispatch(changeActiveSidebarItem(item))}
            activeItem={activeItem}
            header="Libs"
            isHeader
            link="/documentation/libs"
            index="libs"
          />
        </ul>

        <a className={classnames('d-md-down-none', sd.company)} href="http://flatlogic.com/" target="_blank"
           rel="noopener noreferrer">
          <img alt="..." src="https://cdn.dribbble.com/users/883507/avatars/small/7ca04141e335237d393ab41008adb46d.png?1509465697"/>
          Proudly built and maintained by <br/> Flatlogic
        </a>
      </nav >
    </Col>
  );
};

export default Sidebar;
