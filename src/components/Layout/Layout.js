import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { connect } from 'react-redux';
import { Switch, Route, withRouter } from 'react-router';

// an example of react-router code-splitting
/* eslint-disable */
import loadUIIcons from 'bundle-loader?lazy!../../pages/ui-elements/icons';
import loadUIButtons from 'bundle-loader?lazy!../../pages/ui-elements/buttons';
import loadUIAccordion from 'bundle-loader?lazy!../../pages/ui-elements/accordion';
import loadUITabs from 'bundle-loader?lazy!../../pages/ui-elements/tabs';
import loadUINotifications from 'bundle-loader?lazy!../../pages/ui-elements/notifications';
import loadUIDialogs from 'bundle-loader?lazy!../../pages/ui-elements/dialogs';
import loadComponentsCalendar from 'bundle-loader?lazy!../../pages/components/calendar';
import loadComponentsMaps from 'bundle-loader?lazy!../../pages/components/maps';
import loadComponentsGallery from 'bundle-loader?lazy!../../pages/components/gallery';
import loadComponentsFileupload from 'bundle-loader?lazy!../../pages/components/fileupload';
import loadFormsAccount from 'bundle-loader?lazy!../../pages/forms/account';
import loadFormsArticle from 'bundle-loader?lazy!../../pages/forms/article';
import loadFormsElements from 'bundle-loader?lazy!../../pages/forms/elements';
import loadFormsValidation from 'bundle-loader?lazy!../../pages/forms/validation';
import loadFormsWizard from 'bundle-loader?lazy!../../pages/forms/wizard';
import loadStatisticsStats from 'bundle-loader?lazy!../../pages/statistics/stats';
import loadStatisticsCharts from 'bundle-loader?lazy!../../pages/statistics/charts';
import loadStatisticsRealtime from 'bundle-loader?lazy!../../pages/statistics/realtime';
import loadTablesStatic from 'bundle-loader?lazy!../../pages/tables/static';
import loadTablesDynamic from 'bundle-loader?lazy!../../pages/tables/dynamic';
import loadWidgetsBasic from 'bundle-loader?lazy!../../pages/widgets/basic';
import loadWidgetsLive from 'bundle-loader?lazy!../../pages/widgets/live';
import loadSpecialSearch from 'bundle-loader?lazy!../../pages/special/search';
import loadSpecialInvoice from 'bundle-loader?lazy!../../pages/special/invoice';
import loadSpecialInbox from 'bundle-loader?lazy!../../pages/special/inbox';
/* eslint-enable */

import s from './Layout.scss';
import Header from '../Header';
import Sidebar from '../Sidebar';
import Bundle from '../../core/Bundle';

// Dashboard & Package components are loaded directly as an example of server side rendering
import Dashboard from '../../pages/dashboard';
import Package from '../../pages/package';

const UIIconsBundle = Bundle.generateBundle(loadUIIcons);
const UIButtonsBundle = Bundle.generateBundle(loadUIButtons);
const UIAccordionBundle = Bundle.generateBundle(loadUIAccordion);
const UITabsBundle = Bundle.generateBundle(loadUITabs);
const UINotificationsBundle = Bundle.generateBundle(loadUINotifications);
const UIDialogsBundle = Bundle.generateBundle(loadUIDialogs);
const ComponentsCalendarBundle = Bundle.generateBundle(loadComponentsCalendar);
const ComponentsMapsBundle = Bundle.generateBundle(loadComponentsMaps);
const ComponentsGalleryBundle = Bundle.generateBundle(loadComponentsGallery);
const ComponentsFileuploadBundle = Bundle.generateBundle(loadComponentsFileupload);
const FormsAccountBundle = Bundle.generateBundle(loadFormsAccount);
const FormsArticleBundle = Bundle.generateBundle(loadFormsArticle);
const FormsElementsBundle = Bundle.generateBundle(loadFormsElements);
const FormsValidationBundle = Bundle.generateBundle(loadFormsValidation);
const FormsWizardBundle = Bundle.generateBundle(loadFormsWizard);
const StatisticsStatsBundle = Bundle.generateBundle(loadStatisticsStats);
const StatisticsChartsBundle = Bundle.generateBundle(loadStatisticsCharts);
const StatisticsRealtimeBundle = Bundle.generateBundle(loadStatisticsRealtime);
const TablesStaticBundle = Bundle.generateBundle(loadTablesStatic);
const TablesDynamicBundle = Bundle.generateBundle(loadTablesDynamic);
const WidgetsBasicBundle = Bundle.generateBundle(loadWidgetsBasic);
const WidgetsLiveBundle = Bundle.generateBundle(loadWidgetsLive);
const SpecialSearchBundle = Bundle.generateBundle(loadSpecialSearch);
const SpecialInvoiceBundle = Bundle.generateBundle(loadSpecialInvoice);
const SpecialInboxBundle = Bundle.generateBundle(loadSpecialInbox);

