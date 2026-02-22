import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, Navigate, Route, Routes } from 'react-router-dom';
import SwipeArea from '../SwipeArea';

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
  const isAdminSection = location.pathname.startsWith('/admin');

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
        <SwipeArea onSwipe={handleSwipe}>
          <main className={s.content}>
            <BreadcrumbHistory url={location.pathname} />
            <Routes>
              <Route index element={<Navigate to={isAdminSection ? '/admin/users' : '/app/main/dashboard'} replace />} />
              <Route path="main" element={<Navigate to="/app/main/dashboard" replace />} />
              <Route path="main/dashboard" element={<Dashboard />} />
              <Route path="main/widgets" element={<Widgets />} />
              <Route path="main/analytics" element={<DashboardAnalytics />} />
              <Route path="edit_profile" element={<UserFormPage />} />
              <Route path="password" element={<ChangePasswordFormPage />} />
              <Route path="users" element={<UserListPage />} />
              <Route path="users/new" element={<UserFormPage />} />
              <Route path="users/:id/edit" element={<UserFormPage />} />
              <Route path="users/:id" element={<UserViewPage />} />
              <Route path="ecommerce" element={<Navigate to="/app/ecommerce/management" replace />} />
              <Route path="ecommerce/management" element={<Management />} />
              <Route path="ecommerce/management/:id" element={<ProductEdit />} />
              <Route path="ecommerce/management/create" element={<ProductEdit />} />
              <Route path="ecommerce/products" element={<Products />} />
              <Route path="ecommerce/product" element={<Product />} />
              <Route path="ecommerce/product/:id" element={<Product />} />
              <Route path="profile" element={<Profile />} />
              <Route path="inbox" element={<Email />} />
              <Route path="ui" element={<Navigate to="/app/ui/alerts" replace />} />
              <Route path="ui/buttons" element={<UIButtons />} />
              <Route path="ui/icons" element={<UIIcons />} />
              <Route path="ui/tabs-accordion" element={<UITabsAccordion />} />
              <Route path="ui/notifications" element={<UINotifications />} />
              <Route path="ui/list-groups" element={<UIListGroups />} />
              <Route path="ui/alerts" element={<UIAlerts />} />
              <Route path="ui/badge" element={<UIBadge />} />
              <Route path="ui/card" element={<UICard />} />
              <Route path="ui/carousel" element={<UICarousel />} />
              <Route path="ui/jumbotron" element={<UIJumbotron />} />
              <Route path="ui/modal" element={<UIModal />} />
              <Route path="ui/popovers" element={<UIPopovers />} />
              <Route path="ui/progress" element={<UIProgress />} />
              <Route path="ui/navbar" element={<UINavbar />} />
              <Route path="ui/nav" element={<UINav />} />
              <Route path="grid" element={<Grid />} />
              <Route path="package" element={<Package />} />
              <Route path="forms" element={<Navigate to="/app/forms/elements" replace />} />
              <Route path="forms/elements" element={<FormsElements />} />
              <Route path="forms/validation" element={<FormsValidation />} />
              <Route path="forms/wizard" element={<FormsWizard />} />
              <Route path="charts" element={<Navigate to="/app/charts/overview" replace />} />
              <Route path="charts/overview" element={<Charts />} />
              <Route path="charts/apex" element={<ApexCharts />} />
              <Route path="charts/echarts" element={<Echarts />} />
              <Route path="charts/highcharts" element={<HighCharts />} />
              <Route path="tables" element={<Navigate to="/app/tables/static" replace />} />
              <Route path="tables/static" element={<TablesStatic />} />
              <Route path="tables/dynamic" element={<TablesDynamic />} />
              <Route path="extra" element={<Navigate to="/app/extra/calendar" replace />} />
              <Route path="extra/calendar" element={<ExtraCalendar />} />
              <Route path="extra/invoice" element={<ExtraInvoice />} />
              <Route path="extra/search" element={<ExtraSearch />} />
              <Route path="extra/timeline" element={<ExtraTimeline />} />
              <Route path="extra/gallery" element={<ExtraGallery />} />
              <Route path="maps" element={<Navigate to="/app/maps/google" replace />} />
              <Route path="maps/google" element={<MapsGoogle />} />
              <Route path="maps/vector" element={<MapsVector />} />
              <Route path="core" element={<Navigate to="/app/core/typography" replace />} />
              <Route path="core/typography" element={<CoreTypography />} />
              <Route path="core/colors" element={<CoreColors />} />
              <Route path="core/grid" element={<CoreGrid />} />
              <Route path="*" element={<Navigate to={isAdminSection ? '/admin/users' : '/app/main/dashboard'} replace />} />
            </Routes>
            <footer className={s.contentFooter}>
              Light Blue React Dashboard - React admin template made by <a href="https://flatlogic.com" >Flatlogic</a>
            </footer>
          </main>
        </SwipeArea>
      </div>
    </div>
  );
}

export default Layout;
