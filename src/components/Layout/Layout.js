import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { connect } from 'react-redux';
import { Switch, Route, withRouter } from 'react-router';

// an example of react-router code-splitting
/* eslint-disable */
import loadAnother from 'bundle-loader?lazy!../../pages/another/Another';
/* eslint-enable */

import s from './Layout.scss';
import Header from '../Header';
import Sidebar from '../Sidebar';
import Bundle from '../../core/Bundle';

// Dashboard component is loaded directly as an example of server side rendering
import Dashboard from '../../pages/dashboard/Dashboard';

const AnotherBundle = Bundle.generateBundle(loadAnother);

class Layout extends React.Component {

  static propTypes = {
    sidebarHidden: PropTypes.bool.isRequired,
    sidebarRight: PropTypes.bool.isRequired,
  };

  render() {
    return (
      <div className={[s.root, this.props.sidebarHidden ? s.sidebarHidden : '', this.props.sidebarRight ? s.sidebarRight : ''].join(' ')}>
        <Header toggleSidebar={this.toggleSidebar} />
        <div className={s.wrap}>
          <Sidebar />
          <main className={[s.content].join(' ')}>
            <Switch>
              <Route path="/app" exact component={Dashboard} />
              <Route path="/app/another" exact component={AnotherBundle} />
            </Switch>
          </main>
        </div>
      </div>
    );
  }
}

function mapStateToProps(store) {
  return {
    sidebarHidden: store.navigation.sidebarHidden,
    sidebarRight: store.navigation.sidebarRight,
  };
}

export default withRouter(connect(mapStateToProps)(withStyles(s)(Layout)));

