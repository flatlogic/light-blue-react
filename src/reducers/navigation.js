import { createSlice } from '@reduxjs/toolkit';
import { CHANGE_SIDEBAR_VISIBILITY, CHANGE_SIDEBAR_POSITION, OPEN_SIDEBAR, CLOSE_SIDEBAR, CHANGE_ACTIVE_SIDEBAR_ITEM } from '../actions/navigation';

const initialState = {
  sidebarOpened: false,
  activeItem: window.location.pathname,
  sidebarPosition: 'left',
  sidebarVisibility: 'show',
  dashboardTheme: 'default'
};

const navigationSlice = createSlice({
  name: 'navigation',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(OPEN_SIDEBAR, (state) => {
        state.sidebarOpened = true;
      })
      .addCase(CLOSE_SIDEBAR, (state) => {
        state.sidebarOpened = false;
      })
      .addCase(CHANGE_SIDEBAR_POSITION, (state, action) => {
        state.sidebarPosition = action.payload;
      })
      .addCase(CHANGE_SIDEBAR_VISIBILITY, (state, action) => {
        state.sidebarVisibility = action.payload;
      })
      .addCase(CHANGE_ACTIVE_SIDEBAR_ITEM, (state, action) => {
        state.activeItem = action.activeItem;
      });
  },
});

export default navigationSlice.reducer;
