import dayjs from 'core/date';
import React from 'react';

import s from '../Users.module.scss';
import avatar1 from '../../../images/chat/chat1.png';
import defaultAminAvatar from '../../../images/chat/chat2.png';
import avatar3 from '../../../images/chat/chat3.png';
import avatar4 from '../../../images/chat/chat4.png';
import avatar5 from '../../../images/chat/chat5.png';
import avatar6 from '../../../images/chat/chat6.png';

const avatars = [avatar1, avatar3, avatar4, avatar5, avatar6];

const truncateText = (value, maxLength = 30) => {
  if (!value) {
    return value;
  }

  return value.length > maxLength
    ? `${value.slice(0, maxLength - 3)}...`
    : value;
};

function imageFormatter(cell, rows, rowIndex) {
  const imageUrl =
    cell && cell.length
      ? cell[0].publicUrl
      : undefined;

  const avatarFallback = avatars[rowIndex % avatars.length];

  return (
      <span className={`${s.avatar} rounded-circle`}>{imageUrl || rows.role === 'admin' ? <img src={imageUrl || defaultAminAvatar} onError={(e) => e.target.src = avatarFallback} alt="avatar" /> : <span className={`${s.avatar} rounded-circle thumb-sm float-start`}>{rows.email.charAt(0).toUpperCase()}</span>}</span>
  );
};

function booleanFormatter(cell) {
    return cell
      ? 'Yes'
      : 'No';
};

function dateTimeFormatter(cell) {
    return cell
      ? dayjs(cell).format('YYYY-MM-DD HH:mm')
      : null;
};

function filesFormatter(cell) {
    return (
      <div>
        { cell && cell.map((value) => {
          return (
            <div key={value.id}>
              <i className="la la-link text-muted me-2"></i>
              <a
                href={value.publicUrl}
                target="_blank"
                rel="noopener noreferrer"
                download
              >
                {truncateText(value.name)}
              </a>
            </div>
          );
        })}
      </div>
	)
};

function listFormatter(cell) {
    if (!cell) return null;

    return (
      <div>
        { cell && cell.length && cell.map((value) => {
          return (
            <div key={value.id}>
              <a
                href={value.id}
              >
                {value.name}
              </a>
            </div>
          );
        })}
        { cell &&
            <div key={cell.id}>
              <a href={cell.id}>{cell.name}</a>
            </div>
        }
      </div>
	);
};

export { booleanFormatter, imageFormatter, dateTimeFormatter, listFormatter, filesFormatter };
