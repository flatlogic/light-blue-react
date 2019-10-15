import React, { Component } from 'react'

class DayNames extends Component {
  render() {
    return (
      <div className="calendar_row days-header">
        <span className="box day-name">S</span>
        <span className="box day-name">M</span>
        <span className="box day-name">T</span>
        <span className="box day-name">W</span>
        <span className="box day-name">T</span>
        <span className="box day-name">F</span>
        <span className="box day-name">S</span>
      </div>
    );
  }
}

export default DayNames;