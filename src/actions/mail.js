export const SELECT_FOLDER_NAME = 'SELECT_FOLDER_NAME';
export const TOGGLE_STAR_STATUS = 'TOGGLE_STAR_STATUS';

export function selectFolderName(folderName) {
  return {
    type: SELECT_FOLDER_NAME,
    folderName,
  };
}

export function toggleStarStatus(id) {
  return {
    type: TOGGLE_STAR_STATUS,
    id,
  };
}
