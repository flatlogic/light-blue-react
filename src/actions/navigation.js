import { TOGGLE_SIDEBAR, POSITION_SIDEBAR, TOGGLE_OPEN_SIDEBAR } from '../constants';

export function toggleSidebar(state) {
  return {
    type: TOGGLE_SIDEBAR,
    state,
  };
}

export function positionSidebar(position) {
  return {
    type: POSITION_SIDEBAR,
    position,
  };
}

export function toggleOpenSidebar() {
  return {
    type: TOGGLE_OPEN_SIDEBAR,
  };
}