class Layout extends React.Component {

  static propTypes = {
    sidebarState: PropTypes.string.isRequired,
    sidebarPosition: PropTypes.string.isRequired,
  };

  render() {
    return (
      <div className={s.root}>
        <Header toggleSidebar={this.toggleSidebar} />
        <div className={`${s.wrap} ${this.props.sidebarState === 'hide' ? 'sidebar-hidden' : ''} ${this.props.sidebarPosition === 'right' ? 'sidebar-right' : ''}`}>
          <Sidebar />
          <main className={s.content}>
            <Switch>
              <Route path="/app" exact component={Dashboard} />
              <Route path="/app/package" exact component={Package} />
              <Route path="/app/ui/icons" exact component={UIIconsBundle} />
              <Route path="/app/ui/buttons" exact component={UIButtonsBundle} />
              <Route path="/app/ui/accordion" exact component={UIAccordionBundle} />
              <Route path="/app/ui/tabs" exact component={UITabsBundle} />
              <Route path="/app/ui/notifications" exact component={UINotificationsBundle} />
              <Route path="/app/ui/dialogs" exact component={UIDialogsBundle} />
              <Route path="/app/components/calendar" exact component={ComponentsCalendarBundle} />
              <Route path="/app/components/maps" exact component={ComponentsMapsBundle} />
              <Route path="/app/components/gallery" exact component={ComponentsGalleryBundle} />
              <Route path="/app/components/fileupload" exact component={ComponentsFileuploadBundle} />
              <Route path="/app/forms/account" exact component={FormsAccountBundle} />
              <Route path="/app/forms/article" exact component={FormsArticleBundle} />
              <Route path="/app/forms/elements" exact component={FormsElementsBundle} />
              <Route path="/app/forms/validation" exact component={FormsValidationBundle} />
              <Route path="/app/forms/wizard" exact component={FormsWizardBundle} />
              <Route path="/app/statistics/stats" exact component={StatisticsStatsBundle} />
              <Route path="/app/statistics/charts" exact component={StatisticsChartsBundle} />
              <Route path="/app/statistics/realtime" exact component={StatisticsRealtimeBundle} />
              <Route path="/app/tables/static" exact component={TablesStaticBundle} />
              <Route path="/app/tables/dynamic" exact component={TablesDynamicBundle} />
              <Route path="/app/widgets/basic" exact component={WidgetsBasicBundle} />
              <Route path="/app/widgets/live" exact component={WidgetsLiveBundle} />
              <Route path="/app/special/search" exact component={SpecialSearchBundle} />
              <Route path="/app/special/invoice" exact component={SpecialInvoiceBundle} />
              <Route path="/app/special/inbox" component={SpecialInboxBundle} />
            </Switch>
            <footer className={s.footer}>
              Light Blue 4.0 React Version - Made by <a href="https://flatlogic.com" rel="nofollow noopener noreferrer" target="_blank">Flatlogic</a>
            </footer>
          </main>
        </div>
      </div>
    );
  }
}

function mapStateToProps(store) {
  return {
    sidebarState: store.navigation.sidebarState,
    sidebarPosition: store.navigation.sidebarPosition,
  };
}

export default withRouter(connect(mapStateToProps)(withStyles(s)(Layout)));

