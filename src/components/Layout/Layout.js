import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { connect } from 'react-redux';
import { Switch, Route, withRouter } from 'react-router';

// an example of react-router code-splitting
/* eslint-disable */
import loadUIIcons from 'bundle-loader?lazy!../../pages/ui-elements/icons/Icons';
import loadUIButtons from 'bundle-loader?lazy!../../pages/ui-elements/buttons/Buttons';
import loadUIAccordion from 'bundle-loader?lazy!../../pages/ui-elements/accordion/Accordion';
import loadUITabs from 'bundle-loader?lazy!../../pages/ui-elements/tabs/Tabs';
import loadUINotifications from 'bundle-loader?lazy!../../pages/ui-elements/notifications/Notifications';
import loadUIDialogs from 'bundle-loader?lazy!../../pages/ui-elements/dialogs/Dialogs';
import loadComponentsCalendar from 'bundle-loader?lazy!../../pages/components/calendar/Calendar';
import loadComponentsMaps from 'bundle-loader?lazy!../../pages/components/maps/Maps';
import loadComponentsGallery from 'bundle-loader?lazy!../../pages/components/gallery/Gallery';
import loadFormsAccount from 'bundle-loader?lazy!../../pages/forms/account/Account';
import loadFormsElements from 'bundle-loader?lazy!../../pages/forms/elements/Elements';
import loadStatisticsStats from 'bundle-loader?lazy!../../pages/statistics/stats/Stats';
import loadTablesStatic from 'bundle-loader?lazy!../../pages/tables/static/Static';
import loadWidgetsBasic from 'bundle-loader?lazy!../../pages/widgets/basic/Basic';
import loadSpecialSearch from 'bundle-loader?lazy!../../pages/special/search/Search';
import loadSpecialInvoice from 'bundle-loader?lazy!../../pages/special/invoice/Invoice';
import loadSpecialInbox from 'bundle-loader?lazy!../../pages/special/inbox/Inbox';
/* eslint-enable */

import s from './Layout.scss';
import Header from '../Header';
import Sidebar from '../Sidebar';
import Bundle from '../../core/Bundle';

// Dashboard component is loaded directly as an example of server side rendering
import Dashboard from '../../pages/dashboard/Dashboard';

const UIIconsBundle = Bundle.generateBundle(loadUIIcons);
const UIButtonsBundle = Bundle.generateBundle(loadUIButtons);
const UIAccordionBundle = Bundle.generateBundle(loadUIAccordion);
const UITabsBundle = Bundle.generateBundle(loadUITabs);
const UINotificationsBundle = Bundle.generateBundle(loadUINotifications);
const UIDialogsBundle = Bundle.generateBundle(loadUIDialogs);
const ComponentsCalendarBundle = Bundle.generateBundle(loadComponentsCalendar);
const ComponentsMapsBundle = Bundle.generateBundle(loadComponentsMaps);
const ComponentsGalleryBundle = Bundle.generateBundle(loadComponentsGallery);
const FormsAccountBundle = Bundle.generateBundle(loadFormsAccount);
const FormsElementsBundle = Bundle.generateBundle(loadFormsElements);
const StatisticsStatsBundle = Bundle.generateBundle(loadStatisticsStats);
const TablesStaticBundle = Bundle.generateBundle(loadTablesStatic);
const WidgetsBasicBundle = Bundle.generateBundle(loadWidgetsBasic);
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
        <div className={[s.wrap, this.props.sidebarState === 'hide' ? 'sidebar-hidden' : '', this.props.sidebarPosition === 'right' ? 'sidebar-right' : ''].join(' ')}>
          <Sidebar />
          <main className={[s.content].join(' ')}>
            <Switch>
              <Route path="/app" exact component={Dashboard} />
              <Route path="/app/ui/icons" exact component={UIIconsBundle} />
              <Route path="/app/ui/buttons" exact component={UIButtonsBundle} />
              <Route path="/app/ui/accordion" exact component={UIAccordionBundle} />
              <Route path="/app/ui/tabs" exact component={UITabsBundle} />
              <Route path="/app/ui/notifications" exact component={UINotificationsBundle} />
              <Route path="/app/ui/dialogs" exact component={UIDialogsBundle} />
              <Route path="/app/components/calendar" exact component={ComponentsCalendarBundle} />
              <Route path="/app/components/maps" exact component={ComponentsMapsBundle} />
              <Route path="/app/components/gallery" exact component={ComponentsGalleryBundle} />
              <Route path="/app/forms/account" exact component={FormsAccountBundle} />
              <Route path="/app/forms/elements" exact component={FormsElementsBundle} />
              <Route path="/app/statistics/stats" exact component={StatisticsStatsBundle} />
              <Route path="/app/tables/static" exact component={TablesStaticBundle} />
              <Route path="/app/widgets/basic" exact component={WidgetsBasicBundle} />
              <Route path="/app/special/search" exact component={SpecialSearchBundle} />
              <Route path="/app/special/invoice" exact component={SpecialInvoiceBundle} />
              <Route path="/app/special/inbox" component={SpecialInboxBundle} />
            </Switch>
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

