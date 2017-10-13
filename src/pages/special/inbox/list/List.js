import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route, withRouter, Redirect } from 'react-router';
  import { connect } from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import {
  Table
} from 'reactstrap';
import classnames from 'classnames';

import s from './List.scss';
import { toggleStarStatus } from '../../../../actions/mail';
import Widget from '../../../../components/Widget';

class List extends React.Component {

  constructor(props) {
    super(props);

    this.changeStarStatus = this.changeStarStatus.bind(this);
  }

  openMail(id) {
    this.props.history.push(`inbox/${id}`);
  }

  changeStarStatus(id) {
    this.props.dispatch(toggleStarStatus(id));
  }

  render() {
    return (
      <div className={s.root}>
        <div className="clearfix mb-xs">
          <div className="float-right">
            <p className="widget-email-count">Showing 1 - 10 of 96 messages</p>
            <ul className={`${s.widgetEmailPagination} pagination `}>
              <li className="prev disabled page-item"><a className="page-link" href="#"><i
                className="fa fa-chevron-left"/></a></li>
              <li className="active page-item"><a className="page-link" href="#">1</a></li>
              <li className="page-item"><a className="page-link" href="#">2</a></li>
              <li className="next page-item"><a className="page-link" href="#"><i className="fa fa-chevron-right"/></a>
              </li>
            </ul>
          </div>
        </div>
        <Widget
          className="widget-email"
          title={
            <div className="row">
              <div className="col-sm-4 d-inline-flex">
                <div className="btn-group mr-1">
                  <a className="btn btn-secondary btn-sm" href="#">
                    Select
                    <i className="fa fa-angle-down" />
                  </a>
                  <ul className="dropdown-menu">
                    <li><a className="dropdown-item">All</a></li>
                    <li><a className="dropdown-item">None</a></li>
                    <li className="dropdown-divider" />
                    <li><a className="dropdown-item">Read</a></li>
                    <li><a className="dropdown-item">Unread</a></li>
                  </ul>
                </div>
                <div className="btn-group">
                  <a className="btn btn-sm btn-secondary" href="#" >
                    Actions
                    <i className="fa fa-angle-down" />
                  </a>
                  <ul className="dropdown-menu">
                    <li><a className="dropdown-item" href="#">Reply</a></li>
                    <li><a className="dropdown-item" href="#">Forward</a></li>
                    <li><a className="dropdown-item" href="#">Archive</a></li>
                    <li className="dropdown-divider" />
                    <li><a className="dropdown-item">Mark As Read</a></li>
                    <li><a className="dropdown-item">Mark As Unread</a></li>
                    <li className="dropdown-divider" />
                    <li><a className="dropdown-item">Delete</a></li>
                  </ul>
                </div>
              </div>
              <div className="col-sm-8">
                <input className="form-control form-control-sm input-transparent width-200 float-right"
                       id="mailbox-search" type=" text" placeholder=" Search Messages"/>
              </div>
            </div>
          }
        >
          <div className="widget-table-overflow">
            <Table className={`${s.tableEmails} table-striped table-hover`}>
              <thead>
              <tr>
                <th colSpan="3">
                  <div className={`checkbox abc-checkbox ${s.abcCheckbox}`}>
                    <input id="toggle-all" type="checkbox"/>
                    <label htmlFor="toggle-all"/>
                  </div>
                </th>
              </tr>
              </thead>
              <tbody>
              {
                this.props.mailsList
                  .filter((row) => {
                    if (this.props.selectedFolder == 'Starred') {
                      return row.starred;
                    }else {
                      let folder = this.props.folders.filter(folder => folder.name == this.props.selectedFolder);
                      return folder[0].id == row.folderId;
                    }
                  })
                  .map((row, i) =>
                    <tr key={i}>
                      <td className={s.selectMail}>
                        <div className={`checkbox abc-checkbox ${s.abcCheckbox}`}>
                          <input className="toggle-one" type="checkbox" id="checkbox" />
                          <label />
                        </div>
                      </td>
                      <td className="favorite"><span className="starred">
                      <i
                        className={ classnames('fa', {'fa-star': row.starred}, {'fa-star-o': !row.starred}) }
                        onClick={() => this.changeStarStatus(row.id)}
                      /></span></td>
                      <td className={`${s.name} hidden-xs-down`} onClick={() => this.openMail(row.id)}>{row.sender}</td>
                      <td className={s.subject} onClick={() => this.openMail(row.id)}>{row.subject}</td>
                      <td className="hidden-xs-down">
                        <i className={ classnames({'fa fa-paperclip': row.paperclip})} />
                      </td>
                      <td className={s.date}>{row.date}</td>
                    </tr>
                  )
              }
              {
                this.props.mailsList.length < 1 &&
                <tr>
                  <td colSpan="12">Nothing here yet</td>
                </tr>
              }
              </tbody>
            </Table>
          </div>
        </Widget>
      </div>
    );
  }
}

function mapStateToProps(store) {
  return {
    mailsList: store.mails.mailsList,
    selectedFolder: store.mails.selectedFolder,
    folders: store.mails.folders,
  };
}

export default withRouter(connect(mapStateToProps)(withStyles(s)(List)));
