import { HIDE_SIDEBAR, OPEN_SIDEBAR, MUVE_SIDEBAR } from '../constants';

const initialState = {
  sidebarOpened: false,
  sidebarRight: false,
  sidebarHidden: false,
};

export default function runtime(state = initialState, action) {
  switch (action.type) {
    case HIDE_SIDEBAR:
      return {
        ...state,
        sidebarHidden: !state.sidebarHidden,
      };
    case OPEN_SIDEBAR:
      return {
        ...state,
        sidebarOpened: !state.sidebarOpened,
      };
    case MUVE_SIDEBAR:
      return {
        ...state,
        sidebarRight: !state.sidebarRight,
      };
    default:
      return state;
  }
}
