import React, { useState } from 'react';
import DayNames from './DayNames';
import { v4 as uuid } from 'uuid';
import Week from './Week';
import moment from 'moment/moment';
import s from './Calendar.module.scss';

const Calendar = () => {
  const [selectedMonth, setSelectedMonth] = useState(moment());
  const [selectedDay] = useState(moment().startOf('day'));
  const [selectedMonthEvents] = useState([
    {
      title: 'The flower bed',
      info: 'Contents here',
      itemStyle: '#2477ff',
      date: moment(`${moment().year()}-${moment().month() + 1}-02`, 'YYYYMMDD'),
    },
    {
      title: 'Stop world water pollution',
      info: 'Have a kick off meeting with .inc company',
      itemStyle: '#e49400',
      date: moment(`${moment().year()}-${moment().month() + 1}-05`, 'YYYYMMDD'),
    },
    {
      title: 'Light Blue 2.2 release',
      info: 'Some contents here',
      itemStyle: '#2d8515',
      date: moment(`${moment().year()}-${moment().month() + 1}-18`, 'YYYYMMDD'),
    },
    {
      title: 'A link',
      info: '',
      itemStyle: '#f45722',
      link: 'http://www.flatlogic.com',
      date: moment(`${moment().year()}-${moment().month() + 1}-29`, 'YYYYMMDD'),
    },
  ]);

  const previous = () => {
    setSelectedMonth((prevMonth) => prevMonth.clone().subtract(1, 'month'));
  };

  const next = () => {
    setSelectedMonth((prevMonth) => prevMonth.clone().add(1, 'month'));
  };

  const renderMonthLabel = () => (
    <span className={`${s.calendarItemContainer} ${s.monthLabel}`}>
      {selectedMonth.format('MMMM YYYY')}
    </span>
  );

  const renderWeeks = () => {
    const currentMonthView = selectedMonth;
    const currentSelectedDay = selectedDay;

    const weeks = [];
    let done = false;
    const previousCurrentNextView = currentMonthView
      .clone()
      .startOf('month')
      .subtract(1, 'd')
      .day('Sunday');
    let count = 0;
    let monthIndex = previousCurrentNextView.month();

    while (!done) {
      weeks.push(
        <Week
          key={uuid()}
          selectedMonthEvents={selectedMonthEvents}
          previousCurrentNextView={previousCurrentNextView.clone()}
          currentMonthView={currentMonthView}
          selected={currentSelectedDay}
        />
      );
      previousCurrentNextView.add(1, 'w');
      done = count++ > 2 && monthIndex !== previousCurrentNextView.month();
      monthIndex = previousCurrentNextView.month();
    }
    return weeks;
  };

  return (
    <div className={`${s.calendarRectangle}`}>
      <div>
        <section className={`${s.mainCalendar}`}>
          <header className={`${s.calendarHeader}`}>
            <div className={`${s.calendarRow} ${s.titleHeader}`}>
              <i
                className={`${s.calendarItemContainer} ${s.arrow} la la-arrow-left`}
                onClick={previous}
              />
              <div className={`${s.calendarItemContainer} ${s.headerText}`}>
                {renderMonthLabel()}
              </div>
              <i
                className={`${s.calendarItemContainer} ${s.arrow} la la-arrow-right`}
                onClick={next}
              />
            </div>
            <DayNames />
          </header>
          <div className={`${s.daysContainer}`}>
            {renderWeeks()}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Calendar;
