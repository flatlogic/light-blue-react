import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { Switch, Route, withRouter } from 'react-router';
import { connect } from 'react-redux';
import {
  Row,
  Col,
  Nav,
  NavLink,
  NavItem,
  Button,
} from 'reactstrap';

import Bundle from '../../../core/Bundle';
import { changeFilteredMails } from '../../../actions/mail';
import s from './Inbox.scss';

/* eslint-disable */
import loadList from 'bundle-loader?lazy!./list/List';
import loadDetail from 'bundle-loader?lazy!./detail/Detail';
import loadForm from 'bundle-loader?lazy!./form/Form';
/* eslint-enable */

const ListBundle = Bundle.generateBundle(loadList);
const DetailBundle = Bundle.generateBundle(loadDetail);
const FormBundle = Bundle.generateBundle(loadForm);

class Inbox extends React.Component {

  static propTypes = {
    selectedFolder: PropTypes.string.isRequired,
    dispatch: PropTypes.func.isRequired,
    history: PropTypes.object, // eslint-disable-line
  };

  constructor(props) {
    super(props);

    this.setFolderName = this.setFolderName.bind(this);
  }

  setFolderName(folderName) {
    this.props.dispatch(changeFilteredMails(folderName));
  }

  openForm() {
    this.props.history.push('/app/special/inbox/form');
  }

  render() {
    return (
      <div className={s.root}>
        <h2 className="page-title">Inbox
          <small>&nbsp;Ready-to-use client-side application</small>
        </h2>
        <Row>
          <Col xl={2} lg={3}>
            <Button color="danger" block onClick={() => this.openForm()}>Compose</Button>
            <Nav className={`nav-pills nav-stacked ${s.navEmailFolders} mt flex-column`}>
              <NavItem
                className={this.props.selectedFolder === 'Inbox' ? s.active : ''}
              >
                <NavLink href="#" onClick={() => this.setFolderName('Inbox')}>Inbox</NavLink>
              </NavItem>
              <NavItem
                className={this.props.selectedFolder === 'Sent Mail' ? s.active : ''}
              >
                <NavLink href="#" onClick={() => this.setFolderName('Sent Mail')}>Sent</NavLink>
              </NavItem>
              <NavItem
                className={this.props.selectedFolder === 'Draft' ? s.active : ''}
              >
                <NavLink href="#" onClick={() => this.setFolderName('Draft')}>Drafts</NavLink>
              </NavItem>
              <NavItem
                className={this.props.selectedFolder === 'Starred' ? s.active : ''}
              >
                <NavLink href="#" onClick={() => this.setFolderName('Starred')}>Starred</NavLink>
              </NavItem>
            </Nav>
            <h5 className="mt">QUICK VIEW</h5>
            <Nav className={`nav-pills nav-stacked ${s.navEmailFolders} mt flex-column`}>
              <NavItem>
                <NavLink href="#">
                  <i className="fa fa-circle text-danger float-right" />
                  Work
                </NavLink>
                <NavLink href="#">
                  <i className="fa fa-circle text-white float-right" />
                  Private
                </NavLink>
                <NavLink href="#">
                  <i className="fa fa-circle text-warning float-right" />
                  Saved
                </NavLink>
              </NavItem>
            </Nav>
          </Col>
          <Col xl={10} lg={9}>
            <Switch>
              <Route path="/app/special/inbox/form" exact component={FormBundle} />
              <Route path="/app/special/inbox/:id" exact component={DetailBundle} />
              <Route path="" exact component={ListBundle} />
            </Switch>
          </Col>
        </Row>
      </div>
    );
  }
}

function mapStateToProps(store) {
  return {
    selectedFolder: store.mails.selectedFolder,
  };
}

export default withRouter(connect(mapStateToProps)(withStyles(s)(Inbox)));

