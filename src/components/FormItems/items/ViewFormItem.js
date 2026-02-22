import React from 'react';
import PropTypes from 'prop-types';
import { FastField } from 'formik';

const ViewFormItemNotFast = ({ label, name, form }) => (
  <div className="form-group">
    <label className="col-form-label" htmlFor={name}>
      {label}
    </label>
    <input
      type="text"
      readOnly
      className="form-control-plaintext"
      id={name}
      value={form.values[name]}
    />
  </div>
);

ViewFormItemNotFast.defaultProps = {};

ViewFormItemNotFast.propTypes = {
  form: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
};

const ViewFormItem = (props) => (
  <FastField
    name={props.name}
    render={({ form }) => (
      <ViewFormItemNotFast
        {...props}
        form={form}
      />
    )}
  />
);

export default ViewFormItem;
