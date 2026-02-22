import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import selectors from 'crud/modules/users/usersSelectors';

const UsersViewItem = ({ label, value }) => {
  const hasPermissionToRead = useSelector((state) => selectors.selectPermissionToRead(state));

  const valueAsArray = () => {
    if (!value) {
      return [];
    }

    if (Array.isArray(value)) {
      return value;
    }

    return [value];
  };

  const displayableRecord = (record) => {
    if (hasPermissionToRead) {
      return (
        <div key={record.id}>
          <Link className="btn btn-link" to={`/users/${record.id}`}>
            {record['id']}
          </Link>
        </div>
      );
    }

    return (
      <div key={record.id}>
        {record['id']}
      </div>
    );
  };

  if (!valueAsArray().length) {
    return null;
  }

  return (
    <div className="form-group">
      <label className="col-form-label">
        {label}
      </label>
      <br />
      {valueAsArray().map((item) => displayableRecord(item))}
    </div>
  );
};

UsersViewItem.propTypes = {
  label: PropTypes.string,
  value: PropTypes.any,
};

export default UsersViewItem;
