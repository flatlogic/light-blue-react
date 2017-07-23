import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { Row, Col } from 'reactstrap';

import Widget from '../../components/Widget';
import s from './Dashboard.scss';
import logo from '../../images/react-logo.png';


class Dashboard extends React.Component {
  render() {
    return (
      <div className={s.root}>
        <h2 className={s.pageTitle}>Dashboard <small><small>The Lucky One</small></small></h2>
        <Row>
          <Col md={6}>
            <Widget title={<h4>Example <span className="fw-semi-bold">Widget</span></h4>}>
              <div>
                <img className="pull-left mr-3" src={logo} alt="React" width="100" />
                <p className="lead">You are looking at a completely new version of Sing App built
                  with brand <strong>React JS</strong></p>
                <p className="fs-mini">Made by <a href="http://flatlogic.com" target="_blank" rel="noopener noreferrer">Flatlogic</a>.</p>
              </div>
            </Widget>
          </Col>
        </Row>
      </div>
    );
  }
}

export default (withStyles(s)(Dashboard));
