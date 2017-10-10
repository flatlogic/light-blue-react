import React from 'react';
// import ReactDOM from 'react-dom';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import {
  Row,
  Col,
  Button,
} from 'reactstrap';

import s from './Landing.scss';
import Widget from '../../components/Widget';

class Landing extends React.Component {

  // backToTop() {
  //   ReactDOM.findDOMNode(this).scrollIntoView();
  // }

  render() {
    return (
      <div className={s.root}>
        <div className={s.landing}>
          <div className="container">
            <header className={s.pageHeader}>
              <div className="navbar flex-row">
                <div className="logo">
                  <h4><a href="/">Light <strong>Blue</strong></a>
                    <small>&nbsp;bootstrap 4 template</small>
                  </h4>
                </div>
                <ul className={`${s.navbarButtons} float-right`}>
                  <li>
                    <Button color="transparent" href="/app">
                      Preview&nbsp;
                      <i className="fa fa-arrow-right" />
                    </Button>
                  </li>
                  <li>
                    <Button
                      color="transparent"
                      href="https://wrapbootstrap.com/theme/light-blue-responsive-admin-template-WB0T41TX4"
                    >
                      Download&nbsp;
                      <i className="fa fa-download" />
                    </Button>
                  </li>
                </ul>
                <ul className={`${s.navbarMenu} nav navbar-nav flex-row hidden-sm-down ml-auto`}>
                  <li className="active">
                    <a href="#">
                      Home
                    </a>
                  </li>
                  <li>
                    <a>
                      About
                    </a>
                  </li>
                </ul>
              </div>
            </header>
            <div className={s.content} />
          </div>
          <Widget className={`${s.widgetWhite} ${s.widgetAbout}`}>
            <div className="container">
              <Row>
                <Col md="1" />
                <Col md="10">
                  <h2><strong>About Light Blue</strong></h2>
                  <p>
                    <strong>Light Blue</strong> - is a next generation dashboard template.
                    Flat design and transparency -the design that the world haven&#39t
                    seen before Light Blue.
                  </p>
                  <Row className={s.features}>
                    <Col md="4">
                      <section className={s.feature}>
                        <Row>
                          <Col xl="4">
                            <p>
                              <span className={`${s.icon} bg-danger`}>
                                <i className="fa fa-bold" />
                              </span>
                            </p>
                          </Col>
                          <Col xl="8">
                            <h4>Bootstrap 4</h4>
                            <p>
                              Light Blue comes with built-in Bootstrap 4 support.
                              Easy to design your next web app.
                            </p>
                          </Col>
                        </Row>
                      </section>
                    </Col>
                    <Col md="4">
                      <section className={s.feature}>
                        <Row>
                          <Col xl="4">
                            <p>
                              <span className={`${s.icon} bg-warning`}>
                                <i className="fa fa-magic" />
                              </span>
                            </p>
                          </Col>
                          <Col xl="8">
                            <h4>Unique design</h4>
                            <p>
                              Transparent widgets and gradient background - have you seen
                              something like this before?
                            </p>
                          </Col>
                        </Row>
                      </section>
                    </Col>
                    <Col md="4">
                      <section className={s.feature}>
                        <Row>
                          <Col xl="4">
                            <p>
                              <span className={`${s.icon} bg-success`}>
                                <i className="fa fa-wrench" />
                              </span>
                            </p>
                          </Col>
                          <Col xl="8">
                            <h4>Developer-friendly</h4>
                            <p>
                              Simple, intuitive and easily maintainable code.
                            </p>
                          </Col>
                        </Row>
                      </section>
                    </Col>
                  </Row>
                  <Row className={s.features}>
                    <Col md="4">
                      <section className={s.feature}>
                        <Row>
                          <Col xl="4">
                            <p>
                              <span className={`${s.icon} bg-primary`}>
                                <i className="fa fa-superscript" />
                              </span>
                            </p>
                          </Col>
                          <Col xl="8">
                            <h4>White & Transparent</h4>
                            <p>
                              Two styles each having two background options.
                            </p>
                          </Col>
                        </Row>
                      </section>
                    </Col>
                    <Col md="4">
                      <section className={s.feature}>
                        <Row>
                          <Col xl="4">
                            <p>
                              <span className={`${s.icon} bg-lime`}>
                                <i className="fa fa-check" />
                              </span>
                            </p>
                          </Col>
                          <Col xl="8">
                            <h4>Web applications</h4>
                            <p>
                              LB itself is a web app. Plus there is an Email -
                              ready-to-use Backbone application.
                            </p>
                          </Col>
                        </Row>
                      </section>
                    </Col>
                    <Col md="4">
                      <section className={s.feature}>
                        <Row>
                          <Col xl="4">
                            <p>
                              <span className={`${s.icon} bg-info`}>
                                <i className="fa fa-css3" />
                              </span>
                            </p>
                          </Col>
                          <Col xl="8">
                            <h4>Sass-powered</h4>
                            <p>
                              Variables, mixins, includes - things that
                              make Light Blue really easy to customize.
                            </p>
                          </Col>
                        </Row>
                      </section>
                    </Col>
                  </Row>
                </Col>
              </Row>
              <p className={`${s.preview} text-center`}>
                <Button color="danger" size="lg">
                  &nbsp; Preview the White Version &nbsp;
                </Button>
              </p>
            </div>
          </Widget>
          <h2 className={`${s.thanks} text-center`}>Thanks for watching!</h2>
          <p className={`${s.lead} text-center`}>
            <a className={s.backToTop}> back to top <i className="fa fa-angle-up" />
            </a>
          </p>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(Landing);
