import list from './usersListReducers';
import form from './usersFormReducers';
import { combineReducers } from '@reduxjs/toolkit';

export default combineReducers({
  list,
  form,
});
