import React from 'react';
import {
  Progress,
  Dropdown,
  DropdownMenu,
  DropdownToggle,
  DropdownItem,
  Row,
  Col,
} from 'reactstrap';
import classnames from 'classnames';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';

import ReactTable from 'react-table';

import { reactTableData, reactBootstrapTableData } from './data';
import Widget from '../../../components/Widget';
import s from './Dynamic.module.scss';

const { SearchBar } = Search;

class Dynamic extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      reactTable: reactTableData(),
      reactBootstrapTable: reactBootstrapTableData(),
    };
  }

  renderSizePerPageDropDown = (props) => {
    const limits = [];
    props.sizePerPageList.forEach((limit) => {
      limits.push(<DropdownItem key={limit} onClick={() => props.changeSizePerPage(limit)}>{ limit }</DropdownItem>);
    });

    return (
      <Dropdown isOpen={props.open} toggle={props.toggleDropDown}>
        <DropdownToggle color="default" caret>
          { props.currSizePerPage }
        </DropdownToggle>
        <DropdownMenu>
          { limits }
        </DropdownMenu>
      </Dropdown>
    );
  };

  render() {
    function infoFormatter(cell) {
      return (
        <div>
          <small>
            Type:&nbsp;<span className="fw-semi-bold">{cell.type}</span>
          </small>
          <br />
          <small>
            Dimensions:&nbsp;<span className="fw-semi-bold">{cell.dimensions}</span>
          </small>
        </div>
      );
    }

    function descriptionFormatter(cell) {
      return (
        <button className="btn-link">
          {cell}
        </button>
      );
    }

    function progressFormatter(cell) {
      return (
        <Progress style={{ height: '15px' }} color={cell.type} value={cell.progress} />
      );
    }

    function progressSortFunc(a, b, order) {
      if (order === 'asc') {
        return a.progress - b.progress;
      }
      return b.progress - a.progress;
    }

    function dateSortFunc(a, b, order) {
      if (order === 'asc') {
        return new Date(a).getTime() - new Date(b).getTime();
      }
      return new Date(b).getTime() - new Date(a).getTime();
    }

    function sortableHeaderFormatter(column, index, components) {
      let icon = (<div className={classnames(s.sortArrowsContainer, 'ml-sm')}>
        <span className={classnames('caret', 'mb-xs', s.rotatedArrow)} />
        <span className="caret"/>
      </div>);

      if (components.sortElement.props.order === 'asc') {
        icon = (<div className="ml-sm">
          <span className={classnames('caret', 'mb-xs', s.rotatedArrow)}/>
        </div>);
      } else if (components.sortElement.props.order === 'desc') {
        icon = (<div className="ml-sm">
          <span className="caret mb-xs"/>
        </div>);
      }

      return <div className={s.sortableHeaderContainer}>{column.text} {icon}</div>
    }

    return (
      <div>
        <h2 className="page-title">Tables - <span className="fw-semi-bold">Dynamic</span></h2>
        <Widget className="table-responsive" title={<h4>The <span className="fw-semi-bold">React</span> Way</h4>} collapse close>
          <p>
            Fully customizable Table. Built with <a href="https://allenfang.github.io/react-bootstrap-table/" target="_blank" rel="noopener noreferrer">react-bootstrap-table</a>
          </p>
          <ToolkitProvider
            keyField="id"
            data={this.state.reactBootstrapTable}
            columns={[{
              dataField: 'id',
              text: 'ID'
            }, {
              dataField: 'name',
              text: 'Name'
            }, {
              dataField: 'description',
              text: 'Description',
              formatter: descriptionFormatter,
            }, {
              dataField: 'info',
              text: 'info',
              formatter: infoFormatter,
            }, {
              dataField: 'date',
              text: 'Date',
              sort: true,
              sortFunc: dateSortFunc,
              headerFormatter: sortableHeaderFormatter,
            }, {
              dataField: 'status',
              text: 'Status',
              formatter: progressFormatter,
              sort: true,
              sortFunc: progressSortFunc,
              headerFormatter: sortableHeaderFormatter,
            }]}
            search
          >
            {
              props => (
                <div>
                  <h3>Input something at below input field:</h3>
                  <Row className="mb-lg float-right">
                    <Col>
                      <SearchBar { ...props.searchProps } />
                    </Col>
                  </Row>
                  <BootstrapTable
                    { ...props.baseProps }
                    pagination={paginationFactory()}
                    striped
                  />
                </div>
              )
            }
          </ToolkitProvider>
        </Widget>
        <Widget title={<h4>React <span className="fw-semi-bold">Table</span></h4>} collapse close>
          <p>
            Simple table extension with sorting, filtering and pagination for React apps. Built with <a href="https://react-table.js.org/" target="_blank" rel="noopener noreferrer">react-table</a>
          </p>
          <ReactTable
            data={this.state.reactTable}
            filterable
            columns={[
              {
                Header: 'NAME',
                accessor: 'name',
              },
              {
                Header: 'POSITION',
                accessor: 'position',
              },
              {
                Header: 'OFFICE',
                accessor: 'office',
              },
              {
                Header: 'EXT',
                accessor: 'ext',
              },
              {
                Header: 'START DATE',
                accessor: 'startDate',
              },
              {
                Header: 'SALARY',
                accessor: 'salary',
              },
            ]}
            defaultPageSize={10}
            className="-striped -highlight"
          />
        </Widget>
      </div>
    );
  }

}

export default Dynamic;
