import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import FileUploader from 'components/FormItems/uploaders/UploadService';
import Errors from 'components/FormItems/error/errors';
import ImagesUploaderWrapper from 'components/FormItems/style/ImagesUploaderWrapper';

const ImagesUploader = (props) => {
  const [loading, setLoading] = useState(false);
  const [, setPreviewImage] = useState({
    imageSrc: null,
    imageAlt: null,
  });
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

  const doPreviewImage = (image) => {
    setPreviewImage({
      imageSrc: image.publicUrl,
      imageAlt: image.name,
    });
  };

  const { max, readonly } = props;

  const uploadButton = (
    <label
      className="btn btn-outline-secondary px-4 mb-2"
      style={{ cursor: 'pointer' }}
    >
      {'Upload an image'}
      <input
        style={{ display: 'none' }}
        disabled={loading || readonly}
        accept="image/*"
        type="file"
        onChange={handleChange}
        ref={input}
      />
    </label>
  );

  return (
    <ImagesUploaderWrapper>
      {readonly || (max && fileList().length >= max)
        ? null
        : uploadButton}

      {value() && value().length ? (
        <div className="d-flex flex-row flex-wrap">
          {value().map((item) => {
            return (
              <div
                className="me-2 mb-2 img-card"
                style={{ height: '100px' }}
                key={item.id}
              >
                <img
                  alt={item.name}
                  src={item.publicUrl}
                  className="img-thumbnail"
                  style={{
                    width: '100px',
                    height: '100px',
                    objectFit: 'cover',
                  }}
                />

                <div className="img-buttons rounded-bottom">
                  <button
                    type="button"
                    className="btn btn-link"
                    onClick={() =>
                      doPreviewImage(item)
                    }
                  >
                    <i className="la la-search"></i>
                  </button>

                  {!readonly && (
                    <button
                      type="button"
                      className="btn btn-link ms-2"
                      onClick={() =>
                        handleRemove(item.id)
                      }
                    >
                      <i className="la la-times"></i>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : null}
    </ImagesUploaderWrapper>
  );
};

ImagesUploader.propTypes = {
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

export default ImagesUploader;
