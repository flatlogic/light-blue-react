import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';

const COMMANDS = [
  { name: 'bold', icon: 'fa fa-bold' },
  { name: 'italic', icon: 'fa fa-italic' },
  { name: 'underline', icon: 'fa fa-underline' },
  { name: 'insertUnorderedList', icon: 'fa fa-list-ul' },
  { name: 'insertOrderedList', icon: 'fa fa-list-ol' },
  { name: 'createLink', icon: 'fa fa-link' },
  { name: 'removeFormat', icon: 'fa fa-eraser' },
];

const RichTextEditor = ({
  wrapperClassName,
  toolbarClassName,
  editorClassName,
  value,
  defaultValue,
  onChange,
  placeholder,
}) => {
  const editorRef = useRef(null);
  const isControlled = value !== undefined;
  const [internalValue, setInternalValue] = useState(defaultValue);
  const resolvedValue = isControlled ? value : internalValue;

  useEffect(() => {
    if (!editorRef.current) {
      return;
    }

    const current = editorRef.current.innerHTML;
    const next = resolvedValue || '';

    if (current !== next) {
      editorRef.current.innerHTML = next;
    }
  }, [resolvedValue]);

  const notifyChange = () => {
    const nextValue = editorRef.current ? editorRef.current.innerHTML : '';

    if (!isControlled) {
      setInternalValue(nextValue);
    }

    if (typeof onChange === 'function') {
      onChange(nextValue);
    }
  };

  const applyCommand = (command) => {
    if (!editorRef.current) {
      return;
    }

    editorRef.current.focus();

    if (command === 'createLink') {
      const link = window.prompt('Enter URL', 'https://');

      if (link) {
        document.execCommand(command, false, link);
      }
    } else {
      document.execCommand(command, false, null);
    }

    notifyChange();
  };

  return (
    <div className={wrapperClassName}>
      <div className={`rdw-editor-toolbar ${toolbarClassName || ''}`}>
        {COMMANDS.map((command) => (
          <button
            key={command.name}
            type="button"
            className="rdw-option-wrapper"
            onClick={() => applyCommand(command.name)}
            aria-label={command.name}
          >
            <i className={command.icon} />
          </button>
        ))}
      </div>
      <div
        ref={editorRef}
        className={`rdw-editor-main ${editorClassName || ''}`}
        contentEditable
        suppressContentEditableWarning
        onInput={notifyChange}
        data-placeholder={placeholder}
      />
    </div>
  );
};

RichTextEditor.propTypes = {
  wrapperClassName: PropTypes.string,
  toolbarClassName: PropTypes.string,
  editorClassName: PropTypes.string,
  value: PropTypes.string,
  defaultValue: PropTypes.string,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
};

RichTextEditor.defaultProps = {
  wrapperClassName: '',
  toolbarClassName: '',
  editorClassName: '',
  value: undefined,
  defaultValue: '',
  onChange: null,
  placeholder: 'Start typing...',
};

export default RichTextEditor;
