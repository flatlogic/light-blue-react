import PropTypes from 'prop-types';
import React from 'react';
import ImagesUploader from 'components/FormItems/uploaders/ImagesUploader';
import FormErrors from 'components/FormItems/formErrors';
import { FastField } from 'formik';

const ImagesFormItemNotFast = (props) => {
  const {
    name,
    form,
    hint,
    path,
    fileProps,
    max,
    inputProps,
    required,
  } = props;

  const { label } = props.schema[name];

  return (
    <div className="form-group">
      {!!label && (
        <label
          className={`col-form-label ${
            required ? 'required' : null
          }`}
          htmlFor={name}
        >
          {label}
        </label>
      )}

      <br />

      <ImagesUploader
        path={path}
        schema={fileProps}
        value={form.values[name]}
        onChange={(value) => {
          form.setFieldValue(name, value);
          form.setFieldTouched(name);
        }}
        max={max}
        {...inputProps}
      />

      <div className="invalid-feedback">
        {FormErrors.displayableError(form, name)}
      </div>
      {!!hint && (
        <small className="form-text text-muted">
          {hint}
        </small>
      )}
    </div>
  );
};

ImagesFormItemNotFast.defaultProps = {
  max: undefined,
  required: false,
};

ImagesFormItemNotFast.propTypes = {
  path: PropTypes.string.isRequired,
  required: PropTypes.bool,
  form: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  hint: PropTypes.string,
  formItemProps: PropTypes.object,
  inputProps: PropTypes.object,
};

const ImagesFormItem = (props) => (
  <FastField name={props.name}>
    {({ form }) => (
      <ImagesFormItemNotFast
        {...props}
        form={form}
      />
    )}
  </FastField>
);

export default ImagesFormItem;
