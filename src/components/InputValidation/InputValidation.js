import React from 'react';
import PropTypes from 'prop-types';
import { addValidationRule, withFormsy } from 'formsy-react';

addValidationRule('isRange', (values, value, array) => (value >= array[0] && value <= array[1]));

const resolveMaybeFn = (value) => {
  if (typeof value === 'function') {
    return value();
  }

  return Boolean(value);
};

const collectErrorMessages = (value) => {
  const result = [];

  const visit = (message) => {
    if (message === null || message === undefined || message === false) {
      return;
    }

    if (Array.isArray(message)) {
      message.forEach(visit);
      return;
    }

    if (React.isValidElement(message) || typeof message === 'string' || typeof message === 'number') {
      result.push(message);
      return;
    }

    if (typeof message === 'object') {
      Object.values(message).forEach(visit);
      return;
    }

    result.push(String(message));
  };

  visit(value);
  return result;
};

const InputValidation = (props) => {
  const changeValue = (event) => {
    props.setValue(event.currentTarget.value);
  };

  const isFormSubmitted = resolveMaybeFn(props.isFormSubmitted);
  const showRequired = resolveMaybeFn(props.showRequired);
  const errorSource = (isFormSubmitted || props.trigger)
    ? (props.errorMessages && props.errorMessages.length > 0
      ? props.errorMessages
      : props.errorMessage || (typeof props.getErrorMessage === 'function' ? props.getErrorMessage() : null))
    : null;
  const required = (isFormSubmitted && showRequired) ?
    <span className={'help-block text-danger'}>This value is required.</span> : null;
  const errorMsg = collectErrorMessages(errorSource);

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
  isFormSubmitted: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
  errorMessage: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  errorMessages: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.node])),
  getErrorMessage: PropTypes.func,
  showRequired: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
};

InputValidation.defaultProps = {
  trigger: null,
  type: 'text',
  className: '',
  name: '',
  id: '',
  placeholder: '',
};

export default withFormsy(InputValidation);
