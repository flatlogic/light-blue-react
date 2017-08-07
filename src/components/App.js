import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route, Redirect, withRouter } from 'react-router';
import { connect, Provider as ReduxProvider } from 'react-redux';

import Bundle from '../core/Bundle';

/* eslint-disable */
import loadNotFound from 'bundle-loader?lazy!../pages/notFound/NotFound';
/* eslint-enable */

import LayoutComponent from '../components/Layout/Layout';
import LoginComponent from '../pages/login/Login';


const NotFoundBundle = Bundle.generateBundle(loadNotFound);


const ContextType = {
  // Enables critical path CSS rendering
  // https://github.com/kriasoft/isomorphic-style-loader
  insertCss: PropTypes.func.isRequired,
  // Universal HTTP client
  fetch: PropTypes.func.isRequired,
  // Integrate Redux
  // http://redux.js.org/docs/basics/UsageWithReact.html
  ...ReduxProvider.childContextTypes,
};


const PrivateRoute = ({ component, isAuthenticated, ...rest }) => ( // eslint-disable-line
  <Route
    {...rest} render={props => (
    isAuthenticated ? (
      React.createElement(component, props)
    ) : (
      <Redirect
        to={{
          pathname: '/login',
          state: { from: props.location }, // eslint-disable-line
        }}
      />
    )
  )}
  />
);

class App extends React.PureComponent {

  static propTypes = {
    context: PropTypes.shape(ContextType),
    isAuthenticated: PropTypes.bool.isRequired,
  };

  static defaultProps = {
    context: null,
  };


  static contextTypes = {
    router: PropTypes.any,
    store: PropTypes.any,
  };

  static childContextTypes = ContextType;

  getChildContext() {
    // fixme. find better solution?
    return this.props.context || this.context.router.staticContext;
  }

  render() {
    return (
      <Switch>
        <Route path="/" exact render={() => <Redirect to="/app" />} />
        <PrivateRoute isAuthenticated={this.props.isAuthenticated} path="/app" component={LayoutComponent} />
        <Route path="/login" exact component={LoginComponent} />
        <Route component={NotFoundBundle} />
      </Switch>
    );
  }
}

function mapStateToProps(store) {
  return {
    isAuthenticated: store.auth.isAuthenticated,
  };
}

export default withRouter(connect(mapStateToProps)(App));
