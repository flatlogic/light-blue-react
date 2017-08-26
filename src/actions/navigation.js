import { TOGGLE_SIDEBAR, POSITION_SIDEBAR } from '../constants';

export function toggleSidebar(state) {
  return {
    type: TOGGLE_SIDEBAR,
    state: state
  };
}

export function positionSidebar(position) {
  return {
    type: POSITION_SIDEBAR,
    position: position
  };
}
