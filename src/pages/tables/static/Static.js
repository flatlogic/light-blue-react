/* eslint class-methods-use-this: ["error", { "exceptMethods": ["parseDate"] }] */
import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import {
  Row,
  Col,
  Table,
} from 'reactstrap';

import s from './Static.scss';
import Widget from '../../../components/Widget';

class Static extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      tableStriped: [
        {
          id: 1,
          picture: 'assets/src/images/jpeg/1.jpg',
          description: 'Palo Alto',
          info: {
            type: 'JPEG',
            dimensions: '200x150',
          },
          date: new Date('September 14, 2012'),
          size: '45.6 KB',
          progress: {
            percent: 29,
            colorClass: 'success',
          },
        },
        {
          id: 2,
          picture: '../../../images/jpeg/1.jpg',
          description: 'The Sky',
          info: {
            type: 'PSD',
            dimensions: '2400x1455',
          },
          date: new Date('November 14, 2012'),
          size: '15.3 MB',
          progress: {
            percent: 33,
            colorClass: 'warning',
          },
        },
        {
          id: 3,
          picture: 'assets/img/jpeg/3.jpg',
          description: 'Down the road',
          label: {
            colorClass: 'danger',
            text: 'INFO!',
          },
          info: {
            type: 'JPEG',
            dimensions: '200x150',
          },
          date: new Date('September 14, 2012'),
          size: '49.0 KB',
          progress: {
            percent: 38,
            colorClass: 'bar-gray',
          },
        },
        {
          id: 4,
          picture: 'assets/img/jpeg/4.jpg',
          description: 'The Edge',
          info: {
            type: 'PNG',
            dimensions: '210x160',
          },
          date: new Date('September 15, 2012'),
          size: '69.1 KB',
          progress: {
            percent: 17,
            colorClass: 'danger',
          },
        },
        {
          id: 5,
          picture: 'assets/img/jpeg/11.jpg',
          description: 'Fortress',
          info: {
            type: 'JPEG',
            dimensions: '1452x1320',
          },
          date: new Date('October 1, 2012'),
          size: '2.3 MB',
          progress: {
            percent: 41,
            colorClass: 'primary',
          },
        },
      ],
      checkboxes1: [false, false, false, false],
      checkboxes2: [false, false, false, false, false, false],
      checkboxes3: [false, false, false, false, false, false],
    };

    // this.checkAll = this.checkAll.bind(this);
  }

  parseDate(date) {
    const dateSet = date.toDateString().split(' ');
    return `${dateSet[1]} ${dateSet[2]}, ${dateSet[3]}`;
  }

  // checkAll() {
    // e.fill(!e[0]);
    // this.setState({checkboxes: e});
  // }

  render() {
    return (
      <div className={s.root}>
        <h2 className="page-title">Tables - <span className="fw-semi-bold">Static</span></h2>
        <Row>
          <Col>
            <Widget
              title={<h5>
                Table <span className="fw-semi-bold">Styles</span>
              </h5>} settings close
            >
              <Table className="table-striped">
                <thead>
                  <tr>
                    <th className="hidden-sm-down">#</th>
                    <th>Picture</th>
                    <th>Description</th>
                    <th className="hidden-sm-down">Info</th>
                    <th className="hidden-sm-down">Date</th>
                    <th className="hidden-sm-down">Size</th>
                    <th />
                  </tr>
                </thead>
                <tbody>
                  {
                    this.state.tableStriped.map(row =>
                      <tr key={row.id}>
                        <td>{row.id}</td>
                        <td>
                          {/* <img className="img-rounded" src={require(el.picture)}
                          alt="" height="50" /> */}
                        </td>
                        <td>
                          {row.description}
                          {row.label &&
                          <div>
                            <span className={`badge badge-${row.label.colorClass}`}>{row.label.text}</span>
                          </div>
                          }
                        </td>
                        <td>
                          <p className="no-margin">
                            <small>
                              <span className="fw-semi-bold">Type:</span>
                              <span className="text-muted">&nbsp; {row.info.type}</span>
                            </small>
                          </p>
                          <p>
                            <small>
                              <span className="fw-semi-bold">Dimensions:</span>
                              <span className="text-muted">&nbsp; {row.info.dimensions}</span>
                            </small>
                          </p>
                        </td>
                        <td>
                          {this.parseDate(row.date)}
                        </td>
                        <td>
                          {row.size}
                        </td>
                        <td className="width-150">
                          <div className="progress bg-blue-light mt-0">
                            <div
                              className={`progress-bar bg-${row.progress.colorClass}`}
                              role="progressbar"
                              style={{ width: `${row.progress.percent} + %`, height: `${0.62} + rem` }}
                              aria-valuenow={row.progress.percent} aria-valuemin="0" aria-valuemax="100"
                            />
                          </div>
                        </td>
                      </tr>,
                    )
                  }
                </tbody>
              </Table>
              <div className="clearfix">
                <div className="float-right">
                  <button className="btn btn-secondary btn-sm">
                    Send to ...
                  </button>
                  <button className="btn btn-inverse btn-sm">
                    Clear
                  </button>
                </div>
                <p>Basic table with styled content</p>
              </div>
            </Widget>
          </Col>
        </Row>
        <Row>
          <Col lg={6}>
            <Widget
              title={<h5>Table <span className="fw-semi-bold">Styles</span></h5>} settings close
            >
              <h3>Stripped <span className="fw-semi-bold">Table</span></h3>

              <p>Each row is highlighted. You will never lost there. Just
                <code>.table-striped</code> it.
              </p>
              <Table className="table-striped">
                <thead>
                  <tr>
                    <th>
                      <div className="abc-checkbox">
                        {/* {<input id="checkbox1" type="checkbox"
                        (change)="checkAll($event, tb1)"> */}
                        {/* } */}
                        <input id="checkbox1" type="checkbox" />
                        <label htmlFor="checkbox1" />
                      </div>
                    </th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Info</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <div className="abc-checkbox">
                        <input id="checkbox2" type="checkbox" />
                        <label htmlFor="checkbox2" />
                      </div>
                    </td>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td><span className="badge badge-danger">Online</span></td>
                  </tr>
                  <tr>
                    <td>
                      <div className="abc-checkbox">
                        <input id="checkbox3" type="checkbox" />
                        <label htmlFor="checkbox3" />
                      </div>
                    </td>
                    <td>Jacob <span className="badge badge-warning text-gray-dark fw-semi-bold">ALERT!</span></td>
                    <td>Thornton</td>
                    <td><span className="badge bg-gray-light">Away</span></td>
                  </tr>
                  <tr>
                    <td>
                      <div className="abc-checkbox">
                        <input id="checkbox4" type="checkbox" />
                        <label htmlFor="checkbox4" />
                      </div>
                    </td>
                    <td>Larry</td>
                    <td>the Bird</td>
                    <td><span className="badge badge-danger">Construct</span></td>
                  </tr>
                </tbody>
              </Table>
              <br /><br />
              <h3>Hover <span className="fw-semi-bold">Table</span></h3>
              <p>Trace only what&#39;s really important.
                <code>.table-hover</code> is made for it.
              </p>
              <div className="table-responsive">
                <Table className="table-hover">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>First Name</th>
                      <th>Last Name</th>
                      <th>Email</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td>Mark</td>
                      <td>Otto</td>
                      <td><a href="#">ottoto@example.com</a></td>
                      <td><span className="badge badge-pill bg-gray-lighter text-gray fw-semi-bold">Pending</span></td>
                    </tr>
                    <tr>
                      <td>2</td>
                      <td>Jacob</td>
                      <td>Thornton</td>
                      <td><a href="#">fat.thor@example.com</a></td>
                      <td><span className="badge badge-pill bg-gray-lighter text-gray-light">Unconfirmed</span></td>
                    </tr>
                    <tr>
                      <td>3</td>
                      <td>Larry</td>
                      <td>the Bird</td>
                      <td><a href="#">larry@example.com</a></td>
                      <td><span className="badge badge-pill bg-gray-lighter text-gray fw-semi-bold">New</span></td>
                    </tr>
                    <tr>
                      <td>4</td>
                      <td>Peter</td>
                      <td>Horadnia</td>
                      <td><a href="#">peter@example.com</a></td>
                      <td><span className="badge badge-pill bg-gray-lighter text-gray-light">Active</span></td>
                    </tr>
                  </tbody>
                </Table>
              </div>
            </Widget>
          </Col>
          <Col lg={6}>
            <Widget
              title={<h5>Table <span className="fw-semi-bold">Styles</span></h5>} settings close
            >
              <h3>Bordered <span className="fw-semi-bold">Table</span></h3>
              <p>{`ach row is highlighted. You will never lost there. That's how
                all of us learned in school the table should look like. Just add`}
                <code>.table-bordered</code> to it.</p>
              <Table className="table-bordered table-lg mt-lg mb-0">
                <thead>
                  <tr>
                    <th>
                      <div className="abc-checkbox">
                        {/* <input id="checkbox10" type="checkbox"
                        onChange={() => { this.checkAll(); }} /> */}
                        <input id="checkbox10" type="checkbox" />
                        <label htmlFor="checkbox10" />
                      </div>
                    </th>
                    <th>Product</th>
                    <th className="text-right">Price</th>
                    <th className="text-center">Sales</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <div className="abc-checkbox">
                        <input id="checkbox11" type="checkbox" />
                        <label htmlFor="checkbox11" />
                      </div>
                    </td>
                    <td>On the Road</td>
                    <td className="text-right">$25 224.2</td>
                    <td className="text-center">
                      {/* { <div className="sparkline" */}
                      {/* jq-sparkline [options]="{type: 'bar', barColor: '#618fb0'}"
                      [data]="[13,14,16,15,4,14,20]"></div> */}
                      {/* } */}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div className="abc-checkbox">
                        <input id="checkbox12" type="checkbox" />
                        <label htmlFor="checkbox12" />
                      </div>
                    </td>
                    <td>HP Core i7</td>
                    <td className="text-right">$87 346.1</td>
                    <td className="text-center">
                      {/* {<div className="sparkline" */}
                      {/* jq-sparkline [options]="{type: 'bar', barColor: '#999'}"
                      [data]="[14,12,16,11,17,19,16]"></div> */}
                      {/* } */}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div className="abc-checkbox">
                        <input id="checkbox13" type="checkbox" />
                        <label htmlFor="checkbox13" />
                      </div>
                    </td>
                    <td>Let&#39;s Dance</td>
                    <td className="text-right">$57 944.6</td>
                    <td className="text-center">
                      {/* { <div className="sparkline" */}
                      {/* jq-sparkline [options]="{type: 'bar', barColor: '#f0b518'}"
                      [data]="[11,17,19,16,14,12,16]"></div> */}
                      {/* } */}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div className="abc-checkbox">
                        <input id="checkbox14" type="checkbox" />
                        <label htmlFor="checkbox14" />
                      </div>
                    </td>
                    <td>Air Pro</td>
                    <td className="text-right">$118 533.1</td>
                    <td className="text-center">
                      {/* { <div className="sparkline" */}
                      {/* jq-sparkline [options]="{type: 'bar', barColor: '#e5603b'}"
                      [data]="[13,14,20,16,15,4,14]"></div> */}
                      {/* } */}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div className="abc-checkbox">
                        <input id="checkbox15" type="checkbox" />
                        <label htmlFor="checkbox15" />
                      </div>
                    </td>
                    <td>Version Control</td>
                    <td className="text-right">$72 854.5</td>
                    <td className="text-center">
                      {/* { <div className="sparkline" */}
                      {/* jq-sparkline [options]="{type: 'bar', barColor: '#618fb0'}"
                      [data]="[16,15,4,14,13,14,20]"></div> */}
                      {/* } */}
                    </td>
                  </tr>
                </tbody>
              </Table>
            </Widget>
            <Widget
              title={<h5>Table <span className="fw-semi-bold">Styles</span></h5>} settings close
            >
              <h3>Overflow <span className="fw-semi-bold">Table</span></h3>
              <p>
                Add any non-bordered .table within a widget for a seamless design.
                Awesome look for no cost.
                Just wrap the table with simple css class <code>.widget-table-overflow</code> inside
                of widget
              </p>
              <div className="widget-table-overflow">
                <Table className="table-striped table-lg mt-lg mb-0">
                  <thead>
                    <tr>
                      <th>
                        <div className="abc-checkbox">
                          {/* {<input id="checkbox10" type="checkbox"
                          (change)="checkAll($event, tb2)"> */}
                          {/* } */}
                          <input id="checkbox210" type="checkbox" />
                          <label htmlFor="checkbox210" />
                        </div>
                      </th>
                      <th>Product</th>
                      <th className="text-right">Price</th>
                      <th className="text-center">Sales</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <div className="abc-checkbox">
                          <input id="checkbox211" type="checkbox" />
                          <label htmlFor="checkbox211" />
                        </div>
                      </td>
                      <td>On the Road</td>
                      <td className="text-right">$25 224.2</td>
                      <td className="text-center">
                        {/* { <div className="sparkline" */}
                        {/* jq-sparkline [options]="{type: 'bar', barColor: '#618fb0'}"
                        [data]="[13,14,16,15,4,14,20]"></div> */}
                        {/* } */}
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <div className="abc-checkbox">
                          <input id="checkbox212" type="checkbox" />
                          <label htmlFor="checkbox212" />
                        </div>
                      </td>
                      <td>HP Core i7</td>
                      <td className="text-right">$87 346.1</td>
                      <td className="text-center">
                        {/* {<div className="sparkline" */}
                        {/* jq-sparkline [options]="{type: 'bar', barColor: '#999'}"
                        [data]="[14,12,16,11,17,19,16]"></div> */}
                        {/* } */}
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <div className="abc-checkbox">
                          <input id="checkbox213" type="checkbox" />
                          <label htmlFor="checkbox213" />
                        </div>
                      </td>
                      <td>Let&#39;s Dance</td>
                      <td className="text-right">$57 944.6</td>
                      <td className="text-center">
                        {/* { <div className="sparkline" */}
                        {/* jq-sparkline [options]="{type: 'bar', barColor: '#f0b518'}"
                        [data]="[11,17,19,16,14,12,16]"></div> */}
                        {/* } */}
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <div className="abc-checkbox">
                          <input id="checkbox214" type="checkbox" />
                          <label htmlFor="checkbox214" />
                        </div>
                      </td>
                      <td>Air Pro</td>
                      <td className="text-right">$118 533.1</td>
                      <td className="text-center">
                        {/* { <div className="sparkline" */}
                        {/* jq-sparkline [options]="{type: 'bar', barColor: '#e5603b'}"
                        [data]="[13,14,20,16,15,4,14]"></div> */}
                        {/* } */}
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <div className="abc-checkbox">
                          <input id="checkbox215" type="checkbox" />
                          <label htmlFor="checkbox215" />
                        </div>
                      </td>
                      <td>Version Control</td>
                      <td className="text-right">$72 854.5</td>
                      <td className="text-center">
                        {/* { <div className="sparkline" */}
                        {/* jq-sparkline [options]="{type: 'bar', barColor: '#618fb0'}"
                        [data]="[16,15,4,14,13,14,20]"></div> */}
                        {/* } */}
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </div>
            </Widget>
          </Col>
        </Row>
      </div>
    );
  }

}

export default withStyles(s)(Static);
