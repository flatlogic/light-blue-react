import { TOGGLE_VISIBILITY_SIDEBAR, POSITION_SIDEBAR, TOGGLE_SIDEBAR, CHANGE_ACTIVE_SIDEBAR_ITEM } from '../constants';

export function toggleVisibilitySidebar(state) {
  return {
    type: TOGGLE_VISIBILITY_SIDEBAR,
    state,
  };
}

export function positionSidebar(position) {
  return {
    type: POSITION_SIDEBAR,
    position,
  };
}

export function toggleSidebar() {
  return {
    type: TOGGLE_SIDEBAR,
  };
}

export function changeActiveSidebarItem(activeItem) {
  return {
    type: CHANGE_ACTIVE_SIDEBAR_ITEM,
    activeItem,
  };
}
