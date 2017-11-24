import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { withRouter } from 'react-router';
import {
  Button,
} from 'reactstrap';

import Widget from '../../../../components/Widget';
import s from './Form.scss';

class Form extends React.Component {

  static propTypes = {
    history: PropTypes.func.isRequired,
    mailsList: PropTypes.arrayOf.isRequired,
    location: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    let mail = {
      sender: '',
      subject: '',
      body: '',
    };

    if (this.props.location.query) {
      mail = this.props.mailsList[this.props.location.query.id - 1];
    }

    this.state = {
      mail,
    };

    this.backToList = this.backToList.bind(this);
  }

  backToList() {
    this.props.history.push('/app/special/inbox');
  }

  render() {
    return (
      <div className={s.root}>
        <div className="clearfix mb-xs">
          <Button color="transparent" size="sm" className="width-50 float-left" onClick={this.backToList}>
            <i className="fa fa-angle-left fa-lg" />
          </Button>
        </div>
        <Widget
          className="widget-email"
          title={
            <header>
              <h4>Compose <span className="fw-semi-bold">New</span></h4>
            </header>
          }
        >
          <div>
            <form method="get" action="#">
              <div className="form-group">
                <input
                  type="email"
                  id="input-to"
                  placeholder="To"
                  name="sender"
                  value={this.state.mail.sender}
                  className="input-transparent form-control"
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  id="input-subject"
                  placeholder="Subject"
                  name="subject"
                  value={this.state.mail.subject}
                  className="input-transparent form-control"
                />
              </div>
              <div className="form-group">
                <textarea
                  rows="10"
                  className="form-control input-transparent"
                  id="wysiwyg"
                  value={{ __html: this.state.mail.body }}
                  placeholder="Message"
                />
              </div>
              <div className="clearfix">
                <div className="float-right">
                  <Button type="reset" color="transparent" className="ml-2">Discard</Button>
                  <Button type="button" color="transparent" className="ml-2">
                    &nbsp;&nbsp;Save&nbsp;&nbsp;
                  </Button>
                  <Button type="submit" color="danger" className="ml-2">
                    &nbsp;&nbsp;&nbsp;Send&nbsp;&nbsp;&nbsp;
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </Widget>
      </div>
    );
  }
}

function mapStateToProps(store) {
  return {
    mailsList: store.mails.mailsList,
  };
}

export default withRouter(connect(mapStateToProps)(withStyles(s)(Form)));
