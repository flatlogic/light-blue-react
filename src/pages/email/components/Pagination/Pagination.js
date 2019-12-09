import React from 'react';
import cx from 'classnames';

import s from './Pagination.module.scss';

const Pagination = () => (
  <div className={s.pagination}>
    <span className={s.paginationText}>Showing 1 - 10 of 96 messages</span>
    <div className={s.paginationPages}>
      <button className={`${cx(s.button, s.buttonDisabled)} bg-default`}><i className="fa fa-chevron-left" /></button>
      <button className={`${cx(s.button, s.buttonActive)} bg-default`}>1</button>
      <button className={`${s.button} bg-default`}>2</button>
      <button className={`${s.button} bg-default`}><i className="fa fa-chevron-right" /></button>
    </div>
  </div>
);

export default Pagination;
