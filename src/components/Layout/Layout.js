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
import loadUIDialogs from 'bundle-loader?lazy!../../pages/ui-elements/dialogs/Dialogs';
import loadFormsAccount from 'bundle-loader?lazy!../../pages/forms/account/Account';
import loadFormsElements from 'bundle-loader?lazy!../../pages/forms/elements/Elements';
import loadStatisticsStats from 'bundle-loader?lazy!../../pages/statistics/stats/Stats';
import loadTablesStatic from 'bundle-loader?lazy!../../pages/tables/static/Static';
import loadWidgetsBasic from 'bundle-loader?lazy!../../pages/widgets/basic/Basic';
import loadSpecialSearch from 'bundle-loader?lazy!../../pages/special/search/Search';
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
const UIDialogsBundle = Bundle.generateBundle(loadUIDialogs);
const FormsAccountBundle = Bundle.generateBundle(loadFormsAccount);
const FormsElementsBundle = Bundle.generateBundle(loadFormsElements);
const StatisticsStatsBundle = Bundle.generateBundle(loadStatisticsStats);
const TablesStaticBundle = Bundle.generateBundle(loadTablesStatic);
const WidgetsBasicBundle = Bundle.generateBundle(loadWidgetsBasic);
const SpecialSearchBundle = Bundle.generateBundle(loadSpecialSearch);

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
              <Route path="/app/ui/dialogs" exact component={UIDialogsBundle} />
              <Route path="/app/forms/account" exact component={FormsAccountBundle} />
              <Route path="/app/forms/elements" exact component={FormsElementsBundle} />
              <Route path="/app/statistics/stats" exact component={StatisticsStatsBundle} />
              <Route path="/app/tables/static" exact component={TablesStaticBundle} />
              <Route path="/app/widgets/basic" exact component={WidgetsBasicBundle} />
              <Route path="/app/special/search" exact component={SpecialSearchBundle} />
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

