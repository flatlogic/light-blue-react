import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';

const DEFAULT_MESSAGES = {
  isEmail: 'This value should be a valid email.',
  isNumeric: 'This value should be a valid number.',
  isRange: 'This value is out of range.',
  isUrl: 'This value should be a valid url.',
  isAlpha: 'Only letters are allowed.',
  isAlphanumeric: 'Only letters and numbers are allowed.',
  minLength: 'This value is too short.',
  equalsField: 'This value should be the same.',
};

const EMAIL_REGEXP = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const NUMERIC_REGEXP = /^[-+]?(?:\d*[.])?\d+$/;
const ALPHA_REGEXP = /^[A-Z]+$/i;
const ALPHANUMERIC_REGEXP = /^[0-9A-Z]+$/i;

const parseValidationString = (validations) => {
  if (!validations) {
    return {};
  }

  const [name, rawArg] = validations.split(':');

  if (!rawArg) {
    return { [name]: true };
  }

  if (name === 'isRange') {
    try {
      return { [name]: JSON.parse(rawArg) };
    } catch (error) {
      return { [name]: null };
    }
  }

  return { [name]: rawArg };
};

const normalizeRules = (validations) => {
  if (!validations) {
    return {};
  }

  if (typeof validations === 'string') {
    return parseValidationString(validations);
  }

  return validations;
};

const isEmpty = (value) => value === undefined || value === null || String(value).trim() === '';

const isValidUrl = (value) => {
  try {
    const parsed = new URL(value);
    return parsed.protocol === 'http:' || parsed.protocol === 'https:';
  } catch (error) {
    return false;
  }
};

const validateValue = ({ value, validations, required, validationErrors, formValues }) => {
  const errors = [];

  if (required && isEmpty(value)) {
    errors.push('This value is required.');
    return errors;
  }

  if (isEmpty(value)) {
    return errors;
  }

  Object.entries(validations).forEach(([rule, ruleValue]) => {
    let isValid = true;

    switch (rule) {
      case 'isEmail':
        isValid = EMAIL_REGEXP.test(String(value));
        break;
      case 'isNumeric':
        isValid = NUMERIC_REGEXP.test(String(value));
        break;
      case 'isRange':
        isValid = Array.isArray(ruleValue) && ruleValue.length === 2
          ? Number(value) >= Number(ruleValue[0]) && Number(value) <= Number(ruleValue[1])
          : true;
        break;
      case 'isUrl':
        isValid = isValidUrl(String(value));
        break;
      case 'isAlpha':
        isValid = ALPHA_REGEXP.test(String(value));
        break;
      case 'isAlphanumeric':
        isValid = ALPHANUMERIC_REGEXP.test(String(value));
        break;
      case 'minLength':
        isValid = String(value).length >= Number(ruleValue);
        break;
      case 'equalsField':
        isValid = String(value) === String(formValues[ruleValue] || '');
        break;
      default:
        isValid = true;
        break;
    }

    if (!isValid) {
      const fromMap = validationErrors && validationErrors[rule];
      errors.push(fromMap || DEFAULT_MESSAGES[rule] || 'Invalid value.');
    }
  });

  return errors;
};

const InputValidation = ({
  trigger,
  type,
  className,
  name,
  id,
  placeholder,
  validations,
  validationErrors,
  required,
  value,
  onChange,
  formValues,
  submitted,
}) => {
  const isControlled = value !== undefined;
  const [internalValue, setInternalValue] = useState('');
  const [touched, setTouched] = useState(false);

  const resolvedValue = isControlled ? value : internalValue;
  const normalizedRules = useMemo(() => normalizeRules(validations), [validations]);

  const errors = useMemo(
    () => validateValue({
      value: resolvedValue,
      validations: normalizedRules,
      required,
      validationErrors,
      formValues,
    }),
    [resolvedValue, normalizedRules, required, validationErrors, formValues],
  );

  const shouldShowErrors = submitted || touched || trigger === 'change';

  const handleChange = (event) => {
    const nextValue = event.target.value;

    if (!isControlled) {
      setInternalValue(nextValue);
    }

    if (trigger === 'change') {
      setTouched(true);
    }

    if (typeof onChange === 'function') {
      onChange(name, nextValue);
    }
  };

  return (
    <div className={className}>
      <input
        type={type}
        name={name}
        id={id}
        className="form-control"
        value={resolvedValue}
        onChange={handleChange}
        onBlur={() => setTouched(true)}
        placeholder={placeholder}
      />
      {shouldShowErrors && errors.map((msg, index) => (
        <span key={`msg-err-${index.toString()}`} className="help-block text-danger">{msg}</span>
      ))}
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
  validations: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  validationErrors: PropTypes.object,
  required: PropTypes.bool,
  value: PropTypes.string,
  onChange: PropTypes.func,
  formValues: PropTypes.object,
  submitted: PropTypes.bool,
};

InputValidation.defaultProps = {
  trigger: null,
  type: 'text',
  className: '',
  name: '',
  id: '',
  placeholder: '',
  validations: null,
  validationErrors: null,
  required: false,
  value: undefined,
  onChange: null,
  formValues: {},
  submitted: false,
};

export default InputValidation;
