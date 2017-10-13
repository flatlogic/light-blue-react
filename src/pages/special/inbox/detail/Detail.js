import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import {
  Row,
  Col,
  Button,
} from 'reactstrap';

import s from './Detail.scss';
import Widget from '../../../../components/Widget';
import i13 from '../../../../images/13.png';

class Detail extends React.Component {

  static propTypes = {
    mailsList: PropTypes.arrayOf.isRequired,
    match: PropTypes.shape.isRequired,
    history: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      mail: this.props.mailsList[this.props.match.params.id - 1],
    };

    this.backToList = this.backToList.bind(this);
  }

  backToList() {
    this.props.history.goBack();
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
          title={<h4>{this.state.mail.subject}</h4>} print
        >
          <div className={s.emailView}>
            <div className={`${s.emailDetails} clearfix`}>
              <div className={s.emailDetailsContent}>
                <span className="thumb thumb-sm float-left">
                  <img className="rounded-circle" src={i13} alt="Philip Horbacheuski" />
                </span>
                <div className="float-left">
                  <strong>{this.state.mail.sender}&nbsp;</strong>
                  {
                    this.state.mail.senderMail &&
                    <span className={s.email}>&lt;{this.state.mail.senderMail}&gt;</span>
                  }
                  <span className={s.receiver}>to Wrapbootstrap</span>
                </div>
                <div className={`${s.emailActions} float-right`}>
                  <div className="btn-group d-inline-flex">
                    <button className="btn btn-sm btn-transparent">
                      <i className="fa fa-reply mr-xs" /> Reply
                    </button>
                    <button className="btn btn-sm btn-transparent">
                      <i className="fa fa-angle-down" />
                    </button>
                  </div>
                </div>
                <time className={`${s.emailDate} float-right`}>
                  0:30
                </time>
              </div>
            </div>
            <div className={s.emailBody}>
              <div
                className={s.emailBody}
                dangerouslySetInnerHTML={{ __html: this.state.mail.body }}
              />
            </div>
            {
              this.state.mail.body &&
              <div className={s.emailBody}>{this.state.mail.subject}</div>
            }
            <div className={s.emailAttachments}>
              <Row>
                <Col sm="6">
                  {
                    this.state.mail.attachments && <hr />
                  }
                  {
                    this.state.mail.attachments &&
                    <p className="details"><strong>{this.state.mail.attachments.length} attachments</strong> &nbsp;
                      -&nbsp; <a href="#">Download all
                        attachments</a>
                      &nbsp;&nbsp;&nbsp;<a href="#">View all Images</a></p>
                  }
                  {
                    this.state.mail.attachments &&
                    this.state.mail.attachments.map((attachment, i) =>
                      <section
                        className={s.attachment}
                        key={this.state.mail.attachments.indexOf(attachment)}
                      >
                        <img className="img-fluid" alt="" />
                        <h5 className={s.title}>some-cool-image{i + 1}.jpg</h5>
                        <p className="details">
                          568K&nbsp;&nbsp;
                          <a href="#">View</a> &nbsp;&nbsp;
                          <a href="#">Download</a>
                        </p>
                      </section>,
                    )
                  }
                </Col>
              </Row>
            </div>
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

export default withRouter(connect(mapStateToProps)(withStyles(s)(Detail)));
