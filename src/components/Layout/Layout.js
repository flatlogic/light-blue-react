import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, Navigate, Route, Routes } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import Hammer from 'rc-hammerjs';

import Profile from '../../pages/profile';
import UIButtons from '../../pages/ui-elements/buttons';
import UIIcons from '../../pages/ui-elements/icons';
import UITabsAccordion from '../../pages/ui-elements/tabs-accordion/';
import UINotifications from '../../pages/ui-elements/notifications';
import UIListGroups from '../../pages/ui-elements/list-groups';
import FormsElements from '../../pages/forms/elements';
import FormsValidation from '../../pages/forms/validation';
import FormsWizard from '../../pages/forms/wizard';
import TablesStatic from '../../pages/tables/static';
import TablesDynamic from '../../pages/tables/dynamic';
import MapsGoogle from '../../pages/maps/google';
import MapsVector from '../../pages/maps/vector';
import ExtraCalendar from '../../pages/extra/calendar';
import ExtraInvoice from '../../pages/extra/invoice';
import ExtraSearch from '../../pages/extra/search';
import ExtraTimeline from '../../pages/extra/timeline';
import ExtraGallery from '../../pages/extra/gallery';
import Grid from '../../pages/grid';
import Widgets from '../../pages/widgets';
import Products from '../../pages/products';
import Management from '../../pages/management';
import Product from '../../pages/product';
import Package from '../../pages/package';
import Email from '../../pages/email';
import CoreTypography from '../../pages/core/typography';
import CoreColors from '../../pages/core/colors';
import CoreGrid from '../../pages/core/grid';
import UIAlerts from '../../pages/ui-elements/alerts';
import UIBadge from '../../pages/ui-elements/badge';
import UICard from '../../pages/ui-elements/card';
import UICarousel from '../../pages/ui-elements/carousel';
import UIJumbotron from '../../pages/ui-elements/jumbotron';
import UIModal from '../../pages/ui-elements/modal';
import UIProgress from '../../pages/ui-elements/progress';
import UINavbar from '../../pages/ui-elements/navbar';
import UINav from '../../pages/ui-elements/nav';
import UIPopovers from '../../pages/ui-elements/popovers';
import Charts from '../../pages/charts';
import ApexCharts from '../../pages/charts/apex';
import Echarts from '../../pages/charts/echarts';
import HighCharts from '../../pages/charts/highcharts';
import DashboardAnalytics from '../../pages/analytics';
import Dashboard from '../../pages/dashboard';
import UserFormPage from '../Users/form/UsersFormPage';
import UserListPage from '../Users/list/UsersListPage';
import UserViewPage from '../Users/view/UsersViewPage';
import ChangePasswordFormPage from '../Users/changePassword/ChangePasswordFormPage';

import { DashboardThemes, SidebarTypes } from '../../reducers/layout';

import Header from '../Header';
import Sidebar from '../Sidebar';
import Helper from '../Helper';
import BreadcrumbHistory from '../BreadcrumbHistory';
import { openSidebar, closeSidebar } from '../../actions/navigation';
import s from './Layout.module.scss';
import ProductEdit from '../../pages/management/components/productEdit';

