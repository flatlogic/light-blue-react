import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import {
  Row,
  Col,
  Badge,
  Button,
  Card,
  Table,
  Nav,
  NavItem,
  NavLink,
  Progress,
} from 'reactstrap';
import d3 from 'd3';
import nv from 'nvd3';
import classnames from 'classnames';
import { Sparklines, SparklinesLine } from 'react-sparklines';
import { Scrollbars } from 'react-custom-scrollbars';

import Widget from '../../components/Widget';
import s from './Dashboard.scss';
import i14 from '../../images/14.png';
import i13 from '../../images/13.png';
import i1 from '../../images/1.png';
import i2 from '../../images/2.png';
import i3 from '../../images/3.png';

class Dashboard extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      activeTab: 1,
      messages: [
        {
          id: 1,
          time: '4 min',
          sender: 'Tikhon Laninga',
          text: `Hey Sam, how is it going? But I must explain to you how all this mistaken
      idea of denouncing of a pleasure and praising pain was born`,
          image: i2,
        },
        {
          id: 2,
          time: '3 min',
          sender: 'Cenhelm Houston',
          text: `Pretty good. Doing my homework..  No one rejects, dislikes, or avoids
        pleasure itself, because it is pleasure, but because`,
          image: i1,
        },
        {
          id: 3,
          time: '2 min',
          sender: 'Tikhon Laninga',
          text: `Anys chance to go out? To take a trivial example, which of us ever undertakes
        laborious physical exercise, except to obtain some advantage`,
          image: i2,
        },
        {
          id: 4,
          time: '2 min',
          sender: 'Cenhelm Houston',
          text: `.. Maybe 40-50 mins. I don't know exactly. On the other hand, we denounce
      with righteous indignation and dislike men who are so beguiled`,
          image: i1,
        },
        {
          id: 5,
          time: '1 min',
          sender: 'Tikhon Laninga',
          text: `Anyway sounds great! These cases are perfectly simple and easy to
      distinguish.`,
          image: i2,
        },
      ],
      newMessage: '',
    };

    this.tableSparklineValues = [[], [], [], [], []];

    this.toggleActiveTab = this.toggleActiveTab.bind(this);
    this.messageInputUpdate = this.messageInputUpdate.bind(this);
    this.handleEnterPress = this.handleEnterPress.bind(this);
    this.addMessage = this.addMessage.bind(this);
    this.sparklineDataIten = this.sparklineDataIten.bind(this);

    this.sparklineDataIten();
  }

  componentDidMount() {
    this.initD3Chart();
  }

  sparklineDataIten() {
    for (let i = 0; i < this.tableSparklineValues.length; i += 1) {
      this.tableSparklineValues[i] = [
        10 + this.randomValue(), 15 + this.randomValue(),
        20 + this.randomValue(), 15 + this.randomValue(),
        25 + this.randomValue(), 25 + this.randomValue(),
        30 + this.randomValue(), 30 + this.randomValue(),
        40 + this.randomValue(),
      ];
    }
  }

  randomValue() {                           //eslint-disable-line
    return Math.floor(Math.random() * 40);
  }

  toggleActiveTab(tabIndex) {
    this.setState({ activeTab: tabIndex });
  }

  initD3Chart() {
    const streamLayers = (n, m, o) => {
      if (arguments.length < 3) {
        o = 0; //eslint-disable-line
      }

      const bump = (a) => {
        const x = 1 / (0.1 + Math.random());
        const y = (2 * Math.random()) - 0.5;
        const z = 10 / (0.1 + Math.random());
        for (let i = 0; i < m; i += 1) {
          const w = ((i / m) - y) * z;
          a[i] += x * Math.exp(-w * w); //eslint-disable-line
        }
      };

      return d3.range(n).map(() => {
        const a = [];
        let i;
        for (i = 0; i < m; i += 1) {
          a[i] = o + (o * Math.random());
        }
        for (i = 0; i < 5; i += 1) {
          bump(a);
        }
        return a.map((d, iItem) => ({ x: iItem, y: Math.max(0, d) }));
      });
    };

    const testData = (streamNames, pointCount) => {
      const now = new Date().getTime();
      const day = 1000 * 60 * 60 * 24; // milliseconds
      const daysAgoCount = 60;
      const daysAgo = daysAgoCount * day;
      const daysAgoDate = now - daysAgo;
      const pointsCount = pointCount || 45; // less for better performance
      const daysPerPoint = daysAgoCount / pointsCount;
      return streamLayers(streamNames.length, pointsCount, 0.1).map((data, i) => ({
        key: streamNames[i],
        values: data.map(d => ({
          x: daysAgoDate + (d.x * day * daysPerPoint),
          y: Math.floor(d.y * 100), // just a coefficient,
        })),
        yAxis: i + 1,
        type: 'line',
      }));
    };

    nv.addGraph(() => {
      const chart = nv.models.lineChart()
        .useInteractiveGuideline(true)
        .margin({ left: 28, bottom: 30, right: 0 })
        .color(['#4380bf', '#38b05e'])
        .showLegend(true);
      chart.xAxis
        .showMaxMin(false)
        .tickFormat(d => d3.time.format('%b %d')(new Date(d)));
      chart.yAxis
        .showMaxMin(false)
        .tickFormat(d3.format(',f'));

      const chartData = testData(['Unique', 'Visits'], 30);
      d3.select(this.nvd3ChartLineSvg)
        .style('height', '200px')
        .datum(chartData.map((el) => {
          el.area = true; //eslint-disable-line
          return el;
        }))
        .call(chart);

      return chart;
    });
  }


  messageInputUpdate(event) {
    this.setState({ newMessage: event.target.value });
  }

  handleEnterPress(event) {
    if (event.key === 'Enter') {
      this.addMessage();
    }
  }

  addMessage() {
    const message = {
      time: 'just now',
      sender: 'Tikhon Laninga',
      text: this.state.newMessage,
      image: i2,
    };

    this.setState({
      messages: [...this.state.messages, message],
      newMessage: '',
    });

    this.scrollbar.scrollToBottom();
  }

  render() {
    return (
      <div className={s.root}>
        <h2 className="page-title">Dashboard <small>Statistics and more</small></h2>
        <Row>
          <Col xl={8}>
            <Widget
              title={
                <h4>Visits <small>Based on a three months data</small></h4>
              } settings collapse close
            >
              <svg
                ref={(r) => {
                  this.nvd3ChartLineSvg = r;
                }}
              />
              <Card className={`${s.visitsInfo} card-well card-sm`}>
                <Row>
                  <Col md="3">
                    <div className={s.key}><i className="fa fa-users" /> Total Traffic</div>
                    <div className={s.value}>24 541 <i className="fa fa-caret-up text-green" /></div>
                  </Col>
                  <Col md="3">
                    <div className={s.key}><i className="fa fa-bolt" /> Unique Visits</div>
                    <div className={s.value}>14 778 <i className="fa fa-caret-down text-red" /></div>
                  </Col>
                  <Col md="3">
                    <div className={s.key}><i className="fa fa-plus-square" /> Revenue</div>
                    <div className={s.value}>$3 583.18 <i className="fa fa-caret-up text-green" /></div>
                  </Col>
                  <Col md="3">
                    <div className={s.key}><i className="fa fa-user" /> Total Sales</div>
                    <div className={s.value}>$59 871.12 <i className="fa fa-caret-down text-red" /></div>
                  </Col>
                </Row>
              </Card>
            </Widget>
            <Widget
              bodyClass="widget-table-overflow"
              title={
                <h4>Traffic Sources <small>One month tracking</small></h4>
              } collapse close
            >
              <Table className="table-striped table-lg mt-sm mb-0 table-sources">
                <thead>
                  <tr>
                    <th className="source-col-header">Source</th>
                    <th>Amount</th>
                    <th>Change</th>
                    <th className="d-sm-down-none">Percent.,%</th>
                    <th className="width-100">Target</th>
                    <th className="chart-col-header d-sm-down-none">Trend</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><Badge color="important">Direct</Badge></td>
                    <td>713</td>
                    <td><strong className="text-green">+53</strong></td>
                    <td className="d-sm-down-none">+12</td>
                    <td>900</td>
                    <td className="chart-cell d-sm-down-none">
                      <Sparklines data={this.tableSparklineValues[0]} style={{ height: '20%' }}>
                        <SparklinesLine style={{ stroke: '#3ecd74', fill: 'rgb(86, 188, 118)', strokeWidth: 3 }} />
                      </Sparklines>
                    </td>
                  </tr>
                  <tr>
                    <td><Badge color="warning">Refer</Badge></td>
                    <td>562</td>
                    <td><strong>+84</strong></td>
                    <td className="d-sm-down-none">+64</td>
                    <td>500</td>
                    <td className="chart-cell d-sm-down-none">
                      <Sparklines data={this.tableSparklineValues[1]} style={{ height: '20%' }}>
                        <SparklinesLine style={{ stroke: '#f2c34d', fill: 'rgb(234, 200, 94)', strokeWidth: 3 }} />
                      </Sparklines>
                    </td>
                  </tr>
                  <tr>
                    <td><Badge color="success">Social</Badge></td>
                    <td>148</td>
                    <td><strong className="text-red">-12</strong></td>
                    <td className="d-sm-down-none">+3</td>
                    <td>180</td>
                    <td className="chart-cell d-sm-down-none">
                      <Sparklines data={this.tableSparklineValues[2]} style={{ height: '20%' }}>
                        <SparklinesLine style={{ stroke: '#4e91ce', fill: 'rgb(106, 141, 167)', strokeWidth: 3 }} />
                      </Sparklines>
                    </td>
                  </tr>
                  <tr>
                    <td><Badge color="info">Search</Badge></td>
                    <td>653</td>
                    <td><strong className="text-green">+23</strong></td>
                    <td className="d-sm-down-none">+43</td>
                    <td>876</td>
                    <td className="chart-cell d-sm-down-none">
                      <Sparklines data={this.tableSparklineValues[3]} style={{ height: '20%' }}>
                        <SparklinesLine style={{ stroke: '#f25118', fill: 'rgb(229, 96, 59)', strokeWidth: 3 }} />
                      </Sparklines>
                    </td>
                  </tr>
                  <tr>
                    <td><Badge color="default">Internal</Badge></td>
                    <td>976</td>
                    <td><strong>+101</strong></td>
                    <td className="d-sm-down-none">-7</td>
                    <td>844</td>
                    <td className="chart-cell d-sm-down-none">
                      <Sparklines data={this.tableSparklineValues[4]} style={{ height: '20%' }}>
                        <SparklinesLine style={{ stroke: '#fff', fill: 'rgb(128, 128, 128)', strokeWidth: 3 }} />
                      </Sparklines>
                    </td>
                  </tr>
                </tbody>
              </Table>
            </Widget>
            <Widget title={<h4>Chat</h4>} settings close>
              <div className="chat">
                <Scrollbars
                  ref={(r) => {
                    this.scrollbar = r;
                  }}
                  style={{ height: 240 }}
                >
                  <div className={s.chatMessages}>
                    {
                      this.state.messages.map(message =>
                        <div className={s.chatMessage} key={message.id}>
                          <div
                            className={classnames(s.sender,
                            { 'float-left': message.sender === 'Tikhon Laninga' },
                            { 'float-right': message.sender !== 'Tikhon Laninga' },
                          )}
                          >
                            <div className={s.icon}>
                              <img src={message.image} className="rounded-circle" alt="" />
                            </div>
                            <div className={s.time}>
                              {message.time}
                            </div>
                          </div>
                          <div
                            className={`${s.chatMessageBody} ${message.sender !== 'Tikhon Laninga' ? s.onLeft : ''}`}
                          >
                            <span className={s.arrow} />
                            <div className={s.sender}><a href="#">{message.sender}</a></div>
                            <div className={s.text}>{message.text}</div>
                          </div>
                        </div>,
                      )
                    }
                  </div>
                </Scrollbars>
                <footer className={s.chatFooter}>
                  <Row>
                    <Col sm="9">
                      <input
                        type="text"
                        className="form-control input-transparent"
                        placeholder="Enter your message.."
                        value={this.state.newMessage}
                        onChange={this.messageInputUpdate}
                        onKeyPress={this.handleEnterPress}
                      />
                    </Col>
                    <Col sm="3">
                      <button
                        type="button"
                        className="btn btn-transparent btn-block"
                        onClick={this.addMessage}
                      >Send
                      </button>
                    </Col>
                  </Row>
                </footer>
              </div>
            </Widget>
          </Col>
          <Col xl={4}>
            <Widget
              title={
                <h4>Feed <Badge color="success">412</Badge></h4>
              }
              customControls={
                <Button color="transparent" size="sm">Show All <i className="fa fa-arrow-down" /></Button>
              }
            >
              <Scrollbars style={{ height: 280 }}>
                <div className={s.feed}>
                  <div className={s.wrapper}>
                    <div className={s.verticalLine} />
                    <section className={s.feedItem}>
                      <div className={`${s.icon} float-left`}>
                        <i className="fa fa-comment" />
                      </div>
                      <div className={s.feedItemBody}>
                        <div className={s.text}>
                          <a href="#">John Doe</a> commented on <a href="#">What Makes Good Code Good</a>.
                        </div>
                        <div className={`${s.time} float-left`}>
                          3 h
                        </div>
                      </div>
                    </section>
                    <section className={s.feedItem}>
                      <div className={`${s.icon} float-left`}>
                        <i className="fa fa-check text-green" />
                      </div>
                      <div className={s.feedItemBody}>
                        <div className={s.text}>
                          <a href="#">Merge request #42</a> has been approved by <a href="#">Jessica Lori</a>.
                        </div>
                        <div className={`${s.time} float-left`}>
                          10 h
                        </div>
                      </div>
                    </section>
                    <section className={s.feedItem}>
                      <div className={`${s.icon} float-left`}>
                        <img src={i14} className="rounded-circle" alt="" />
                      </div>
                      <div className={s.feedItemBody}>
                        <div className={s.text}>
                          New user <a href="#">Greg Wilson</a> registered.
                        </div>
                        <div className={`${s.time} float-left`}>
                          Today
                        </div>
                      </div>
                    </section>
                    <section className={s.feedItem}>
                      <div className={`${s.icon} float-left`}>
                        <i className="fa fa-bolt text-orange" />
                      </div>
                      <div className={s.feedItemBody}>
                        <div className={s.text}>
                          Server fail level raises above normal. <a href="#">See logs</a> for details.
                        </div>
                        <div className={`${s.time} float-left`}>
                          Yesterday
                        </div>
                      </div>
                    </section>
                    <section className={s.feedItem}>
                      <div className={`${s.icon} float-left`}>
                        <i className="fa fa-database" />
                      </div>
                      <div className={s.feedItemBody}>
                        <div className={s.text}>
                          <a href="#">Database usage report</a> is ready.
                        </div>
                        <div className={`${s.time} float-left`}>
                          Yesterday
                        </div>
                      </div>
                    </section>
                    <section className={s.feedItem}>
                      <div className={`${s.icon} float-left`}>
                        <i className="fa fa-shopping-cart" />
                      </div>
                      <div className={s.feedItemBody}>
                        <div className={s.text}>
                          <a href="#">Order #233985</a> needs additional processing.
                        </div>
                        <div className={`${s.time} float-left`}>
                          Wednesday
                        </div>
                      </div>
                    </section>
                    <section className={s.feedItem}>
                      <div className={`${s.icon} float-left`}>
                        <i className="fa fa-arrow-down" />
                      </div>
                      <div className={s.feedItemBody}>
                        <div className={s.text}>
                          <a href="#">Load more...</a>
                        </div>
                      </div>
                    </section>
                  </div>
                </div>
              </Scrollbars>
            </Widget>
            <Widget
              className="widget-tabs"
              title={
                <Nav tabs>
                  <NavItem>
                    <NavLink
                      className={classnames({ active: this.state.activeTab === 1 })}
                      onClick={() => {
                        this.toggleActiveTab(1);
                      }}
                    >
                      Users
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      className={classnames({ active: this.state.activeTab === 2 })}
                      onClick={() => {
                        this.toggleActiveTab(2);
                      }}
                    >
                      Favorites
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      className={classnames({ active: this.state.activeTab === 3 })}
                      onClick={() => {
                        this.toggleActiveTab(3);
                      }}
                    >
                      Commenters
                    </NavLink>
                  </NavItem>
                </Nav>
              }
            >
              <div className="tab-content">
                {
                  this.state.activeTab === 1 &&
                  <div className={classnames('tab-pane', 'clearfix', { active: this.state.activeTab === 1 })}>
                    <h5 className="tab-header">
                      <span className="badge badge-primary">
                        <i className="fa fa-facebook" />
                      </span> Last logged-in users</h5>
                    <ul className={s.newsList}>
                      <li>
                        <img src={i1} alt="" className="float-left rounded-circle" />
                        <div className={s.newsItemInfo}>
                          <div className={s.name}><a href="#">Finees Lund</a></div>
                          <div className={s.position}>Product Designer</div>
                          <div className={s.time}>Last logged-in: Mar 20, 18:46</div>
                        </div>
                      </li>
                      <li>
                        <img src={i3} alt="" className="float-left rounded-circle" />
                        <div className={s.newsItemInfo}>
                          <div className={s.name}><a href="#">Erebus Novak</a></div>
                          <div className={s.position}>Software Engineer</div>
                          <div className={s.time}>Last logged-in: Mar 23, 9:02</div>
                        </div>
                      </li>
                      <li>
                        <img src={i2} alt="" className="float-left rounded-circle" />
                        <div className={s.newsItemInfo}>
                          <div className={s.name}><a href="#">Leopoldo Reier</a></div>
                          <div className={s.position}>Chief Officer</div>
                          <div className={s.time}>Last logged-in: Jun 6, 15:34</div>
                        </div>
                      </li>
                      <li>
                        <img src={i13} alt="" className="float-left rounded-circle" />
                        <div className={s.newsItemInfo}>
                          <div className={s.name}><a href="#">Frans Garey</a></div>
                          <div className={s.position}>Financial Assistant</div>
                          <div className={s.time}>Last logged-in: Jun 8, 17:20</div>
                        </div>
                      </li>
                      <li>
                        <img src={i14} alt="" className="float-left rounded-circle" />
                        <div className={s.newsItemInfo}>
                          <div className={s.name}><a href="#">Jessica Johnsson</a></div>
                          <div className={s.position}>Sales Manager</div>
                          <div className={s.time}>Last logged-in: Jun 8, 9:13</div>
                        </div>
                      </li>
                    </ul>
                  </div>
                }
                {
                  this.state.activeTab === 2 &&
                  <div className={classnames('tab-pane', { active: this.state.activeTab === 2 })}>
                    <h5 className="tab-header"><i className="fa fa-star" /> Popular contacts</h5>
                    <ul className={classnames(s.newsList, s.newsListNoHover)}>
                      <li>
                        <img src={i14} alt="" className="float-left rounded-circle" />
                        <div className={s.newsItemInfo}>
                          <div className={s.name}><a href="#">Jessica Johnsson</a></div>
                          <div className={s.options}>
                            <Button color="success" size="xs" className="mr-1">
                              <i className="fa fa-phone" /> Call
                            </Button>
                            <Button color="warning" size="xs">
                              <i className="fa fa-envelope-o" /> Message
                            </Button>
                          </div>
                        </div>
                      </li>
                      <li>
                        <img src={i13} alt="" className="float-left rounded-circle" />
                        <div className={s.newsItemInfo}>
                          <div className={s.name}><a href="#">Frans Garey</a></div>
                          <div className={s.options}>
                            <Button color="success" size="xs" className="mr-1">
                              <i className="fa fa-phone" /> Call
                            </Button>
                            <Button color="warning" size="xs">
                              <i className="fa fa-envelope-o" /> Message
                            </Button>
                          </div>
                        </div>
                      </li>
                      <li>
                        <img src={i3} alt="" className="float-left rounded-circle" />
                        <div className={s.newsItemInfo}>
                          <div className={s.name}><a href="#">Erebus Novak</a></div>
                          <div className={s.options}>
                            <Button color="success" size="xs" className="mr-1">
                              <i className="fa fa-phone" /> Call
                            </Button>
                            <Button color="warning" size="xs">
                              <i className="fa fa-envelope-o" /> Message
                            </Button>
                          </div>
                        </div>
                      </li>
                      <li>
                        <img src={i2} alt="" className="float-left rounded-circle" />
                        <div className={s.newsItemInfo}>
                          <div className={s.name}><a href="#">Leopoldo Reier</a></div>
                          <div className={s.options}>
                            <Button color="success" size="xs" className="mr-1">
                              <i className="fa fa-phone" /> Call
                            </Button>
                            <Button color="warning" size="xs">
                              <i className="fa fa-envelope-o" /> Message
                            </Button>
                          </div>
                        </div>
                      </li>
                      <li>
                        <img src={i1} alt="" className="float-left rounded-circle" />
                        <div className={s.newsItemInfo}>
                          <div className={s.name}><a href="#">Finees Lund</a></div>
                          <div className={s.options}>
                            <Button color="success" size="xs" className="mr-1">
                              <i className="fa fa-phone" /> Call
                            </Button>
                            <Button color="warning" size="xs">
                              <i className="fa fa-envelope-o" /> Message
                            </Button>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                }
                {
                  this.state.activeTab === 3 &&
                  <div className={classnames('tab-pane', { active: this.state.activeTab === 3 })}>
                    <h5 className="tab-header"><i className="fa fa-comments" /> Top Commenters</h5>
                    <ul className={s.newsList}>
                      <li>
                        <img src={i13} alt="" className="float-left rounded-circle" />

                        <div className={s.newsItemInfo}>
                          <div className={s.name}><a href="#">Frans Garey</a></div>
                          <div className={s.comment}>
                            Nemo enim ipsam voluptatem quia voluptas sit aspernatur
                            aut odit aut fugit, sed quia
                          </div>
                        </div>
                      </li>
                      <li>
                        <img src={i1} alt="" className="float-left rounded-circle" />

                        <div className={s.newsItemInfo}>
                          <div className={s.name}><a href="#">Finees Lund</a></div>
                          <div className={s.comment}>
                            Duis aute irure dolor in reprehenderit in voluptate
                            velit esse cillum dolore eu fugiat.
                          </div>
                        </div>
                      </li>
                      <li>
                        <img src={i14} alt="" className="float-left rounded-circle" />

                        <div className={s.newsItemInfo}>
                          <div className={s.name}><a href="#">Jessica Johnsson</a></div>
                          <div className={s.comment}>
                            Excepteur sint occaecat cupidatat non proident,
                            sunt in culpa qui officia deserunt.
                          </div>
                        </div>
                      </li>
                      <li>
                        <img src={i3} alt="" className="float-left rounded-circle" />

                        <div className={s.newsItemInfo}>
                          <div className={s.name}><a href="#">Erebus Novak</a></div>
                          <div className={s.comment}>
                            Sed ut perspiciatis, unde omnis iste natus error
                            sit voluptatem accusantium doloremque.
                          </div>
                        </div>
                      </li>
                      <li>
                        <img src={i2} alt="" className="float-left rounded-circle" />
                        <div className={s.newsItemInfo}>
                          <div className={s.name}><a href="#">Leopoldo Reier</a></div>
                          <div className={s.comment}>
                            Laudantium, totam rem aperiam eaque ipsa,
                            quae ab illo inventore veritatiset quasi.
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                }
              </div>
            </Widget>
            <Widget title={<h4>Server Overview</h4>}>
              <ul className={s.serverStats}>
                <li>
                  <div className="key float-right">CPU</div>
                  <div className="stat">
                    <div className="info">60% / 37&deg;C / 3.3 Ghz</div>
                    <Progress value="70" color="danger" size="sm" className="mb-sm progress-xs" />
                  </div>
                </li>
                <li>
                  <div className="key float-right">Mem</div>
                  <div className="stat">
                    <div className="info">29% / 4GB (16 GB)</div>
                    <Progress value="29" size="sm" className="mb-sm progress-xs" />
                  </div>
                </li>
                <li>
                  <div className="key float-right">LAN</div>
                  <div className="stat">
                    <div className="info">6 Mb/s <i className="fa fa-caret-down" /> &nbsp; 3 Mb/s
                      <i className="fa fa-caret-up" />
                    </div>
                    <Progress value="48" color="inverse" size="sm" className="mb-sm progress-xs" />
                  </div>
                </li>
              </ul>
            </Widget>
          </Col>
        </Row>
      </div>
    );
  }
}

export default (withStyles(s)(Dashboard));
