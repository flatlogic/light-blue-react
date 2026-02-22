import { createSlice } from '@reduxjs/toolkit';

const initialData = {
  count: 0,
  idToDelete: null,
  rows: [],
  loading: false,
  modalOpen: false,
};

const usersListSlice = createSlice({
  name: 'usersList',
  initialState: initialData,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase('USERS_LIST_FETCH_STARTED', (state) => {
        state.loading = true;
      })
      .addCase('USERS_LIST_FETCH_SUCCESS', (state, action) => {
        state.loading = false;
        state.rows = action.payload.rows;
        state.count = action.payload.count;
      })
      .addCase('USERS_LIST_FETCH_ERROR', (state) => {
        state.loading = false;
        state.count = 0;
        state.rows = [];
      })
      .addCase('USERS_LIST_DELETE_STARTED', (state) => {
        state.loading = true;
      })
      .addCase('USERS_LIST_DELETE_SUCCESS', (state) => {
        state.loading = false;
        state.idToDelete = null;
        state.modalOpen = false;
      })
      .addCase('USERS_LIST_DELETE_ERROR', (state) => {
        state.loading = false;
        state.idToDelete = null;
        state.modalOpen = false;
      })
      .addCase('USERS_LIST_OPEN_CONFIRM', (state, action) => {
        state.loading = false;
        state.modalOpen = true;
        state.idToDelete = action.payload.id;
      })
      .addCase('USERS_LIST_CLOSE_CONFIRM', (state) => {
        state.loading = false;
        state.idToDelete = null;
        state.modalOpen = false;
      });
  },
});

export default usersListSlice.reducer;
