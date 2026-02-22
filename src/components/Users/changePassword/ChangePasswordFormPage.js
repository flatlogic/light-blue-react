import React, { useEffect, useState } from 'react';
import ChangePasswordForm from 'components/Users/changePassword/ChangePasswordForm';
import { push } from 'actions/navigation';
import actions from '../../../actions/usersFormActions';
import { useDispatch, useSelector } from 'react-redux';
import { Alert } from 'reactstrap';
import cx from 'classnames';

import s from '../Users.module.scss';

function ChangePasswordFormPage() {
  const dispatch = useDispatch();
  const findLoading = useSelector((store) => store.users.form.findLoading);
  const saveLoading = useSelector((store) => store.users.form.saveLoading);
  const [promoAlert, setPromoAlert] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setPromoAlert(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const doSubmit = (data) => {
    dispatch(actions.doChangePassword(data));
  };

  return (
    <React.Fragment>
      <div className="page-top-line">
        <h2 className="page-title">User - <span className="fw-semi-bold">Password</span></h2>
        <Alert
          color="success"
          className={cx(s.promoAlert, {[s.showAlert]: promoAlert})}
        >
          This page is only available in <a className="text-white font-weight-bold" rel="noreferrer noopener" href="https://flatlogic.com/admin-dashboards/sing-app-react-node-js" target="_blank">Sing App React with Node.js</a> integration!
        </Alert>
      </div>
      <ChangePasswordForm
        saveLoading={saveLoading}
        findLoading={findLoading}
        onSubmit={doSubmit}
        onCancel={() => dispatch(push('/app/main'))}
      />
    </React.Fragment>
  );
}

export default ChangePasswordFormPage;
