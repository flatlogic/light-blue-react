import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
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

  render() {
    return (
      <div className={s.root}>
        <div className={s.logo}>
          <h4><a>Light <strong>Blue</strong></a></h4>
        </div>
        <Sidebar />
        <div className={s.wrap}>
          <Header />
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

export default withRouter(withStyles(s)(Layout));
