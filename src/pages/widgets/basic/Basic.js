import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import {
  Row,
  Col,
} from 'reactstrap';

import s from './Basic.scss';
import Widget from '../../../components/Widget';

class Basic extends React.Component {

  render() {
    return (
      <div className={s.root}>
        <h2 className="page-title"><span className="fw-semi-bold">Responsive</span> Grid
          <small> Fully responsive layout</small>
        </h2>
        <Row className="justify-content-md-center">
          <Col md={8}>
            <Widget className={s.tiny} title={<h4>Col-md-8 widget</h4>}>
              <blockquote className="blockquote-sm">
                Looks great with <code>.justify-content-md-center</code>
              </blockquote>
            </Widget>
          </Col>
        </Row>
        <Row className="justify-content-md-center">
          <Col md={10}>
            <Widget className={s.tiny} title={<h4>The same with 10</h4>}>
              <blockquote className="blockquote-sm">
                Looks great with <code>.justify-content-md-center</code>
              </blockquote>
            </Widget>
          </Col>
        </Row>
        <Row>
          <Col md={5}>
            <Widget className={s.tinyX2} title={<h4>Col-md-5</h4>} />
          </Col>
          <Col md={4}>
            <Widget className={s.tiny} title={<h4>Col-md-4</h4>} />
            <Widget className={s.tiny} title={<h4>Col-md-4</h4>} />
          </Col>
          <Col md={3}>
            <Widget className={s.tiny} title={<h4>Col-md-3</h4>} />
            <Widget className={s.tiny} title={<h4>Col-md-3</h4>} />
          </Col>
        </Row>
      </div>
    );
  }

}

export default withStyles(s)(Basic);
