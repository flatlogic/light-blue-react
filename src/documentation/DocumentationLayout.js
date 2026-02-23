import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Col } from 'reactstrap';
import classnames from 'classnames';
import { Navigate, Route, Routes } from 'react-router-dom';
import SwipeArea from '../components/SwipeArea';

import Header from './DocumentationHeader';
import Sidebar from './DocumentationSidebar';
import { openSidebar, closeSidebar } from '../actions/navigation';
import s from '../components/Layout/Layout.module.scss';
import sd from './styles.module.scss';

import Overview from './pages/getting-started/Overview'
import Licences from './pages/getting-started/Licences';
import QuickStart from './pages/getting-started/QuickStart';
import Alerts from './pages/components/Alerts';
import Badge from './pages/components/Badge';
import Buttons from './pages/components/Buttons';
import Card from './pages/components/Card';
import Carousel from './pages/components/Carousel';
import Modal from './pages/components/Modal';
import Nav from './pages/components/Nav';
import Navbar from './pages/components/Navbar';
import Popovers from './pages/components/Popovers';
import Progress from './pages/components/Progress';
import Tabs from './pages/components/Tabs';
import Libs from './pages/Libs';
import Pages from './pages/Pages';

const Layout = () => {
  const dispatch = useDispatch();
  const sidebarOpened = useSelector((store) => store.navigation.sidebarOpened);
  const [width] = React.useState(window.innerWidth);

  const handleSwipe = (e) => {
    if ('ontouchstart' in window) {
      if (e.direction === 4) {
        dispatch(openSidebar());
        return;
      }

      if (e.direction === 2 && sidebarOpened) {
        dispatch(closeSidebar());
        return;
      }
    }
  };

  return (
    <div
      className={[
        s.root,
        sd.root,
        width > 768 && s.sidebarStatic,
        width < 768 && !sidebarOpened ? s.sidebarClose : '',
      ].join(' ')}
    >
      <Header />
      <div>
        <SwipeArea onSwipe={handleSwipe}>
          <main className={classnames(s.content, sd.content, 'documentationPage')}>
            <div className="container">
              <div className="row">
                <Sidebar width={width} />
                <Col xl={10} md={9}>
                  <Routes>
                    <Route index element={<Navigate to="getting-started/overview" replace />} />
                    <Route path="getting-started" element={<Navigate to="overview" replace />} />
                    <Route path="getting-started/overview" element={<Overview />} />
                    <Route path="getting-started/licences" element={<Licences />} />
                    <Route path="getting-started/quick-start" element={<QuickStart />} />
                    <Route path="components" element={<Navigate to="alerts" replace />} />
                    <Route path="components/alerts" element={<Alerts />} />
                    <Route path="components/badge" element={<Badge />} />
                    <Route path="components/buttons" element={<Buttons />} />
                    <Route path="components/card" element={<Card />} />
                    <Route path="components/carousel" element={<Carousel />} />
                    <Route path="components/modal" element={<Modal />} />
                    <Route path="components/nav" element={<Nav />} />
                    <Route path="components/navbar" element={<Navbar />} />
                    <Route path="components/popovers" element={<Popovers />} />
                    <Route path="components/tabs-accordion" element={<Tabs />} />
                    <Route path="components/progress" element={<Progress />} />
                    <Route path="libs" element={<Libs />} />
                    <Route path="pages" element={<Pages />} />
                    <Route
                      path="*"
                      element={<Navigate to="getting-started/overview" replace />}
                    />
                  </Routes>
                </Col>
              </div>
            </div>
          </main>
        </SwipeArea>
      </div>
    </div>
  );
};

export default Layout;
