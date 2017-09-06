import { TOGGLE_SIDEBAR, POSITION_SIDEBAR, TOGGLE_OPEN_SIDEBAR, CHANGE_ACTIVE_SIDEBAR_ITEM } from '../constants';

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

export function changeActiveSidebarItem(activeItem) {
  return {
    type: CHANGE_ACTIVE_SIDEBAR_ITEM,
    activeItem,
  };
}
