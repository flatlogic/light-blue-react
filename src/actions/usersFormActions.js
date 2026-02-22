import Errors from 'components/FormItems/error/errors';
import { push } from 'actions/navigation';
import { doInit } from 'actions/auth';
import { toast } from 'react-toastify';
import config from '../config';
import { mockUser } from '../actions/mock';
import { updatePassword } from '../services/authService';
import { createUser, findUser, updateUser } from '../services/usersService';

const actions = {
  doNew: () => {
    return {
      type: 'USERS_FORM_RESET',
    };
  },

  doFind: (id) => async (dispatch) => {
    if (!config.isBackend) {
      dispatch({
        type: 'USERS_FORM_FIND_SUCCESS',
        payload: mockUser,
      });
      return;
    }

    try {
      dispatch({
        type: 'USERS_FORM_FIND_STARTED',
      });

      const record = await findUser(id);

      dispatch({
        type: 'USERS_FORM_FIND_SUCCESS',
        payload: record,
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: 'USERS_FORM_FIND_ERROR',
      });

      dispatch(push('/admin/users'));
    }
  },

  doCreate: (values) => async (dispatch) => {
    try {
      dispatch({
        type: 'USERS_FORM_CREATE_STARTED',
      });

      if (config.isBackend) {
        await createUser(values);
      }

      dispatch({
        type: 'USERS_FORM_CREATE_SUCCESS',
      });

      toast.success('User created');
      dispatch(push('/admin/users'));
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: 'USERS_FORM_CREATE_ERROR',
      });
    }
  },

  doUpdate: (id, values, isProfile) => async (dispatch) => {
    try {
      dispatch({
        type: 'USERS_FORM_UPDATE_STARTED',
      });

      if (config.isBackend) {
        await updateUser(id, values);
      }

      dispatch(doInit());

      dispatch({
        type: 'USERS_FORM_UPDATE_SUCCESS',
      });

      if (isProfile) {
        toast.success('Profile updated');
      } else {
        toast.success('User updated');
        dispatch(push('/admin/users'));
      }
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: 'USERS_FORM_UPDATE_ERROR',
      });
    }
  },

  doChangePassword: ({newPassword, currentPassword}) => async (dispatch) => {
    try {
      dispatch({
        type: 'USERS_FORM_UPDATE_STARTED',
      });

      if (config.isBackend) {
        await updatePassword({newPassword, currentPassword});
      }

      dispatch({
        type: 'USERS_PASSWORD_UPDATE_SUCCESS',
      });
      dispatch({
        type: 'USERS_FORM_UPDATE_SUCCESS',
      });

      toast.success('Password has been updated');
      dispatch(push('/app/main'));

    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: 'USERS_FORM_UPDATE_ERROR',
      });
    }
  },
};

export default actions;
