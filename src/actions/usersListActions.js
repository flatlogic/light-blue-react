import Errors from 'components/FormItems/error/errors';
import config from '../config';
import { mockUser } from '../actions/mock';
import { deleteUser, listUsers } from '../services/usersService';

function normalizeUsersPayload(response) {
  if (Array.isArray(response)) {
    return {
      rows: response,
      count: response.length,
    };
  }

  const rows = Array.isArray(response && response.rows) ? response.rows : [];
  const count = typeof (response && response.count) === 'number' ? response.count : rows.length;

  return {
    rows,
    count,
  };
}

const actions = {

  doFetch: (filter, keepPagination = false) => async (dispatch) => {
    if (!config.isBackend) {
      dispatch({
        type: 'USERS_LIST_FETCH_SUCCESS',
        payload: {
          rows: [mockUser],
          count: 1,
        },
      });
    } else {
      try {
        dispatch({
          type: 'USERS_LIST_FETCH_STARTED',
          payload: { filter, keepPagination },
        });

        const response = await listUsers();
        const payload = normalizeUsersPayload(response);

        dispatch({
          type: 'USERS_LIST_FETCH_SUCCESS',
          payload,
        });
      } catch (error) {
        Errors.handle(error);

        dispatch({
          type: 'USERS_LIST_FETCH_ERROR',
        });
      }
    }
  },

  doDelete: (id) => async (dispatch) => {
    if (!config.isBackend) {
      dispatch({
        type: 'USERS_LIST_DELETE_ERROR',
      });
    } else {
      try {
        dispatch({
          type: 'USERS_LIST_DELETE_STARTED',
        });
  
        await deleteUser(id);
  
        dispatch({
          type: 'USERS_LIST_DELETE_SUCCESS',
        });
  
        const response = await listUsers();
        const payload = normalizeUsersPayload(response);
        dispatch({
          type: 'USERS_LIST_FETCH_SUCCESS',
          payload,
        });
  
      } catch (error) {
        Errors.handle(error);
  
        dispatch({
          type: 'USERS_LIST_DELETE_ERROR',
        });
      }
    }
  },
  doOpenConfirm: (id) => async (dispatch) => {
      dispatch({
        type: 'USERS_LIST_OPEN_CONFIRM',
        payload: {
          id: id
        },
      });
  },
  doCloseConfirm: () => async (dispatch) => {
      dispatch({
        type: 'USERS_LIST_CLOSE_CONFIRM',
      });
  },
};


export default actions;
