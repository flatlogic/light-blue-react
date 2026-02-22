import { combineReducers } from '@reduxjs/toolkit';
import auth from './auth';
import navigation from './navigation';
import alerts from './alerts';
import products from './products';
import analytics from './analytics';
import users from './usersReducers';
import layout from './layout';

export default combineReducers({
  alerts,
  auth,
  layout,
  navigation,
  products,
  analytics,
  users,
});
