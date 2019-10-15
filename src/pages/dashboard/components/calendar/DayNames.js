import React, { Component } from 'react'

class DayNames extends Component {
  render() {
    return (
      <div className="calendar_row days-header">
        <span className="calendar-item-container day-name">S</span>
        <span className="calendar-item-container day-name">M</span>
        <span className="calendar-item-container day-name">T</span>
        <span className="calendar-item-container day-name">W</span>
        <span className="calendar-item-container day-name">T</span>
        <span className="calendar-item-container day-name">F</span>
        <span className="calendar-item-container day-name">S</span>
      </div>
    );
  }
}

export default DayNames;