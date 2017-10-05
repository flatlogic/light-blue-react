import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import {
  Row,
  Col,
  ButtonGroup,
  Button,
} from 'reactstrap';

import 'fullcalendar/dist/fullcalendar';
import 'jquery-ui/ui/widgets/draggable';
import moment from 'moment/moment';
import $ from 'jquery';

import s from './Calendar.scss';
import Widget from '../../../components/Widget';

class Calendar extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      calendarView: 'month',
    };

    const date = new Date();
    const d = date.getDate();
    const m = date.getMonth();
    const y = date.getFullYear();

    this.calendarOptions = {
      header: {
        left: '',
        center: 'title',
        right: '',
      },
      events: [
        {
          title: 'All Day Event',
          start: new Date(y, m, 1),
          backgroundColor: '#79A5F0',
          textColor: '#fff',
          description: 'Will be busy throughout the whole day',
        },
        {
          title: 'Long Event',
          start: new Date(y, m, d + 5),
          end: new Date(y, m, d + 7),
          description: 'This conference should be worse visiting',
        },
        {
          id: 999,
          title: 'Blah Blah Car',
          start: new Date(y, m, d - 3, 16, 0),
          allDay: false,
          description: 'Agree with this guy on arrival time',
        },
        {
          id: 1000,
          title: 'Buy this template',
          start: new Date(y, m, d + 3, 12, 0),
          allDay: false,
          backgroundColor: '#555',
          textColor: '#fff',
          description: 'Make sure everything is consistent first',
        },
        {
          title: 'Got to school',
          start: new Date(y, m, d + 16, 12, 0),
          end: new Date(y, m, d + 16, 13, 0),
          backgroundColor: '#64bd63',
          textColor: '#fff',
          description: 'Time to go back',
        },
        {
          title: 'Study some Node',
          start: new Date(y, m, d + 18, 12, 0),
          end: new Date(y, m, d + 18, 13, 0),
          backgroundColor: '#79A5F0',
          textColor: '#fff',
          description: 'Node.js is a platform built ' +
          'on Chrome\'s JavaScript runtime for easily' +
          ' building fast, scalable network applications.' +
          ' Node.js uses an event-driven, non-blocking' +
          ' I/O model that makes it lightweight and' +
          ' efficient, perfect for data-intensive real-time' +
          ' applications that run across distributed devices.',
        },
        {
          title: 'Click for Flatlogic',
          start: new Date(y, m, 28),
          end: new Date(y, m, 29),
          url: 'http://flatlogic.com/',
          backgroundColor: '#e5603b',
          textColor: '#fff',
          description: 'Creative solutions',
        },
      ],
      selectable: true,
      selectHelper: true,
      select: (start, end, allDay) => {
        this.createEvent = () => {
          const title = this.event.title;
          if (title) {
            this.$calendar.fullCalendar('renderEvent',
              {
                title,
                start,
                end,
                allDay,
                backgroundColor: '#64bd63',
                textColor: '#fff',
              },
              true, // make the event "stick"
            );
          }
          this.$calendar.fullCalendar('unselect');
          $('#create-event-modal').modal('hide');
        };

        $('#create-event-modal').modal('show');
      },
      eventClick: (event) => {
        this.event = event;
        $('#show-event-modal').modal('show');
      },
      editable: true,
      droppable: true,

      drop: (dateItem, event) => { // this function is called when something is dropped
        // retrieve the dropped element's stored Event Object
        const originalEventObject = {
          // use the element's text as the event title
          title: $.trim($(event.target).text()),
        };

        // we need to copy it, so that multiple events don't have a reference to the same object
        const copiedEventObject = $.extend({}, originalEventObject);

        // assign it the date that was reported
        copiedEventObject.start = dateItem;
        copiedEventObject.allDay = !dateItem.hasTime();

        const $categoryClass = $(event.target).data('event-class');
        if ($categoryClass) {
          copiedEventObject.className = [$categoryClass];
        }

        // render the event on the calendar
        // the last `true` argument determines if
        // the event 'sticks'
        // http://arshaw.com/fullcalendar/docs/event_rendering/renderEvent/)
        this.$calendar.fullCalendar('renderEvent', copiedEventObject, true);

        $(event.target).remove();
      },
    };

    this.dragOptions = { zIndex: 999, revert: true, revertDuration: 0 };

    this.prev = this.prev.bind(this);
    this.next = this.next.bind(this);
    this.today = this.today.bind(this);
    this.changeView = this.changeView.bind(this);
  }

  componentDidMount() {
    this.$calendar = $('#calendar');
    this.$calendar.fullCalendar(this.calendarOptions);
    $('.draggable').draggable(this.dragOptions);
  }

  changeView(view) {
    this.$calendar.fullCalendar('changeView', view);
    this.setState({ calendarView: view });
  }

  prev() {
    this.$calendar.fullCalendar('prev');
  }

  next() {
    this.$calendar.fullCalendar('next');
  }

  today() {
    this.$calendar.fullCalendar('today');
  }

  currentMonth() {
    return moment(this.$calendar.fullCalendar('getDate')).format('MMM YYYY');
  }

  currentDay() {
    return moment(this.$calendar.fullCalendar('getDate')).format('dddd');
  }

  render() {
    return (
      <div className={s.root}>
        <h2 className="page-title">Components - <span className="fw-semi-bold">Calendar App</span>
          <small> Draggable access</small>
        </h2>
        <Row>
          <Col md={8}>
            <Widget
              title={
                <Row>
                  <Col md={3}>
                    <h4 className="mb-3"><i className="fa fa-calendar" /> Calendar</h4>
                  </Col>
                  <Col md={9} className="calendar-controls text-right">
                    <ButtonGroup className="mr-sm">
                      <Button color="secondary" onClick={this.prev}>
                        <i className="fa fa-angle-left" />
                      </Button>
                      <Button color="secondary" onClick={this.next}>
                        <i className="fa fa-angle-right" />
                      </Button>
                    </ButtonGroup>
                    <Button color="warning" className="mr-sm" onClick={this.today}>
                      Today
                    </Button>
                    <ButtonGroup>
                      <Button
                        color="secondary" onClick={() => this.changeView('month')}
                        active={this.state.calendarView === 'month'}
                      >Month</Button>
                      <Button
                        color="secondary" onClick={() => this.changeView('agendaWeek')}
                        active={this.state.calendarView === 'agendaWeek'}
                      >Week</Button>
                      <Button
                        color="secondary" onClick={() => this.changeView('agendaDay')}
                        active={this.state.calendarView === 'agendaDay'}
                      >Day</Button>
                    </ButtonGroup>
                  </Col>
                </Row>
              }
            >
              <div id="calendar" className="calendar mt-lg" />
            </Widget>
          </Col>
          <Col md={4}>
            <Widget title={<h5><i className="fa fa-exchange" /> Draggable events</h5>}>
              <div>
                <div className="external-event draggable bg-danger" data-event-class="bg-danger text-white">
                  <i className="fa fa-check" /> Buy this template
                </div>
                <div className="external-event draggable bg-warning" data-event-class="bg-warning text-white">
                  Study some Node
                </div>
                <div className="external-event draggable bg-success" data-event-class="bg-success text-white">
                  Make a tea
                </div>
                <div className="external-event draggable bg-primary" data-event-class="bg-primary text-white">
                  <i className="fa fa-book" /> Go to school
                </div>
                <div className="external-event draggable bg-info" data-event-class="bg-info text-white">
                  Open windows
                </div>
              </div>
            </Widget>
          </Col>
        </Row>
      </div>
    );
  }

}

export default withStyles(s)(Calendar);
