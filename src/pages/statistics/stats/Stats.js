import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import {
  Row,
  Col,
  Progress,
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
          <Col lg={2} md={4} sm={6}>
            <div className="box">
              <div className="icon">
                <i className="fa fa-calendar" />
              </div>
              <div className="description">
                <strong>14</strong> meetings
              </div>
            </div>
          </Col>
          <Col lg={2} md={4} sm={6}>
            <div className="box">
              <div className="big-text">
                3.28%
              </div>
              <div className="description">
                <i className="fa fa-user" /> User Growth
              </div>
            </div>
          </Col>
          <Col lg={2} md={4} sm={6}>
            <div className="box">
              <div className="icon">
                <i className="fa fa-user" />
              </div>
              <div className="description">
                <strong>643</strong> customers
              </div>
            </div>
          </Col>
          <Col lg={2} md={4} sm={6}>
            <div className="box">
              <div className="big-text">
                +512
              </div>
              <div className="description">
                <i className="fa fa-comments" /> Comments
              </div>
            </div>
          </Col>
          <Col lg={2} md={4} sm={6}>
            <div className="box">
              <div className="icon">
                <i className="fa fa-shopping-cart" />
              </div>
              <div className="description">
                <strong>410</strong> orders
              </div>
            </div>
          </Col>
          <Col lg={2} md={4} sm={6}>
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
          <Col lg={4} md={12} xs={12}>
            <Widget
              title={<h5><i className="fa fa-arrow-right" /> Progressbars</h5>}
            >
              <h5 className="mt-0 mb-xs font-weight-normal">Simple one</h5>
              <Progress value="60" className="progress-lg" />
              <h5 className="mt-0 mb-xs font-weight-normal">Styled ones</h5>
              <Progress color="success" value="33" className="progress-lg" />
              <Progress color="warning" value="52" className="progress-lg" />
              <Progress color="danger" value="43" className="progress-lg" />
              <Progress color="inverse" value="33" className="progress-lg" />
            </Widget>
          </Col>
          <Col lg={4} md={12} xs={12}>
            <Widget
              title={<h5><i className="fa fa-caret-right" /> Small ones</h5>}
            >
              <h5 className="mt-0 mb-xs font-weight-normal">Colors</h5>
              <Progress color="info" value="23" className="progress-sm" />
              <Progress color="warning" value="76" className="progress-sm" />
              <Progress color="success" value="43" className="progress-sm" />
              <Progress color="danger" value="53" className="progress-sm" />
              <Progress color="inverse" value="29" className="progress-sm" />
              <h5 className="mt-0 mb-xs font-weight-normal">Default progressbar</h5>
              <Progress value="60" className="progress-sm" />

            </Widget>
          </Col>
          <Col lg={4} md={12} xs={12}>
            <Widget
              title={<h5><i className="fa fa-angle-right" /> Some extensions</h5>}
            >
              <h5 className="mt-0 mb-xs font-weight-normal">With embedded percentage</h5>
              <Progress value="79" className="progress-lg">79%</Progress>
              <h5 className="mt-0 mb-xs font-weight-normal">Active one</h5>
              <Progress animated color="warning" value="51" className="progress-lg">51%</Progress>
              <h5 className="mt-0 mb-xs font-weight-normal">Inversed progress-bar</h5>
              <Progress value="64" color="inverse" className="progress-lg">64%</Progress>
            </Widget>
          </Col>
        </Row>
        <Row>
          <Col lg={3} className="d-md-none" />
          <Col lg={3} md={12} xs={12}>
            <Widget
              title={<h5><i className="fa fa-magnet" /> Server Overview</h5>}
            >
              <ul className="server-stats">
                <li>
                  <div className={`${s.key} float-right`}>CPU</div>
                  <div className="stat">
                    <div className="info">60% / 37&deg;C / 3.3 Ghz</div>
                    <Progress value="70" className="progress-sm" />
                  </div>
                </li>
                <li>
                  <div className={`${s.key} float-right`}>Mem</div>
                  <div className="stat">
                    <div className="info">29% / 4GB (16 GB)</div>
                    <Progress color="warning" value="29" className="progress-sm" />
                  </div>
                </li>
                <li>
                  <div className={`${s.key} float-right`}>LAN</div>
                  <div className="stat">
                    <div className="info">6 Mb/s <i className="fa fa-caret-down" /> &nbsp; 3 Mb/s <i className="fa fa-caret-up" />
                    </div>
                    <Progress color="danger" value="48" className="progress-sm" />
                  </div>
                </li>
                <li>
                  <div className={`${s.key} float-right`}>Access</div>
                  <div className="stat">
                    <div className="info">17 Mb/s <i className="fa fa-caret-up" /> &nbsp; (+18%)</div>
                    <Progress color="success" value="64" className="progress-sm" />
                  </div>
                </li>
              </ul>
            </Widget>
          </Col>
          <Col lg={3} md={12} xs={12}>
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
                    <span className="badge badge-pill badge-inverse">32%</span>
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
