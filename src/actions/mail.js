export const TOGGLE_STAR_STATUS = 'TOGGLE_STAR_STATUS';
export const SET_READ_STATUS = 'TOGGLE_READ_STATUS';
export const SET_SELECT_STATUS = 'SET_SELECT_STATUS';
export const DELETE_MAIL = 'DELETE_MAIL';
export const TOGGLE_ALL_CHECKED = 'TOGGLE_ALL_CHECKED';
export const CHANGE_FILTERED_MAILS = 'CHANGE_FILTERED_MAILS';

export function changeFilteredMails(folderName) {
  return {
    type: CHANGE_FILTERED_MAILS,
    folderName,
  };
}

export function toggleStarStatus(id) {
  return {
    type: TOGGLE_STAR_STATUS,
    id,
  };
}

export function setReadStatus(id, state) {
  return {
    type: SET_READ_STATUS,
    id,
    state,
  };
}

export function setSelectStatus(id, state) {
  return {
    type: SET_SELECT_STATUS,
    id,
    state,
  };
}

export function deleteMail(id) {
  return {
    type: DELETE_MAIL,
    id,
  };
}

export function toggleAllChecked(state) {
  return {
    type: TOGGLE_ALL_CHECKED,
    state,
  };
}

