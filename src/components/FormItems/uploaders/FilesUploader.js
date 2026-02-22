import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import FileUploader from 'components/FormItems/uploaders/UploadService';
import Errors from 'components/FormItems/error/errors';

const FilesUploader = (props) => {
  const [loading, setLoading] = useState(false);
  const input = useRef(null);

  const value = () => {
    const { value } = props;

    if (!value) {
      return [];
    }

    return Array.isArray(value) ? value : [value];
  };

  const fileList = () => {
    return value().map((item) => ({
      uid: item.id || undefined,
      name: item.name,
      status: 'done',
      url: item.publicUrl,
    }));
  };

  const handleRemove = (id) => {
    props.onChange(
      value().filter((item) => item.id !== id),
    );
  };

  const handleChange = async (event) => {
    try {
      const files = event.target.files;

      if (!files || !files.length) {
        return;
      }

      let file = files[0];

      FileUploader.validate(file, props.schema);

      setLoading(true);

      file = await FileUploader.upload(
        props.path,
        file,
        props.schema,
      );

      input.current.value = '';

      setLoading(false);
      props.onChange([...value(), file]);
    } catch (error) {
      input.current.value = '';
      console.log('error', error);
      setLoading(false);
      Errors.showMessage(error);
    }
  };

  const formats = () => {
    const { schema } = props;

    if (schema && schema.formats) {
      return schema.formats
        .map((format) => `.${format}`)
        .join(',');
    }

    return undefined;
  };

  const { max, readonly } = props;

  const uploadButton = (
    <label
      className="btn btn-outline-secondary px-4 mb-2"
      style={{ cursor: 'pointer' }}
    >
      {'Upload a file'}
      <input
        style={{ display: 'none' }}
        disabled={loading || readonly}
        accept={formats()}
        type="file"
        onChange={handleChange}
        ref={input}
      />
    </label>
  );

  return (
    <div>
      {readonly || (max && fileList().length >= max)
        ? null
        : uploadButton}

      {value() && value().length ? (
        <div>
          {value().map((item) => {
            return (
              <div key={item.id}>
                <i className="la la-link text-muted me-2"></i>

                <a
                  href={item.publicUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  download
                >
                  {item.name}
                </a>

                {!readonly && (
                  <button
                    className="btn btn-link"
                    type="button"
                    onClick={() =>
                      handleRemove(item.id)
                    }
                  >
                    <i className="la la-times"></i>
                  </button>
                )}
              </div>
            );
          })}
        </div>
      ) : null}
    </div>
  );
};

FilesUploader.propTypes = {
  readonly: PropTypes.bool,
  path: PropTypes.string,
  max: PropTypes.number,
  schema: PropTypes.shape({
    image: PropTypes.bool,
    size: PropTypes.number,
    formats: PropTypes.arrayOf(PropTypes.string),
  }),
  value: PropTypes.any,
  onChange: PropTypes.func,
};

export default FilesUploader;
