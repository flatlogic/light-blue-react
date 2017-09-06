import { TOGGLE_SIDEBAR, POSITION_SIDEBAR, TOGGLE_OPEN_SIDEBAR, CHANGE_ACTIVE_SIDEBAR_ITEM } from '../constants';

const initialState = {
  sidebarPosition: 'left',
  sidebarState: 'show',
  sidebarOpen: false,
  activeItem: null,
};

export default function runtime(state = initialState, action) {
  switch (action.type) {
    case TOGGLE_SIDEBAR:
      return {
        ...state,
        sidebarState: action.state,
      };
    case POSITION_SIDEBAR:
      return {
        ...state,
        sidebarPosition: action.position,
      };
    case TOGGLE_OPEN_SIDEBAR:
      return {
        ...state,
        sidebarOpen: !state.sidebarOpen,
      };
    case CHANGE_ACTIVE_SIDEBAR_ITEM:
      return {
        ...state,
        activeItem: action.activeItem,
      };
    default:
      return state;
  }
}
