import React, { useState } from 'react';
import { Popover, PopoverHeader, PopoverBody, Tooltip } from 'reactstrap';
import s from './Calendar.module.scss';

const Day = ({ day, selected }) => {
  const [popoverShow, setPopoverShow] = useState(false);
  const [tooltipShow, setTooltipShow] = useState(false);

  const togglePopover = () => {
    setPopoverShow((prevState) => !prevState);
  };

  const toggleTooltip = () => {
    setTooltipShow((prevState) => !prevState);
  };

  return (
    <div className={
      `${s.day}` +
      (day.isToday ? ` ${s.today}` : '') +
      (day.isCurrentMonth ? '' : ` ${s.differentMonth}`) +
      (day.date.isSame(selected) ? ` ${s.selected}` : '') +
      (day.hasEvents ? ` ${s.hasEvents}` : '')}
    >

      {!day.hasEvents ?
      <div className={s.dayNumber}>{day.number}</div>
      : (day.hasEvents && day.link)
      ?
      <React.Fragment>
        <a
          rel="noopener noreferrer"
          target="_blank"
          onMouseEnter={toggleTooltip}
          onMouseOut={toggleTooltip}
          id={`Tooltip${day.number}`}
          href={day.link ? day.link : '#'}
          className={s.dayNumber}> {day.number}
          {day.itemStyle ?
            <span
              style={{ backgroundColor: `${day.itemStyle}` }}
              className={s.calendarDot}
            >
            </span> : '' }
        </a>
        <Tooltip
          placement="top"
          isOpen={tooltipShow}
          toggle={toggleTooltip}
          target={`Tooltip${day.number}`}>
          {day.title}
        </Tooltip>
      </React.Fragment>
      : (day.hasEvents && !day.link)
      ?
        <React.Fragment>
          <div
            onClick={togglePopover}
            id={`Popover${day.number}`}
            className={s.dayNumber}> {day.number}
              {day.itemStyle ?
                <span
                  style={{ backgroundColor: `${day.itemStyle}` }}
                  className={s.calendarDot}
                >
                </span> : '' }
          </div>
          <Popover
            placement="top"
            isOpen={popoverShow}
            target={`Popover${day.number}`}
            toggle={togglePopover}>
            <PopoverHeader>{day.title}</PopoverHeader>
            <PopoverBody>{day.info}</PopoverBody>
          </Popover>
        </React.Fragment>
      : '' }

    </div>
  );
};
export default Day;
