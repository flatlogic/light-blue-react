import {
  TOGGLE_STAR_STATUS,
  SET_READ_STATUS,
  SET_SELECT_STATUS,
  DELETE_MAIL,
  TOGGLE_ALL_CHECKED,
  CHANGE_FILTERED_MAILS,
} from '../constants';

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

