import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { withRouter } from 'react-router';

import s from './Form.scss';

class Form extends React.Component {

  static propTypes = {
    history: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.backToList = this.backToList.bind(this);
  }

  backToList() {
    this.props.history.goBack();
  }

  render() {
    return (
      <div className={s.root}>
        <div className="clearfix mb-xs">
          <a className="btn btn-transparent btn-sm width-50 float-left" onClick={this.backToList}>
            <i className="fa fa-angle-left fa-lg" />
          </a>
        </div>
        <section className="widget widget-email">
          <header id="widget-email-header">
            {this.state.mailIndex}
            <h4>Compose <span className="fw-semi-bold">New</span></h4>
          </header>
          <div className="widget-body" id="mailbox-content">
            <div className="compose-view" id="compose-view">
              <form id="email-compose" className="form-email-compose" method="get" action="#">
                <div className="form-group">
                  <input
                    type="email"
                    id="input-to"
                    placeholder="To"
                    name="sender"
                    className="input-transparent form-control"
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    id="input-subject"
                    placeholder="Subject"
                    name="subject"
                    className="input-transparent form-control"
                  />
                </div>
                <div className="form-group">
                  <textarea
                    rows="10"
                    className="form-control input-transparent"
                    id="wysiwyg"
                    placeholder="Message"
                  />
                </div>
                <div className="clearfix">
                  <div className="btn-toolbar float-right">
                    <button type="reset" id="compose-discard-button" className="btn btn-transparent">Discard</button>
                    <button type="button" id="compose-save-button" className="btn btn-transparent">&nbsp;&nbsp;
                      Save&nbsp;&nbsp;</button>
                    <button type="submit" id="compose-send-button" className="btn btn-danger">&nbsp;&nbsp;&nbsp;
                      Send&nbsp;&nbsp;&nbsp;</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </section>
      </div>
    );
  }

}

export default withRouter((withStyles(s)(Form)));
