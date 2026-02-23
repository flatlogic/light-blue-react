import { Formik } from 'formik';
import React from 'react';
import Loader from 'components/Loader';
import InputFormItem from '../../../components/FormItems/items/InputFormItem';
import Widget from 'components/Widget';

const UsersForm = (props) => {
  const handleSubmit = (values) => {
    const { ...data } = values || {};
    props.onSubmit(data);
  };

  const title = () => 'Change Password';

  const passwordSchema = {
    currentPassword: { type: 'string', label: 'Current Password' },
    newPassword: { type: 'string', label: 'New Password' },
    confirmNewPassword: { type: 'string', label: 'Confirm new Password' },
  };
  const initialValues = {
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  };

  const renderForm = () => {
    const { saveLoading } = props;

    return (
      <Widget title={<h4>{title()}</h4>} collapse close>
        <Formik
          onSubmit={handleSubmit}
          initialValues={initialValues}
        >
          {(form) => (
            <form onSubmit={form.handleSubmit}>

                <InputFormItem
                  name={'currentPassword'}
                  password
                  schema={passwordSchema}
                />

                <InputFormItem
                  name={'newPassword'}
                  schema={passwordSchema}
                  password
                />

                <InputFormItem
                  name={'confirmNewPassword'}
                  schema={passwordSchema}
                  password
                />

                <div className="form-buttons">
                  <button
                    className="btn btn-primary me-3"
                    disabled={saveLoading}
                    type="button"
                    onClick={form.handleSubmit}
                  >
                    {' '}
                    Change Password
                  </button>{' '}

                  <button
                    className="btn btn-light"
                    type="button"
                    disabled={saveLoading}
                    onClick={() => props.onCancel()}
                  >
                    {' '}
                    Cancel
                  </button>
                </div>
            </form>
          )}
        </Formik>
      </Widget>
    );
  };

  const { isEditing, findLoading, record } = props;

  if (findLoading) {
    return <Loader />;
  }

  if (isEditing && !record) {
    return <Loader />;
  }

  return renderForm();
};

export default UsersForm;
