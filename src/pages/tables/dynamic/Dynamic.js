import React, { useState } from 'react';
import {
  Button,
  Input,
  Progress,
  Row,
  Col,
} from 'reactstrap';

import { reactTableData, reactBootstrapTableData } from './data';
import Widget from '../../../components/Widget';
import s from './Dynamic.module.scss';

const Dynamic = () => {
  const [reactTable] = useState(reactTableData());
  const [reactBootstrapTable] = useState(reactBootstrapTableData());
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [sortBy, setSortBy] = useState('id');
  const [sortDirection, setSortDirection] = useState('asc');

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    setPage(1);
  };

  const handlePageSizeChange = (event) => {
    setPageSize(Number(event.target.value));
    setPage(1);
  };

  const handlePageChange = (nextPage) => {
    setPage(nextPage);
  };

  const handleSort = (column) => {
    const nextSortDirection =
      sortBy === column && sortDirection === 'asc'
        ? 'desc'
        : 'asc';

    setSortBy(column);
    setSortDirection(nextSortDirection);
  };

  const getSortValue = (row, column) => {
    if (column === 'date') {
      return new Date(row.date).getTime();
    }
    if (column === 'status') {
      return row.status.progress;
    }
    return row[column];
  };

  const getFilteredAndSortedRows = (rows) => {
    const normalizedQuery = searchQuery.trim().toLowerCase();

    const filteredRows = normalizedQuery
      ? rows.filter((row) => {
        const searchableParts = [
          row.id,
          row.name,
          row.description,
          row.date,
          row.info && row.info.type,
          row.info && row.info.dimensions,
          row.status && row.status.type,
          row.status && row.status.progress,
        ];

        return searchableParts.some((part) =>
          String(part || '')
            .toLowerCase()
            .includes(normalizedQuery),
        );
      })
      : rows;

    return [...filteredRows].sort((left, right) => {
      const leftValue = getSortValue(left, sortBy);
      const rightValue = getSortValue(right, sortBy);

      if (leftValue === rightValue) {
        return 0;
      }

      if (sortDirection === 'asc') {
        return leftValue > rightValue ? 1 : -1;
      }

      return leftValue < rightValue ? 1 : -1;
    });
  };

  const renderSortLabel = (label, column) => {
    const isActive = sortBy === column;
    const direction = isActive ? (sortDirection === 'asc' ? '↑' : '↓') : '';

    return (
      <button
        type="button"
        className="btn btn-link p-0 text-decoration-none fw-semibold"
        onClick={() => handleSort(column)}
      >
        {label} {direction}
      </button>
    );
  };

  const infoFormatter = (cell) => (
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

  const descriptionFormatter = (cell) => (
    <button className="btn-link">
      {cell}
    </button>
  );

  const progressFormatter = (cell) => (
    <Progress style={{ height: '15px' }} color={cell.type} value={cell.progress} />
  );

  const filteredRows = getFilteredAndSortedRows(reactBootstrapTable);
  const totalRows = filteredRows.length;
  const totalPages = Math.max(1, Math.ceil(totalRows / pageSize));
  const currentPage = Math.min(page, totalPages);
  const pageStart = (currentPage - 1) * pageSize;
  const visibleRows = filteredRows.slice(
    pageStart,
    pageStart + pageSize,
  );
  const pageStartNumber = totalRows ? pageStart + 1 : 0;
  const pageEndNumber = totalRows ? pageStart + visibleRows.length : 0;
  const reactTablePreviewRows = reactTable.slice(0, 10);

  return (
    <div>
        <h2 className="page-title">Tables - <span className="fw-semi-bold">Dynamic</span></h2>
        <Widget className="table-responsive" title={<h4>The <span className="fw-semi-bold">React</span> Way</h4>} collapse close>
          <p>
            Fully customizable table built with standard React components and Reactstrap controls.
          </p>
          <div>
            <h3>Input something at below input field:</h3>
            <Row className="mb-lg justify-content-end">
              <Col lg="4" md="6">
                <Input
                  type="search"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  placeholder="Search rows"
                />
              </Col>
            </Row>
            <div className={s.legacyTableWrapper}>
              <table className="table table-striped table-hover mb-0">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Info</th>
                    <th>{renderSortLabel('Date', 'date')}</th>
                    <th>{renderSortLabel('Status', 'status')}</th>
                  </tr>
                </thead>
                <tbody>
                  {!visibleRows.length && (
                    <tr>
                      <td colSpan="6" className="text-center text-muted py-lg">
                        No rows found
                      </td>
                    </tr>
                  )}
                  {visibleRows.map((row) => (
                    <tr key={row.id}>
                      <td>{row.id}</td>
                      <td>{row.name}</td>
                      <td>{descriptionFormatter(row.description)}</td>
                      <td>{infoFormatter(row.info)}</td>
                      <td>{row.date}</td>
                      <td>{progressFormatter(row.status)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="d-flex flex-wrap justify-content-between align-items-center mt-md gap-2">
              <small className="text-muted">
                Showing {pageStartNumber}-{pageEndNumber} of {totalRows}
              </small>
              <div className="d-flex align-items-center gap-2">
                <Input
                  type="select"
                  value={pageSize}
                  onChange={handlePageSizeChange}
                  className={s.pageSizeSelect}
                >
                  <option value="10">10</option>
                  <option value="25">25</option>
                  <option value="50">50</option>
                </Input>
                <Button
                  color="default"
                  size="sm"
                  disabled={currentPage <= 1}
                  onClick={() => handlePageChange(currentPage - 1)}
                >
                  Prev
                </Button>
                <span className="px-2">{currentPage} / {totalPages}</span>
                <Button
                  color="default"
                  size="sm"
                  disabled={currentPage >= totalPages}
                  onClick={() => handlePageChange(currentPage + 1)}
                >
                  Next
                </Button>
              </div>
            </div>
          </div>
        </Widget>
        <Widget title={<h4>React <span className="fw-semi-bold">Table</span></h4>} collapse close>
          <p>
            Simple table extension with sorting, filtering and pagination for React apps. This example now uses a lightweight local table renderer.
          </p>
          <div className={s.legacyTableWrapper}>
            <table className="table table-striped table-hover mb-0">
              <thead>
                <tr>
                  <th>NAME</th>
                  <th>POSITION</th>
                  <th>OFFICE</th>
                  <th>EXT</th>
                  <th>START DATE</th>
                  <th>SALARY</th>
                </tr>
              </thead>
              <tbody>
                {reactTablePreviewRows.map((row, index) => (
                  <tr key={`${row.name}-${index}`}>
                    <td>{row.name}</td>
                    <td>{row.position}</td>
                    <td>{row.office}</td>
                    <td>{row.ext}</td>
                    <td>{row.startDate}</td>
                    <td>${row.salary}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Widget>
    </div>
  );
};

export default Dynamic;
