import { combineReducers } from 'redux';
import auth from './auth';
import navigation from './navigation';
import alerts from './alerts';
import products from './products';
import analytics from './analytics';
import users from './usersReducers';
import layout from './layout';
import { connectRouter } from 'connected-react-router';

export default (history) =>
  combineReducers({
    router: connectRouter(history),
    alerts,
    auth,
    layout,
    navigation,
    products,
    analytics,
    users,
});
