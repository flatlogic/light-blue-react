import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import {
  Row,
  Col,
} from 'reactstrap';

import s from './Stats.scss';
import Widget from '../../../components/Widget';

class Stats extends React.Component {

  render() {
    return (
      <div className={s.root}>
        <h2 className="page-title">Basic Stats
          <small> Tiles, bars and more</small>
        </h2>
        <Row>
          <Col md={2} sm={4}>
            <div className="box">
              <div className="icon">
                <i className="fa fa-calendar" />
              </div>
              <div className="description">
                <strong>14</strong> meetings
              </div>
            </div>
          </Col>
          <Col md={2} sm={4}>
            <div className="box">
              <div className="big-text">
                3.28%
              </div>
              <div className="description">
                <i className="fa fa-user" /> User Growth
              </div>
            </div>
          </Col>
          <Col md={2} sm={4}>
            <div className="box">
              <div className="icon">
                <i className="fa fa-user" />
              </div>
              <div className="description">
                <strong>643</strong> customers
              </div>
            </div>
          </Col>
          <Col md={2} sm={4}>
            <div className="box">
              <div className="big-text">
                +512
              </div>
              <div className="description">
                <i className="fa fa-comments" /> Comments
              </div>
            </div>
          </Col>
          <Col md={2} sm={4}>
            <div className="box">
              <div className="icon">
                <i className="fa fa-shopping-cart" />
              </div>
              <div className="description">
                <strong>410</strong> orders
              </div>
            </div>
          </Col>
          <Col md={2} sm={4}>
            <div className="box">
              <div className="big-text">
                6.42%
              </div>
              <div className="description">
                <i className="fa fa-arrow-right" /> Traffic Growth
              </div>
            </div>
          </Col>
        </Row>
        <Row className={s.equalHeightStats}>
          <Col md={4}>
            <Widget
              title={<h5><i className="fa fa-arrow-right" /> Progressbars</h5>}
            >
              <h5 className="mt-0 mb-xs font-weight-normal">Simple one</h5>
              <div className="progress bg-blue-light mt-0">
                <div className="progress-bar" role="progressbar" style={{ width: `${60} + %`, height: `${1.38} + rem` }} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100" />
              </div>
              <h5 className="mt-0 mb-xs font-weight-normal">Styled ones</h5>
              <div className="progress bg-blue-light mt-0">
                <div className="progress-bar bg-success" role="progressbar" style={{ width: `${33} + %`, height: `${1.38} + rem` }} aria-valuenow="33" aria-valuemin="0" aria-valuemax="100" />
              </div>
              <div className="progress bg-blue-light mt-2">
                <div className="progress-bar bg-warning" role="progressbar" style={{ width: `${52} + %`, height: `${1.38} + rem` }} aria-valuenow="52" aria-valuemin="0" aria-valuemax="100" />
              </div>
              <div className="progress bg-blue-light mt-2">
                <div className="progress-bar bg-danger" role="progressbar" style={{ width: `${43} + %`, height: `${1.38} + rem` }} aria-valuenow="43" aria-valuemin="0" aria-valuemax="100" />
              </div>
              <div className="progress bg-blue-light mt-0">
                <div className="progress-bar bg-inverse" role="progressbar" style={{ width: `${33} + %`, height: `${1.38} + rem` }} aria-valuenow="33" aria-valuemin="0" aria-valuemax="100" />
              </div>
            </Widget>
          </Col>
          <Col md={4}>
            <Widget
              title={<h5><i className="fa fa-caret-right" /> Small ones</h5>}
            >
              <h5 className="mt-0 mb-xs font-weight-normal">Colors</h5>
              <div className="progress bg-blue-light mt-0">
                <div className="progress-bar bg-info" role="progressbar" style={{ width: `${23} + %`, height: `${0.62} + rem` }} aria-valuenow="23" aria-valuemin="0" aria-valuemax="100" />
              </div>
              <div className="progress bg-blue-light mt-1">
                <div className="progress-bar bg-warning" role="progressbar" style={{ width: `${76} + %`, height: `${0.62} + rem` }} aria-valuenow="76" aria-valuemin="0" aria-valuemax="100" />
              </div>
              <div className="progress bg-blue-light mt-1">
                <div className="progress-bar bg-success" role="progressbar" style={{ width: `${43} + %`, height: `${0.62} + rem` }} aria-valuenow="43" aria-valuemin="0" aria-valuemax="100" />
              </div>
              <div className="progress bg-blue-light mt-10">
                <div className="progress-bar bg-danger" role="progressbar" style={{ width: `${53} + %`, height: `${0.62} + rem` }} aria-valuenow="53" aria-valuemin="0" aria-valuemax="100" />
              </div>
              <div className="progress bg-blue-light mt-0">
                <div className="progress-bar bg-inverse" role="progressbar" style={{ width: `${29} + %`, height: `${0.62} + rem` }} aria-valuenow="29" aria-valuemin="0" aria-valuemax="100" />
              </div>
              <h5 className="mt-0 mb-xs font-weight-normal">Default progressbar</h5>
              <div className="progress bg-blue-light mt-0">
                <div className="progress-bar" role="progressbar" style={{ width: `${60} + %`, height: `${0.62} + rem` }} aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" />
              </div>
            </Widget>
          </Col>
          <Col md={4}>
            <Widget
              title={<h5><i className="fa fa-angle-right" /> Some extensions</h5>}
            >
              <h5 className="mt-0 mb-xs font-weight-normal">With embedded percentage</h5>
              <div className="progress bg-blue-light mt-0">
                <div className="progress-bar" role="progressbar" style={{ width: `${79} + %`, height: `${1.38} + rem` }} aria-valuenow="79" aria-valuemin="0" aria-valuemax="100">79%</div>
              </div>
              <h5 className="mt-0 mb-xs font-weight-normal">Active one</h5>
              <div className="progress bg-blue-light mt-0">
                <div className="progress-bar progress-bar-striped progress-bar-animated bg-warning" role="progressbar" style={{ width: `${51} + %`, height: `${1.38} + rem` }} aria-valuenow="51" aria-valuemin="0" aria-valuemax="100">51%</div>
              </div>
              <h5 className="mt-0 mb-xs font-weight-normal">Inversed progress-bar</h5>
              <div className="progress bg-blue-light mt-0">
                <div className="progress-bar bg-inverse" role="progressbar" style={{ width: `${64} + %`, height: `${1.38} + rem` }} aria-valuenow="64" aria-valuemin="0" aria-valuemax="100">64%</div>
              </div>
            </Widget>
          </Col>
        </Row>
        <Row>
          <Col md={3} />
          <Col md={3}>
            <Widget
              title={<h5><i className="fa fa-magnet" /> Server Overview</h5>}
            >
              <ul className="server-stats">
                <li>
                  <div className={`${s.key} float-right`}>CPU</div>
                  <div className="stat">
                    <div className="info">60% / 37&deg;C / 3.3 Ghz</div>
                    <div className="progress bg-blue-light mt-0">
                      <div className="progress-bar" role="progressbar" style={{ width: `${70} + %`, height: `${0.62} + rem` }} aria-valuenow="70" aria-valuemin="0" aria-valuemax="100" />
                    </div>
                  </div>
                </li>
                <li>
                  <div className={`${s.key} float-right`}>Mem</div>
                  <div className="stat">
                    <div className="info">29% / 4GB (16 GB)</div>
                    <div className="progress bg-blue-light mt-0">
                      <div className="progress-bar bg-warning" role="progressbar" style={{ width: `${29} + %`, height: `${0.62} + rem` }} aria-valuenow="29" aria-valuemin="0" aria-valuemax="100" />
                    </div>
                  </div>
                </li>
                <li>
                  <div className={`${s.key} float-right`}>LAN</div>
                  <div className="stat">
                    <div className="info">6 Mb/s <i className="fa fa-caret-down" /> &nbsp; 3 Mb/s <i className="fa fa-caret-up" />
                    </div>
                    <div className="progress bg-blue-light mt-0">
                      <div className="progress-bar bg-danger" role="progressbar" style={{ width: `${48} + %`, height: `${0.62} + rem` }} aria-valuenow="48" aria-valuemin="0" aria-valuemax="100" />
                    </div>
                  </div>
                </li>
                <li>
                  <div className={`${s.key} float-right`}>Access</div>
                  <div className="stat">
                    <div className="info">17 Mb/s <i className="fa fa-caret-up" /> &nbsp; (+18%)</div>
                    <div className="progress bg-blue-light mt-0">
                      <div className="progress-bar bg-success" role="progressbar" style={{ width: `${64} + %`, height: `${0.62} + rem` }} aria-valuenow="64" aria-valuemin="0" aria-valuemax="100" />
                    </div>
                  </div>
                </li>
              </ul>
            </Widget>
          </Col>
          <Col md={3}>
            <Widget
              title={<h5><i className="fa fa-lightbulb" />Stats Overview</h5>}
            >
              <ul className={s.overallStats}>
                <li>
                  <div className="icon float-left">
                    <i className="fa fa-user" />
                  </div>
                  <span className={s.key}>Total Users</span>
                  <div className="value float-right">
                    <span className="badge badge-pill badge-danger">7 541</span>
                  </div>
                </li>
                <li>
                  <div className="icon float-left">
                    <i className="fa fa-shopping-cart" />
                  </div>
                  <span className={s.key}>Total Orders</span>
                  <div className="value float-right">
                    <span className="badge badge-pill badge-warning">2 876</span>
                  </div>
                </li>
                <li>
                  <div className="icon float-left">
                    <i className="fa fa-desktop" />
                  </div>
                  <span className={s.key}>Desktop</span>
                  <div className="value float-right">
                    <span className="badge badge-pill badge-info">68%</span>
                  </div>
                </li>
                <li>
                  <div className="icon float-left">
                    <i className="fa fa-phone" />
                  </div>
                  <span className={s.key}>Mobile</span>
                  <div className="value float-right">
                    <span className="badge badge-pill badge-default">32%</span>
                  </div>
                </li>
              </ul>
            </Widget>
          </Col>
        </Row>
      </div>);
  }

}

export default withStyles(s)(Stats);
