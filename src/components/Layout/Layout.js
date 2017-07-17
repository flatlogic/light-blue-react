/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { withRouter } from 'react-router';

// an example of react-router code-splitting
/* eslint-disable */
import loadNotFound from 'bundle-loader?lazy!../../pages/notFound/NotFound';
/* eslint-enable */

import s from './Layout.scss';
// import Header from '../Header';
// import Footer from '../Footer';
// import Sidebar from '../Sidebar';

// Dashboard component is loaded directly as an example of server side rendering
// import Dashboard from '../../pages/dashboard/Dashboard';

class Layout extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      sidebarOpen: false,
    };
  }

  render() {
    return (
      <div>Layout</div>
    );
  }
}

export default withRouter(withStyles(s)(Layout));
