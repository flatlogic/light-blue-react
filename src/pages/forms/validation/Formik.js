import { Formik } from 'formik';
import React from 'react';
import Loader from 'components/Loader';
import InputFormItem from 'components/FormItems/items/InputFormItem';
import SwitchFormItem from 'components/FormItems/items/SwitchFormItem';
import RadioFormItem from 'components/FormItems/items/RadioFormItem';
import ImagesFormItem from 'components/FormItems/items/ImagesFormItem';
import usersFields from 'components/Users/usersFields';
import IniValues from 'components/FormItems/iniValues';
import FormValidations from 'components/FormItems/formValidations';

const passwordSchema = {
  currentPassword: { type: 'string', label: 'Current Password' },
  newPassword: { type: 'string', label: 'New Password' },
  confirmNewPassword: { type: 'string', label: 'Confirm new Password' },
};

const UsersForm = (props) => {
  const { isEditing, findLoading, record, saveLoading } = props;
  const iniValues = () => IniValues(usersFields, record || {});
  const formValidations = () => FormValidations(usersFields, record || {});
  const handleSubmit = () => null;

  const renderForm = () => (
      <Formik
        onSubmit={handleSubmit}
        initialValues={iniValues()}
        validationSchema={formValidations()}
      >
        {(form) => (
          <form onSubmit={form.handleSubmit}>

              <InputFormItem
                name={'firstName'}
                schema={usersFields}
              />

              <InputFormItem
                name={'lastName'}
                schema={usersFields}
              />

              <InputFormItem
                name={'phoneNumber'}
                schema={usersFields}
              />

              <InputFormItem
                name={'email'}
                schema={usersFields}
              />

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

              <>
                <RadioFormItem
                  name={'role'}
                  schema={usersFields}
                />

                <SwitchFormItem
                  name={'disabled'}
                  schema={usersFields}
                />
              </>

              <ImagesFormItem
                name={'avatar'}
                schema={usersFields}
                path={'users/avatar'}
                fileProps={{
                  size: undefined,
                  formats: undefined,
                }}
                max={undefined}
              />

              <div className="form-buttons">
                <button
                  className="btn btn-primary me-4"
                  disabled={saveLoading}
                  type="button"
                  onClick={form.handleSubmit}
                >
                  Save
                </button>{' '}{' '}

                <button
                  className="btn btn-default"
                  type="button"
                  disabled={saveLoading}
                  onClick={form.handleReset}
                >
                  Reset
                </button>{' '}{' '}
              </div>
          </form>
        )}
      </Formik>
  );

  if (findLoading) {
    return <Loader />;
  }

  if (isEditing && !record) {
    return <Loader />;
  }

  return renderForm();
};

export default UsersForm;
