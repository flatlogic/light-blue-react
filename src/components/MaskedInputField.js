import React, { useMemo, useState } from 'react';

function applyMask(inputValue, mask) {
  const digits = String(inputValue || '').replace(/\D/g, '');
  let digitIndex = 0;
  let output = '';

  for (let index = 0; index < mask.length; index += 1) {
    const maskChar = mask[index];

    if (maskChar === '1') {
      if (digitIndex >= digits.length) {
        break;
      }
      output += digits[digitIndex];
      digitIndex += 1;
      continue;
    }

    if (digitIndex < digits.length) {
      output += maskChar;
    }
  }

  return output;
}

function MaskedInputField({
  mask,
  value,
  defaultValue,
  onChange,
  ...rest
}) {
  const initialValue = useMemo(
    () => applyMask(defaultValue || '', mask),
    [defaultValue, mask],
  );
  const [internalValue, setInternalValue] = useState(initialValue);
  const isControlled = value !== undefined;
  const renderedValue = isControlled
    ? applyMask(value, mask)
    : internalValue;

  const handleChange = (event) => {
    const maskedValue = applyMask(event.target.value, mask);

    if (!isControlled) {
      setInternalValue(maskedValue);
    }

    if (onChange) {
      onChange({
        ...event,
        target: {
          ...event.target,
          value: maskedValue,
        },
      });
    }
  };

  return (
    <input
      {...rest}
      value={renderedValue}
      onChange={handleChange}
    />
  );
}

export default MaskedInputField;
