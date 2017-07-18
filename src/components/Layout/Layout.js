import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { Switch, Route, withRouter } from 'react-router';

// an example of react-router code-splitting
/* eslint-disable */
import loadNotFound from 'bundle-loader?lazy!../../pages/notFound/NotFound';
/* eslint-enable */

import s from './Layout.scss';
import Header from '../Header';
import Sidebar from '../Sidebar';

// Dashboard component is loaded directly as an example of server side rendering
import Dashboard from '../../pages/dashboard/Dashboard';

class Layout extends React.Component {

  render() {
    return (
      <div className={s.root}>
        <Sidebar />
        <div className={s.wrap}>
          <Header />
          <main className={s.content}>
            <Switch>
              <Route path="/app" exact component={Dashboard} />
            </Switch>
          </main>
        </div>
      </div>
    );
  }
}

export default withRouter(withStyles(s)(Layout));
