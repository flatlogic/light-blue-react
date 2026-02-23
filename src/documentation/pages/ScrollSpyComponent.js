import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';

import s from '../styles.module.scss';

const SCROLL_OFFSET = 170;

const getActiveId = (ids) => {
  if (typeof window === 'undefined') {
    return ids[0] || '';
  }

  let currentId = ids[0] || '';

  ids.forEach((id) => {
    const element = document.getElementById(id);
    if (!element) {
      return;
    }

    if (element.getBoundingClientRect().top - SCROLL_OFFSET <= 0) {
      currentId = id;
    }
  });

  return currentId;
};

const ScrollSpyComponent = ({ title, ids, prefix }) => {
  const resolvedIds = useMemo(() => (Array.isArray(ids) ? ids : []), [ids]);
  const [activeId, setActiveId] = useState(resolvedIds[0] || '');

  useEffect(() => {
    if (!resolvedIds.length || typeof window === 'undefined') {
      return undefined;
    }

    const updateActive = () => {
      setActiveId(getActiveId(resolvedIds));
    };

    updateActive();

    window.addEventListener('scroll', updateActive, { passive: true });
    window.addEventListener('resize', updateActive);
    window.addEventListener('hashchange', updateActive);

    return () => {
      window.removeEventListener('scroll', updateActive);
      window.removeEventListener('resize', updateActive);
      window.removeEventListener('hashchange', updateActive);
    };
  }, [resolvedIds]);

  return (
    <div
      className="border-left ps-4 d-md-down-none"
      style={{
        position: 'fixed',
        overflowY: 'auto',
        maxHeight: 'calc(100vh - 130px)',
        paddingLeft: '15px',
      }}
    >
      <h6 className="fw-semi-bold">{title}</h6>
      <ul>
        {resolvedIds.map((id) => (
          <li key={id} className={`mb-xs ${activeId === id ? s.activeScrollSpy : ''}`}>
            <Link to={`/documentation/${prefix}#${id}`} className={s.scrollSpy}>
              {id.split('-').join(' ')}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ScrollSpyComponent;
