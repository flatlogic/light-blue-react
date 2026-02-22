import { createSlice } from '@reduxjs/toolkit';

const initialData = {
  loading: false,
  findLoading: false,
  saveLoading: false,
  record: null,
};

const usersFormSlice = createSlice({
  name: 'usersForm',
  initialState: initialData,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase('USERS_FORM_RESET', () => ({
        ...initialData,
      }))
      .addCase('USERS_FORM_FIND_STARTED', (state) => {
        state.record = null;
        state.loading = true;
        state.findLoading = true;
      })
      .addCase('USERS_FORM_FIND_SUCCESS', (state, action) => {
        state.record = action.payload;
        state.loading = false;
        state.findLoading = false;
      })
      .addCase('USERS_FORM_FIND_ERROR', (state) => {
        state.record = null;
        state.loading = false;
        state.findLoading = false;
      })
      .addCase('USERS_FORM_CREATE_STARTED', (state) => {
        state.saveLoading = true;
      })
      .addCase('USERS_FORM_CREATE_SUCCESS', (state) => {
        state.saveLoading = false;
      })
      .addCase('USERS_FORM_CREATE_ERROR', (state) => {
        state.saveLoading = false;
      })
      .addCase('USERS_FORM_UPDATE_STARTED', (state) => {
        state.saveLoading = true;
      })
      .addCase('USERS_FORM_UPDATE_SUCCESS', (state) => {
        state.saveLoading = false;
      })
      .addCase('USERS_FORM_UPDATE_ERROR', (state) => {
        state.saveLoading = false;
      })
      .addCase('USERS_PASSWORD_UPDATE_SUCCESS', (state) => {
        state.saveLoading = false;
      });
  },
});

export default usersFormSlice.reducer;
