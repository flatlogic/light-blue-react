import { createSlice } from '@reduxjs/toolkit';
import { 
  CHANGE_THEME,
  CHANGE_SIDEBAR_COLOR,
  CHANGE_THEME_COLOR,
  NAVBAR_TYPE_TOGGLE,
  SIDEBAR_TYPE_TOGGLE
} from '../actions/layout';

import config from '../config'

export const DashboardThemes = {
  LIGHT: "light",
  DARK: "dark"
};

export const SidebarTypes = {
  SOLID: "solid",
  TRANSPARENT: "transparent",
}

export const NavbarTypes = {
  STATIC: "static",
  FLOATING: "floating",
}

export const LayoutComponents = {
  NAVBAR: "navbar",
  SIDEBAR: "sidebar"
}

Object.freeze(DashboardThemes);
Object.freeze(SidebarTypes);
Object.freeze(NavbarTypes);
Object.freeze(LayoutComponents);

const defaultState = {
  dashboardTheme: DashboardThemes.DARK,
  sidebarColor: DashboardThemes.DARK,
  themeColor:  config.app.colors.light,
  navbarType: NavbarTypes.STATIC,
  sidebarType: SidebarTypes.SOLID
};

const layoutSlice = createSlice({
  name: 'layout',
  initialState: defaultState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(CHANGE_THEME, (state, action) => {
        state.dashboardTheme = action.payload;
      })
      .addCase(CHANGE_SIDEBAR_COLOR, (state, action) => {
        state.sidebarColor = action.payload;
      })
      .addCase(CHANGE_THEME_COLOR, (state, action) => {
        state.themeColor = action.payload;
      })
      .addCase(NAVBAR_TYPE_TOGGLE, (state, action) => {
        state.navbarType = action.payload;
      })
      .addCase(SIDEBAR_TYPE_TOGGLE, (state, action) => {
        state.sidebarType = action.payload;
      });
  },
});

export default layoutSlice.reducer;
