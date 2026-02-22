import React from 'react';
import PropTypes from 'prop-types';
import Formsy from 'formsy-react';

Formsy.addValidationRule('isRange', (values, value, array) => (value >= array[0] && value <= array[1]));

const InputValidation = (props) => {
  const changeValue = (event) => {
    props.setValue(event.currentTarget.value);
  };

  const errorMessageObj = (props.isFormSubmitted() || props.trigger) ? props.getErrorMessage() : null;
  const required = (props.isFormSubmitted() && props.showRequired()) ?
    <span className={'help-block text-danger'}>This value is required.</span> : null;
  const errorMsg = [];
  if (errorMessageObj) {
    Object.keys(errorMessageObj).forEach((type) => {
      errorMsg.push(errorMessageObj[type]);
    });
  }
  const errorList = errorMsg.map((msg, index) =>
    <span key={`msg-err-${index.toString()}`} className={'help-block text-danger'}>{msg}</span>,
  );

  return (
    <div className={props.className}>
      <input
        type={props.type}
        name={props.name}
        id={props.id}
        className={'form-control'}
        onBlur={changeValue}
        placeholder={props.placeholder}
      />
      {required}
      {errorList}
    </div>
  );
};

InputValidation.propTypes = {
  trigger: PropTypes.string,
  type: PropTypes.string,
  className: PropTypes.string,
  name: PropTypes.string,
  id: PropTypes.string,
  placeholder: PropTypes.string,
  setValue: PropTypes.func,
  isFormSubmitted: PropTypes.func,
  getErrorMessage: PropTypes.func,
  showRequired: PropTypes.func,
};

InputValidation.defaultProps = {
  trigger: null,
  type: 'text',
  className: '',
  name: '',
  id: '',
  placeholder: '',
};

export default Formsy.HOC(InputValidation);