function Layout() {
  const dispatch = useDispatch();
  const location = useLocation();
  const sidebarOpened = useSelector((store) => store.navigation.sidebarOpened);
  const sidebarPosition = useSelector((store) => store.navigation.sidebarPosition);
  const sidebarVisibility = useSelector((store) => store.navigation.sidebarVisibility);
  const dashboardTheme = useSelector((store) => store.layout.dashboardTheme);
  const [chatOpen, setChatOpen] = useState(false);

  const handleSwipe = (e) => {
    if ('ontouchstart' in window) {
      if (e.direction === 4 && !chatOpen) {
        dispatch(openSidebar());
        return;
      }

      if (e.direction === 2 && sidebarOpened) {
        dispatch(closeSidebar());
        return;
      }

      setChatOpen(e.direction === 2);
    }
  };

  return (
    <div
      className={[
        s.root,
        `dashboard-${(localStorage.getItem('sidebarType') === SidebarTypes.TRANSPARENT) ? 'light' : localStorage.getItem('dashboardTheme')}`,
        `theme-${localStorage.getItem('themeColor') ? localStorage.getItem('themeColor').replace('#', '') : '333964'}`,
        'light-blue-dashboard',
        `sidebar-${sidebarPosition}`,
        `sidebar-${sidebarVisibility}`,
        `dashboard-${dashboardTheme || DashboardThemes.DARK}`,
      ].join(' ')}
    >
      <div className={s.wrap}>
        <Header />
        <Helper />
        <Sidebar />
        <Hammer onSwipe={handleSwipe}>
          <main className={s.content}>
            <BreadcrumbHistory url={location.pathname} />
            <TransitionGroup>
              <CSSTransition
                key={location.pathname}
                classNames="fade"
                timeout={200}
              >
                <Routes>
                  <Route path="/app/main" element={<Navigate to="/app/main/dashboard" replace />} />
                  <Route path="/app/main/dashboard" element={<Dashboard />} />
                  <Route path="/app/main/widgets" element={<Widgets />} />
                  <Route path="/app/main/analytics" element={<DashboardAnalytics />} />
                  <Route path="/app/edit_profile" element={<UserFormPage />} />
                  <Route path="/app/password" element={<ChangePasswordFormPage />} />
                  <Route path="/admin" element={<Navigate to="/admin/users" replace />} />
                  <Route path="/admin/users" element={<UserListPage />} />
                  <Route path="/admin/users/new" element={<UserFormPage />} />
                  <Route path="/admin/users/:id/edit" element={<UserFormPage />} />
                  <Route path="/admin/users/:id" element={<UserViewPage />} />
                  <Route path="/app/ecommerce" element={<Navigate to="/app/ecommerce/management" replace />} />
                  <Route path="/app/ecommerce/management" element={<Management />} />
                  <Route path="/app/ecommerce/management/:id" element={<ProductEdit />} />
                  <Route path="/app/ecommerce/management/create" element={<ProductEdit />} />
                  <Route path="/app/ecommerce/products" element={<Products />} />
                  <Route path="/app/ecommerce/product" element={<Product />} />
                  <Route path="/app/ecommerce/product/:id" element={<Product />} />
                  <Route path="/app/profile" element={<Profile />} />
                  <Route path="/app/inbox" element={<Email />} />
                  <Route path="/app/ui" element={<Navigate to="/app/ui/alerts" replace />} />
                  <Route path="/app/ui/buttons" element={<UIButtons />} />
                  <Route path="/app/ui/icons" element={<UIIcons />} />
                  <Route path="/app/ui/tabs-accordion" element={<UITabsAccordion />} />
                  <Route path="/app/ui/notifications" element={<UINotifications />} />
                  <Route path="/app/ui/list-groups" element={<UIListGroups />} />
                  <Route path="/app/ui/alerts" element={<UIAlerts />} />
                  <Route path="/app/ui/badge" element={<UIBadge />} />
                  <Route path="/app/ui/card" element={<UICard />} />
                  <Route path="/app/ui/carousel" element={<UICarousel />} />
                  <Route path="/app/ui/jumbotron" element={<UIJumbotron />} />
                  <Route path="/app/ui/modal" element={<UIModal />} />
                  <Route path="/app/ui/popovers" element={<UIPopovers />} />
                  <Route path="/app/ui/progress" element={<UIProgress />} />
                  <Route path="/app/ui/navbar" element={<UINavbar />} />
                  <Route path="/app/ui/nav" element={<UINav />} />
                  <Route path="/app/grid" element={<Grid />} />
                  <Route path="/app/package" element={<Package />} />
                  <Route path="/app/forms" element={<Navigate to="/app/forms/elements" replace />} />
                  <Route path="/app/forms/elements" element={<FormsElements />} />
                  <Route path="/app/forms/validation" element={<FormsValidation />} />
                  <Route path="/app/forms/wizard" element={<FormsWizard />} />
                  <Route path="/app/charts" element={<Navigate to="/app/charts/overview" replace />} />
                  <Route path="/app/charts/overview" element={<Charts />} />
                  <Route path="/app/charts/apex" element={<ApexCharts />} />
                  <Route path="/app/charts/echarts" element={<Echarts />} />
                  <Route path="/app/charts/highcharts" element={<HighCharts />} />
                  <Route path="/app/tables" element={<Navigate to="/app/tables/static" replace />} />
                  <Route path="/app/tables/static" element={<TablesStatic />} />
                  <Route path="/app/tables/dynamic" element={<TablesDynamic />} />
                  <Route path="/app/extra" element={<Navigate to="/app/extra/calendar" replace />} />
                  <Route path="/app/extra/calendar" element={<ExtraCalendar />} />
                  <Route path="/app/extra/invoice" element={<ExtraInvoice />} />
                  <Route path="/app/extra/search" element={<ExtraSearch />} />
                  <Route path="/app/extra/timeline" element={<ExtraTimeline />} />
                  <Route path="/app/extra/gallery" element={<ExtraGallery />} />
                  <Route path="/app/maps" element={<Navigate to="/app/maps/google" replace />} />
                  <Route path="/app/maps/google" element={<MapsGoogle />} />
                  <Route path="/app/maps/vector" element={<MapsVector />} />
                  <Route path="/app/core" element={<Navigate to="/app/core/typography" replace />} />
                  <Route path="/app/core/typography" element={<CoreTypography />} />
                  <Route path="/app/core/colors" element={<CoreColors />} />
                  <Route path="/app/core/grid" element={<CoreGrid />} />
                  <Route path="*" element={<Navigate to="/app/main/dashboard" replace />} />
                </Routes>
              </CSSTransition>
            </TransitionGroup>
            <footer className={s.contentFooter}>
              Light Blue React Dashboard - React admin template made by <a href="https://flatlogic.com" >Flatlogic</a>
            </footer>
          </main>
        </Hammer>
      </div>
    </div>
  );
}

export default Layout;
