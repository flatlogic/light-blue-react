import { TOGGLE_SIDEBAR, POSITION_SIDEBAR } from '../constants';

const initialState = {
  sidebarPosition: 'left',
  sidebarState: 'show',
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
    default:
      return state;
  }
}
