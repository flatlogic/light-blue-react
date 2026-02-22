import React, { useLayoutEffect, useRef } from 'react';

function resizeTextarea(textarea, minRows) {
  if (!textarea) {
    return;
  }

  textarea.style.height = 'auto';
  const lineHeight = parseInt(window.getComputedStyle(textarea).lineHeight, 10) || 20;
  const minHeight = minRows * lineHeight;
  const nextHeight = Math.max(textarea.scrollHeight, minHeight);
  textarea.style.height = `${nextHeight}px`;
}

function AutoResizeTextarea({
  rows = 2,
  onChange,
  style,
  ...rest
}) {
  const textareaRef = useRef(null);

  useLayoutEffect(() => {
    resizeTextarea(textareaRef.current, rows);
  }, [rows, rest.value]);

  const handleChange = (event) => {
    resizeTextarea(textareaRef.current, rows);
    if (onChange) {
      onChange(event);
    }
  };

  return (
    <textarea
      {...rest}
      ref={textareaRef}
      rows={rows}
      onChange={handleChange}
      style={{
        overflow: 'hidden',
        ...style,
      }}
    />
  );
}

export default AutoResizeTextarea;
