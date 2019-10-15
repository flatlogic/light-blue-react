import React, { Component } from 'react'
import DayNames from './DayNames'
import uuid from 'uuid/v4'
import Week from './Week'
import moment from 'moment/moment'
import './Calendar.scss'


class Calendar extends Component {

    state = {
      selectedMonth: moment(),
      selectedDay: moment().startOf("day"),
      selectedMonthEvents: [
        {
          title: "The flower bed",
          info: "Contents here",
          itemStyle: "#5d8fc2",
          date: moment("20191002", "YYYYMMDD"),
        },
        {
          title: "Stop world water pollution",
          info: "Have a kick off meeting with .inc company",
          itemStyle: "#f0b518",
          date: moment("20191005", "YYYYMMDD"),
        },
        {
          title: "Light Blue 2.2 release",
          info: "Some contents here",
          itemStyle: "#64bd63",
          date: moment("20191018", "YYYYMMDD"),
        },
        {
          title: "A link",
          info: "",
          itemStyle: "#dd5826",
          link: "http://www.flatlogic.com",
          date: moment("20191029", "YYYYMMDD"),
        },
      ],
      showEvents: false
    };



  

  previous = () => {
    this.setState({
      selectedMonth: this.state.selectedMonth.subtract(1, "month")
    });
  }

  next = () =>  {
    this.setState({
      selectedMonth: this.state.selectedMonth.add(1, "month")
    });
  }

  select = (day) =>  {
    this.setState({
      selectedMonth: day.date,
      selectedDay: day.date.clone(),
      showEvents: !this.state.showEvents
    });
  }

  goToCurrentMonthView = () => {
    this.setState({
      selectedMonth: moment()
    });
  }
  
  showCalendar = () =>  {
    this.setState({
      selectedMonth: this.state.selectedMonth,
      selectedDay: this.state.selectedDay,
      showEvents: false
    });
  }

  renderMonthLabel = () =>  {
    return (
      <span className="calendar-item-container month-label">
        {this.state.selectedMonth.format("MMMM YYYY")}
      </span>
    );
  }

  renderDayLabel = () =>  {
    const currentSelectedDay = this.state.selectedDay;
    return (
      <span className="calendar-item-container month-label">
        {currentSelectedDay.format("DD MMMM YYYY")}
      </span>
    );
  }
  
  renderTodayLabel = () =>  {
    return (
      <span className="calendar-item-container today-label" onClick={this.goToCurrentMonthView}>
        Today
      </span>
    );
  }
  
  renderWeeks = () =>  {
    const currentMonthView = this.state.selectedMonth;
    const currentSelectedDay = this.state.selectedDay;

    let weeks = [];
    let done = false;
    let previousCurrentNextView = currentMonthView
      .clone()
      .startOf("month")
      .subtract(1, "d")
      .day("Sunday");
    let count = 0;
    let monthIndex = previousCurrentNextView.month();

    while (!done) {
      weeks.push(
        <Week
          key={uuid()}
          showEvents={this.state.showEvents}
          selectedMonth={this.state.selectedMonth}
          selectedDay={this.state.selectedDay}
          selectedMonthEvents={this.state.selectedMonthEvents}
          previousCurrentNextView={previousCurrentNextView.clone()}
          currentMonthView={currentMonthView}
          selected={currentSelectedDay}
          select={day => this.select(day)}
        />
      );
      previousCurrentNextView.add(1, "w");
      done = count++ > 2 && monthIndex !== previousCurrentNextView.month();
      monthIndex = previousCurrentNextView.month();
    }
    return weeks;
  }


  render() {

      return (
        <div className="calendar-rectangle">
        <div className="calendar-content">
        <section className="main-calendar">
          <header className="calendar-header">
            <div className="calendar_row title-header">
              <i
                className="calendar-item-container arrow la la-arrow-left"
                onClick={this.previous}
              />
              <div className="calendar-item-container header-text">
              
              {this.renderMonthLabel()}
              </div>
              <i 
                className="calendar-item-container arrow la la-arrow-right" 
                onClick={this.next} 
              />
            </div>
            <DayNames />
          </header>
          <div className="days-container">
            {this.renderWeeks()}
          </div>
        </section>
        </div>
        </div>
      );
    }
}

export default Calendar;