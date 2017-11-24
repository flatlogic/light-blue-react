import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import {
  Row,
  Col,
  Table,
  UncontrolledButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';
import classnames from 'classnames';

import s from './List.scss';
import {
  toggleStarStatus,
  toggleAllChecked,
  setReadStatus,
  deleteMail,
  setSelectStatus,
} from '../../../../actions/mail';
import Widget from '../../../../components/Widget';

class List extends React.Component {

  static propTypes = {
    filteredMailsList: PropTypes.arrayOf(PropTypes.shape({}).isRequired), // eslint-disable-line
    history: PropTypes.object, // eslint-disable-line
    dispatch: PropTypes.func.isRequired,
    checkAll: PropTypes.bool.isRequired,
  };

  constructor(props) {
    super(props);

    this.t = [];

    this.state = {
      search: '',
      selectDropdownValue: '',
      actionsDropdownValue: '',
      checkAll: false,
      mailFiltered: [],
    };

    this.changeStarStatus = this.changeStarStatus.bind(this);
    this.updateSearch = this.updateSearch.bind(this);
    this.changeSelectDropdown = this.changeSelectDropdown.bind(this);
    this.changeActionsDropdown = this.changeActionsDropdown.bind(this);
    this.handleChangeAllChk = this.handleChangeAllChk.bind(this);
    this.handleChangeChk = this.handleChangeChk.bind(this);
    this.allChkSelected = this.allChkSelected.bind(this);
  }

  changeSelectDropdown(e) {
    const target = e.currentTarget.textContent;
    this.setState({ selectDropdownValue: target });

    switch (target) {
      case 'All': {
        this.props.dispatch(toggleAllChecked(true));
        break;
      }
      case 'None': {
        this.props.dispatch(toggleAllChecked(false));
        break;
      }
      case 'Read': {
        this.props.filteredMailsList.forEach((mail) => {
          this.props.dispatch(setSelectStatus(mail.id, mail.unread));
        });
        break;
      }
      case 'Unread': {
        this.props.filteredMailsList.forEach((mail) => {
          this.props.dispatch(setSelectStatus(mail.id, !mail.unread));
        });
        break;
      }
      default:
        return 0;
    }
    return 0;
  }

  changeActionsDropdown(e) {
    const target = e.currentTarget.textContent;
    this.setState({ actionsDropdownValue: target });
    switch (target) {
      case 'Mark As Read': {
        this.props.filteredMailsList.forEach((mail) => {
          if (mail.selected) {
            this.props.dispatch(setReadStatus(mail.id, true));
          }
        });
        break;
      }
      case 'Mark As Unread': {
        this.props.filteredMailsList.forEach((mail) => {
          if (mail.selected) {
            this.props.dispatch(setReadStatus(mail.id, false));
          }
        });
        break;
      }
      case 'Delete': {
        this.props.filteredMailsList.forEach((mail) => {
          if (mail.selected) {
            this.props.dispatch(deleteMail(mail.id));
          }
        });
        break;
      }
      default:
        return 0;
    }
    return 0;
  }

  openMail(id) {
    this.props.history.push(`inbox/${id}`);
  }

  changeStarStatus(id) {
    this.props.dispatch(toggleStarStatus(id));
  }

  updateSearch(event) {
    this.setState({ search: event.target.value });
  }

  handleChangeAllChk() {
    this.props.dispatch(toggleAllChecked(!this.props.checkAll));
  }

  handleChangeChk(mail) {
    this.props.dispatch(setSelectStatus(mail.id, !mail.selected));

    setTimeout(() => {
      if (this.allChkSelected(true)) {
        this.props.dispatch(toggleAllChecked(true));
      }
    }, 0);
  }

  allChkSelected(celected) {
    return this.props.filteredMailsList.every(mail => mail.selected === celected);
  }

  render() {
    return (
      <div className={s.root}>
        <div className="clearfix mb-xs">
          <div className="d-inline-flex float-right">
            <p className={s.widgetEmailCount}>Showing 1 - 10 of 96 messages</p>
            <ul className={`${s.widgetEmailPagination} pagination `}>
              <li className="prev disabled page-item">
                <a className="page-link" href="#"><i className="fa fa-chevron-left" /></a>
              </li>
              <li className="active page-item"><a className="page-link" href="#">1</a></li>
              <li className="page-item"><a className="page-link" href="#">2</a></li>
              <li className="next page-item">
                <a className="page-link" href="#"><i className="fa fa-chevron-right" /></a>
              </li>
            </ul>
          </div>
        </div>
        <Widget
          className="widget-email"
          title={
            <Row>
              <Col sm="4" className="d-inline-flex">
                <UncontrolledButtonDropdown>
                  <DropdownToggle
                    caret color="secondary"
                    className="dropdown-toggle-split mr-xs"
                  >
                    Select
                  </DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem onClick={this.changeSelectDropdown}>
                      All
                    </DropdownItem>
                    <DropdownItem onClick={this.changeSelectDropdown}>
                      None
                    </DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem onClick={this.changeSelectDropdown}>
                      Read
                    </DropdownItem>
                    <DropdownItem onClick={this.changeSelectDropdown}>
                      Unread
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledButtonDropdown>
                <UncontrolledButtonDropdown>
                  <DropdownToggle
                    caret color="secondary"
                    className="dropdown-toggle-split mr-xs"
                  >
                    Actions
                  </DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem onClick={this.changeActionsDropdown}>
                      Replay
                    </DropdownItem>
                    <DropdownItem onClick={this.changeActionsDropdown}>
                      Forward
                    </DropdownItem>
                    <DropdownItem onClick={this.changeActionsDropdown}>
                      Archive
                    </DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem onClick={this.changeActionsDropdown}>
                      Mark As Read
                    </DropdownItem>
                    <DropdownItem onClick={this.changeActionsDropdown}>
                      Mark As Unread
                    </DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem onClick={this.changeActionsDropdown}>
                      Delete
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledButtonDropdown>
              </Col>
              <Col sm="8">
                <input
                  className="form-control form-control-sm input-transparent width-200 float-right"
                  type="text"
                  value={this.state.search}
                  onChange={this.updateSearch}
                  placeholder="Search Messages"
                />
              </Col>
            </Row>
          }
        >
          <div className="widget-table-overflow">
            <Table className={`${s.tableEmails} table-striped table-hover`}>
              <thead>
                <tr>
                  <th colSpan="3">
                    <div className={`checkbox abc-checkbox ${s.abcCheckbox}`}>
                      <input id="toggle-all" type="checkbox" checked={this.props.checkAll} onChange={this.handleChangeAllChk} />
                      <label htmlFor="toggle-all" />
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {
                  this.props.filteredMailsList
                    .filter((row) => {
                      const searchText = new RegExp(this.state.search, 'ig');
                      if (row.sender) {
                        return row.sender.search(searchText) !== -1;
                      }
                      if (row.subject) {
                        return row.subject.search(searchText) !== -1;
                      }
                      return false;
                    })
                    .map(row =>
                      <tr key={row.id} className={row.unread ? s.unread : ''}>
                        <td className={s.selectMail}>
                          <div className={`checkbox abc-checkbox ${s.abcCheckbox}`}>
                            <input
                              className="toggle-one"
                              type="checkbox"
                              id={`checkbox-${row.id}`}
                              checked={row.selected}
                              onChange={() => this.handleChangeChk(row)}
                            />
                            <label htmlFor={`checkbox-${row.id}`} />
                          </div>
                        </td>
                        <td className={s.favorite}>
                          <span
                            className={row.starred ? s.starred : ''}
                          >
                            <i
                              className={classnames(
                                  'fa',
                                  { 'fa-star': row.starred },
                                  { 'fa-star-o': !row.starred },
                                )}
                              onClick={() => this.changeStarStatus(row.id)}
                            />
                          </span>
                        </td>
                        <td className={`${s.name} hidden-xs-down`} onClick={() => this.openMail(row.id)}>{row.sender}</td>
                        <td className={s.subject} onClick={() => this.openMail(row.id)}>
                          {row.subject}
                        </td>
                        <td className="hidden-xs-down">
                          <i className={classnames({ 'fa fa-paperclip': row.paperclip })} />
                        </td>
                        <td className={s.date}>{row.date}</td>
                      </tr>,
                    )
                }
                {
                  this.props.filteredMailsList.length < 1 &&
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
    filteredMailsList: store.mails.filteredMailsList,
    checkAll: store.mails.checkAll,
  };
}

export default withRouter(connect(mapStateToProps)(withStyles(s)(List)));
