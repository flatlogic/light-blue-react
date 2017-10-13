import React from 'react';
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
import { selectFolderName } from '../../../actions/mail';
import s from './Inbox.scss';
import loadList from 'bundle-loader?lazy!./list/List';
import loadDetail from 'bundle-loader?lazy!./detail/Detail';
import loadForm from 'bundle-loader?lazy!./form/Form';

const ListBundle = Bundle.generateBundle(loadList);
const DetailBundle = Bundle.generateBundle(loadDetail);
const FormBundle = Bundle.generateBundle(loadForm);

class Inbox extends React.Component {

  constructor(props) {
    super(props);

    this.setFolderName = this.setFolderName.bind(this);
  }

  openForm() {
    this.props.history.push('/app/special/inbox/form');
  }

  setFolderName(folderName) {
    this.props.dispatch(selectFolderName(folderName));
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
            <Nav className="nav-pills nav-stacked nav-email-folders mt flex-column">
              <NavItem>
                <NavLink href="#" onClick={() => this.setFolderName('Inbox')}>Inbox</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="#" onClick={() => this.setFolderName('Sent Mail')}>Sent</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="#" onClick={() => this.setFolderName('Draft')}>Drafts</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="#" onClick={() => this.setFolderName('Starred')}>Starred</NavLink>
              </NavItem>
            </Nav>
            <h5 className="mt">QUICK VIEW</h5>
            <Nav className="nav-pills nav-stacked nav-email-folders mt flex-column">
              <NavItem>
                <NavLink href="#">
                  <i className="fa fa-circle text-danger float-right"/>
                  Work
                </NavLink>
                <NavLink href="#">
                  <i className="fa fa-circle text-white float-right"/>
                  Private
                </NavLink>
                <NavLink href="#">
                  <i className="fa fa-circle text-gray-light float-right"/>
                  Saved
                </NavLink>
              </NavItem>
            </Nav>
          </Col>
          <Col xl={10} lg={9}>
            <Switch>
              <Route path="/app/special/inbox/form" exact component={FormBundle}/>
              <Route path="/app/special/inbox/:id" exact component={DetailBundle}/>
              <Route path="" exact component={ListBundle}/>
            </Switch>
          </Col>
        </Row>
      </div>
    );
  }

}

function mapStateToProps(store) {
  return {
    mailsList: store.mails.mailsList,
  };
}

export default withRouter(connect(mapStateToProps)(withStyles(s)(Inbox)));

