import React, { useEffect } from 'react';
import UsersView from 'components/Users/view/UsersView';
import actions from 'actions/usersFormActions';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

function UsersPage() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const loading = useSelector((store) => store.users.form.findLoading);
  const record = useSelector((store) => store.users.form.record);

  useEffect(() => {
    if (id) {
      dispatch(actions.doFind(id));
    }
  }, [dispatch, id]);

  return (
    <React.Fragment>
      <UsersView
        loading={loading}
        record={record}
      />
    </React.Fragment>
  );
}

export default UsersPage;
