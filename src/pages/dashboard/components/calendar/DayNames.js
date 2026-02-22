import React from 'react';
import s from './Calendar.module.scss';

const DayNames = () => (
  <div className={`${s.calendarRow} ${s.daysHeader}`}>
    <span className={`${s.calendarItemContainer} ${s.dayName}`}>S</span>
    <span className={`${s.calendarItemContainer} ${s.dayName}`}>M</span>
    <span className={`${s.calendarItemContainer} ${s.dayName}`}>T</span>
    <span className={`${s.calendarItemContainer} ${s.dayName}`}>W</span>
    <span className={`${s.calendarItemContainer} ${s.dayName}`}>T</span>
    <span className={`${s.calendarItemContainer} ${s.dayName}`}>F</span>
    <span className={`${s.calendarItemContainer} ${s.dayName}`}>S</span>
  </div>
);

export default DayNames;
