import React, { Component } from 'react'
import { Popover, PopoverHeader, PopoverBody, Tooltip,} from 'reactstrap';

class Day extends Component {
  state = {
    popoverShow: false,
    tooltipShow: false
  }

  togglePopover = () => {
    this.setState({ popoverShow: !this.state.popoverShow })
  }

  toggleTooltip = () => {
    this.setState({ tooltipShow: !this.state.tooltipShow })
  }

  render() {
    const { day, selected } = this.props;
    return (
      <div className={
          "day" +
          (day.isToday ? " today" : "") +
          (day.isCurrentMonth ? "" : " different-month") +
          (day.date.isSame(selected) ? " selected" : "") +
          (day.hasEvents ? " has-events" : "") } > 

        {!day.hasEvents ? 
        <a href="javascript:void(0);" className="day-number">{day.number}</a> 
        : (day.hasEvents && day.link) 
        ? 
        <React.Fragment>
          <a
            onMouseEnter={this.toggleTooltip}
            onMouseOut={this.toggleTooltip}
            id={`Tooltip${day.number}`}
            href={day.link ? day.link : "javascript:void(0);"} 
            className="day-number"> {day.number}
            {day.itemStyle ? 
              <span 
                style={{backgroundColor: `${day.itemStyle}`}} 
                className={`calendar-dot`}>
              </span> : "" }
          </a>
          <Tooltip 
            placement="top" 
            isOpen={this.state.tooltipShow} 
            toggle={this.toggleTooltip} 
            target={`Tooltip${day.number}`}>
            {day.title}
          </Tooltip>
        </React.Fragment> 
        : (day.hasEvents && !day.link)
        ? 
          <React.Fragment>
            <a
              onClick={this.togglePopover}
              id={`Popover${day.number}`}
              href={day.link ? day.link : "javascript:void(0);"} 
              className="day-number"> {day.number}
                {day.itemStyle ? 
                  <span 
                    style={{backgroundColor: `${day.itemStyle}`}} 
                    className={`calendar-dot`}>
                  </span> : "" }
            </a>
            <Popover 
              placement="top" 
              isOpen={this.state.popoverShow} 
              target={`Popover${day.number}`} 
              toggle={this.togglePopover}>
              <PopoverHeader>{day.title}</PopoverHeader>
              <PopoverBody>{day.info}</PopoverBody>
            </Popover> 
          </React.Fragment> 
        : "" }
      
      </div>
    );
  }
}
export default Day;