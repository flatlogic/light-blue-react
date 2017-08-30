import { TOGGLE_SIDEBAR, POSITION_SIDEBAR, TOGGLE_OPEN_SIDEBAR } from '../constants';

const initialState = {
  sidebarPosition: 'left',
  sidebarState: 'show',
  sidebarOpen: false,
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
    default:
      return state;
  }
}
