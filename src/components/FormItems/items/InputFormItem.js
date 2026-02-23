import React from 'react';
import PropTypes from 'prop-types';
import FormErrors from '../formErrors';
import { FastField } from 'formik';

export const InputFormItemNotFast = (props) => {
  const {
    name,
    form,
    hint,
    size,
    password,
    placeholder,
    autoFocus,
    autoComplete,
    inputProps,
    errorMessage,
    required,
  } = props;
  const schemaField = props.schema ? props.schema[name] : undefined;
  const label = schemaField ? schemaField.label : '';

  const sizeLabelClassName =
    {
      small: 'col-form-label-sm',
      large: 'col-form-label-lg',
    }[size] || '';

  const sizeInputClassName =
    {
      small: 'form-control-sm',
      large: 'form-control-lg',
    }[size] || '';

  return (
    <div className="form-group">
      {!!label && (
        <label
          className={`col-form-label ${
            required ? 'required' : null
          } ${sizeLabelClassName}`}
          htmlFor={name}
        >
          {label}
        </label>
      )}
      <input
        id={name}
        type={password ? 'password' : 'text'}
        onChange={(event) => {
          form.setFieldValue(name, event.target.value);
          form.setFieldTouched(name);
        }}
        value={(form.values && form.values[name]) || ''}
        placeholder={placeholder || undefined}
        autoFocus={autoFocus || undefined}
        autoComplete={autoComplete || undefined}
        className={`form-control ${sizeInputClassName} ${FormErrors.validateStatus(
          form,
          name,
          errorMessage,
        )}`}
        {...inputProps}
      />
      <div className="invalid-feedback">
        {FormErrors.displayableError(
          form,
          name,
          errorMessage,
        )}
      </div>
      {!!hint && (
        <small className="form-text text-muted">
          {hint}
        </small>
      )}
    </div>
  );
};

InputFormItemNotFast.defaultProps = {
  required: false,
};

InputFormItemNotFast.propTypes = {
  form: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  required: PropTypes.bool,
  type: PropTypes.string,
  hint: PropTypes.string,
  autoFocus: PropTypes.bool,
  size: PropTypes.string,
  prefix: PropTypes.string,
  placeholder: PropTypes.string,
  errorMessage: PropTypes.string,
  inputProps: PropTypes.object,
};

const InputFormItem = (props) => (
  <FastField name={props.name}>
    {({ form }) => (
      <InputFormItemNotFast
        {...props}
        form={form}
      />
    )}
  </FastField>
);

export default InputFormItem;
