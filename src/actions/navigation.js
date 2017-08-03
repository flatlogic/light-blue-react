import { HIDE_SIDEBAR, OPEN_SIDEBAR, MUVE_SIDEBAR } from '../constants';

export function hideSidebar() {
  return {
    type: HIDE_SIDEBAR,
  };
}

export function openSidebar() {
  return {
    type: OPEN_SIDEBAR,
  };
}

export function moveSidebar() {
  return {
    type: MUVE_SIDEBAR,
  };
}
