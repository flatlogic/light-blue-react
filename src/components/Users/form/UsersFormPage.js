import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom';
import { Alert } from 'reactstrap';
import cx from 'classnames';

import UsersForm from 'components/Users/form/UsersForm';
import { push } from 'actions/navigation';
import actions from '../../../actions/usersFormActions';
import s from '../Users.module.scss';

const UsersFormPage = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { id } = useParams();
  const [dispatched, setDispatched] = useState(false);
  const [promoAlert, setPromoAlert] = useState(false);
  const findLoading = useSelector((store) => store.users.form.findLoading);
  const saveLoading = useSelector((store) => store.users.form.saveLoading);
  const record = useSelector((store) => store.users.form.record);
  const currentUser = useSelector((store) => store.auth.currentUser);

  const getCurrentUserId = () => {
    if (currentUser) {
      return currentUser.id || (currentUser.user && currentUser.user.id) || currentUser.sub || null;
    }

    try {
      const storedUser = JSON.parse(localStorage.getItem('user'));
      return (storedUser && (storedUser.id || (storedUser.user && storedUser.user.id) || storedUser.sub)) || null;
    } catch (error) {
      return null;
    }
  };

  const currentUserId = getCurrentUserId();
  const isEditing = Boolean(id);
  const isProfile = (id && id === String(currentUserId)) || location.pathname === '/app/edit_profile';

  useEffect(() => {
    if (isEditing) {
      dispatch(actions.doFind(id));
    } else if (isProfile) {
      if (currentUserId) {
        dispatch(actions.doFind(currentUserId));
      } else {
        dispatch(actions.doNew());
      }
    } else {
      dispatch(actions.doNew());
    }

    setDispatched(true);
    const timeoutId = setTimeout(() => {
      setPromoAlert(true);
    }, 100);

    return () => clearTimeout(timeoutId);
  }, [dispatch, id, isEditing, isProfile, currentUserId]);

  const doSubmit = (recordId, data) => {
    if (isEditing || isProfile) {
      dispatch(actions.doUpdate(recordId, data, isProfile));
    } else {
      dispatch(actions.doCreate(data));
    }
  };

  return (
    <React.Fragment>
      <div className="page-top-line">
        <h2 className="page-title">User - <span className="fw-semi-bold">Password</span></h2>
        <Alert
          color="success"
          className={cx(s.promoAlert, {[s.showAlert]: promoAlert})}
        >
          This page is only available in <a className="text-white font-weight-bold" rel="noreferrer noopener" href="https://flatlogic.com/templates/light-blue-react-node-js" target="_blank">Light Blue React with Node.js/.NET</a> integration!
        </Alert>
      </div>
      {dispatched && (
        <UsersForm
          saveLoading={saveLoading}
          findLoading={findLoading}
          currentUser={currentUser}
          record={(isEditing || isProfile) ? record : {}}
          isEditing={isEditing}
          isProfile={isProfile}
          onSubmit={doSubmit}
          onCancel={() => dispatch(push('/admin/users'))}
        />
      )}
    </React.Fragment>
  );
};

export default UsersFormPage;
