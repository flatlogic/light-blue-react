import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';

const splitInputToTags = (value) => value
  .split(',')
  .map((tag) => tag.trim())
  .filter(Boolean);

const TagsInput = ({ id, className, value, onChange, placeholder }) => {
  const [inputValue, setInputValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const tags = useMemo(() => (Array.isArray(value) ? value : []), [value]);

  const commitTags = (rawValue) => {
    const candidates = splitInputToTags(rawValue).filter((tag) => !tags.includes(tag));

    if (candidates.length === 0) {
      return;
    }

    onChange([...tags, ...candidates]);
    setInputValue('');
  };

  const removeTag = (tagToRemove) => {
    onChange(tags.filter((tag) => tag !== tagToRemove));
  };

  const onKeyDown = (event) => {
    if (event.key === 'Enter' || event.key === ',') {
      event.preventDefault();
      commitTags(inputValue);
      return;
    }

    if (event.key === 'Backspace' && !inputValue && tags.length > 0) {
      onChange(tags.slice(0, tags.length - 1));
    }
  };

  return (
    <div id={id} className={`${className}${isFocused ? ' react-tagsinput--focused' : ''}`}>
      {tags.map((tag) => (
        <span key={tag} className="react-tagsinput-tag">
          {tag}
          <button
            type="button"
            className="react-tagsinput-remove"
            onClick={() => removeTag(tag)}
            aria-label={`Remove ${tag}`}
          >
            ×
          </button>
        </span>
      ))}
      <input
        className="react-tagsinput-input"
        value={inputValue}
        onChange={(event) => setInputValue(event.target.value)}
        onKeyDown={onKeyDown}
        onFocus={() => setIsFocused(true)}
        onBlur={() => {
          commitTags(inputValue);
          setIsFocused(false);
        }}
        placeholder={placeholder}
      />
    </div>
  );
};

TagsInput.propTypes = {
  id: PropTypes.string,
  className: PropTypes.string,
  value: PropTypes.arrayOf(PropTypes.string),
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
};

TagsInput.defaultProps = {
  id: '',
  className: 'react-tagsinput form-control input-transparent',
  value: [],
  onChange: () => {},
  placeholder: 'Type and press Enter',
};

export default TagsInput;
