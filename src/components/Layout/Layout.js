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

  constructor(props) {
    super(props);

    this.togleSidebar = this.togleSidebar.bind(this);

    this.state = {
      openSidebar: false,
    };
  }

  togleSidebar() {
    this.setState({ openSidebar: !this.state.openSidebar });
  }

  render() {
    return (
      <div className={[s.root, this.props.sidebarHidden ? s.sidebarHidden : '', this.props.sidebarRight ? s.sidebarRight : ''].join(' ')}>
        <div className={s.logo}>
          <h4><a>Light <strong>Blue</strong></a></h4>
        </div>
        <Sidebar openSidebar={this.state.openSidebar} />
        <div className={s.wrap}>
          <Header togleSidebar={this.togleSidebar} />
          <main className={s.content}>
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

