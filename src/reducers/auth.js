import { createSlice } from '@reduxjs/toolkit';
import {
  LOGIN_REQUEST, LOGIN_SUCCESS, AUTH_FAILURE, LOGOUT_SUCCESS, RESET_REQUEST, RESET_SUCCESS,
  PASSWORD_RESET_EMAIL_REQUEST, PASSWORD_RESET_EMAIL_SUCCESS, AUTH_INIT_SUCCESS, AUTH_INIT_ERROR,
  REGISTER_REQUEST, REGISTER_SUCCESS
} from '../actions/auth';

const initialState = {
  isFetching: false,
  errorMessage: '',
  currentUser: null,
  loadingInit: true,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(LOGIN_REQUEST, (state) => {
        state.isFetching = true;
        state.errorMessage = '';
      })
      .addCase(RESET_REQUEST, (state) => {
        state.isFetching = true;
        state.errorMessage = '';
      })
      .addCase(PASSWORD_RESET_EMAIL_REQUEST, (state) => {
        state.isFetching = true;
        state.errorMessage = '';
      })
      .addCase(REGISTER_REQUEST, (state) => {
        state.isFetching = true;
        state.errorMessage = '';
      })
      .addCase(LOGIN_SUCCESS, (state) => {
        state.isFetching = false;
        state.errorMessage = '';
      })
      .addCase(LOGOUT_SUCCESS, (state) => {
        state.isFetching = false;
        state.errorMessage = '';
      })
      .addCase(RESET_SUCCESS, (state) => {
        state.isFetching = false;
        state.errorMessage = '';
      })
      .addCase(PASSWORD_RESET_EMAIL_SUCCESS, (state) => {
        state.isFetching = false;
        state.errorMessage = '';
      })
      .addCase(REGISTER_SUCCESS, (state) => {
        state.isFetching = false;
        state.errorMessage = '';
      })
      .addCase(AUTH_FAILURE, (state, action) => {
        state.isFetching = false;
        state.errorMessage = action.payload;
      })
      .addCase(AUTH_INIT_SUCCESS, (state, action) => {
        state.currentUser = action.payload.currentUser || null;
        state.loadingInit = false;
      })
      .addCase(AUTH_INIT_ERROR, (state) => {
        state.currentUser = null;
        state.loadingInit = false;
      });
  },
});

export default authSlice.reducer;
