import { Formik } from 'formik';
import React from 'react';
import Loader from 'components/Loader';
import InputFormItem from 'components/FormItems/items/InputFormItem';
import SwitchFormItem from 'components/FormItems/items/SwitchFormItem';
import RadioFormItem from 'components/FormItems/items/RadioFormItem';
import ImagesFormItem from 'components/FormItems/items/ImagesFormItem';
import usersFields from 'components/Users/usersFields';
import IniValues from 'components/FormItems/iniValues';
import PreparedValues from 'components/FormItems/preparedValues';
import FormValidations from 'components/FormItems/formValidations';
import Widget from 'components/Widget';

const UsersForm = (props) => {
  const iniValues = () => IniValues(usersFields, props.record || {});

  const formValidations = () => FormValidations(usersFields, props.record || {});

  const handleSubmit = (values) => {
    const { id, ...data } = PreparedValues(usersFields, values || {});
    props.onSubmit(id, data);
  };

  const title = () => {
    if (props.isProfile) {
      return 'Edit My Profile';
    }

    return props.isEditing
      ? 'Edit User'
      : 'Add User';
  };

  const renderForm = () => {
    const { saveLoading } = props;

    return (
      <Widget title={<h4>{title()}</h4>} collapse close>
        <Formik
          onSubmit={handleSubmit}
          initialValues={iniValues()}
          validationSchema={formValidations()}
          render={(form) => {
            return (
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

                { props.currentUser && props.currentUser.role === 'admin' && !props.isProfile &&
                  <>
                    {props.isProfile ? null : (
                      <>
                        <SwitchFormItem
                          name={'disabled'}
                          schema={usersFields}
                        />
                        <RadioFormItem
                          name={'role'}
                          schema={usersFields}
                        />
                      </>
                    )}
                  </>
                }

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
                    className="btn btn-primary me-3"
                    disabled={saveLoading}
                    type="button"
                    onClick={form.handleSubmit}
                  >
                    Save
                  </button>{' '}{' '}

                  <button
                    className="btn btn-light me-3"
                    type="button"
                    disabled={saveLoading}
                    onClick={form.handleReset}
                  >
                    Reset
                  </button>{' '}{' '}

                    <button
                      className="btn btn-light"
                      type="button"
                      disabled={saveLoading}
                      onClick={() => props.onCancel()}
                    >
                      Cancel
                    </button>
                </div>
              </form>
            );
          }}
        />
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
