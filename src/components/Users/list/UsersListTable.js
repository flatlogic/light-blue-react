import * as dataFormat from "components/Users/list/UsersDataFormatters";
import actions from "../../../actions/usersListActions";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { push } from "actions/navigation";

import {
  Button,
  Col,
  Input,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Row,
} from "reactstrap";

import Widget from "components/Widget";

import s from "../Users.module.scss";

const UsersListTable = () => {
  const dispatch = useDispatch();
  const rows = useSelector((store) => store.users.list.rows);
  const modalOpen = useSelector((store) => store.users.list.modalOpen);
  const idToDelete = useSelector((store) => store.users.list.idToDelete);
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  useEffect(() => {
    dispatch(actions.doFetch({}));
  }, [dispatch]);

  const handleDelete = () => {
    dispatch(actions.doDelete(idToDelete));
  };

  const openModal = (cell) => {
    dispatch(actions.doOpenConfirm(cell));
  };

  const closeModal = () => {
    dispatch(actions.doCloseConfirm());
  };

  const actionFormatter = (cell) => (
    <div className={`d-flex justify-content-between`}>
      <Button
        className={s.controBtn}
        color="info"
        onClick={() => dispatch(push(`/admin/users/${cell}`))}
      >
        View
      </Button>
      <Button
        className={s.controBtn}
        color="success"
        onClick={() => dispatch(push(`/admin/users/${cell}/edit`))}
      >
        Edit
      </Button>
      <Button
        className={s.controBtn}
        color="danger"
        onClick={() => openModal(cell)}
      >
        Delete
      </Button>
    </div>
  );

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

  const getFilteredRows = (items) => {
    const normalizedQuery = searchQuery.trim().toLowerCase();

    if (!normalizedQuery) {
      return items;
    }

    return items.filter((row) => {
      const searchableParts = [
        row.firstName,
        row.lastName,
        row.phoneNumber,
        row.email,
        row.role,
      ];

      return searchableParts.some((part) =>
        String(part || "")
          .toLowerCase()
          .includes(normalizedQuery),
      );
    });
  };

  const filteredRows = getFilteredRows(rows);
  const totalRows = filteredRows.length;
  const totalPages = Math.max(1, Math.ceil(totalRows / pageSize));
  const currentPage = Math.min(page, totalPages);
  const pageStart = (currentPage - 1) * pageSize;
  const visibleRows = filteredRows.slice(pageStart, pageStart + pageSize);
  const pageStartNumber = totalRows ? pageStart + 1 : 0;
  const pageEndNumber = totalRows ? pageStart + visibleRows.length : 0;

  return (
    <div>
      <Widget title="Users" collapse close>
        <div className={s.usersTableWrapper}>
          <Row className="mb-lg justify-content-end">
            <Col lg="4" md="6">
              <Input
                type="search"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Search users"
              />
            </Col>
          </Row>

          <div
            className={`table-responsive table-striped table-hover ${s.usersListTableMobile}`}
          >
            <table className="table table-striped table-hover mb-0">
              <thead>
              <tr>
                <th>
                  <span className="fs-sm">Avatar</span>
                </th>
                <th>
                  <span className="fs-sm">First Name</span>
                </th>
                <th>
                  <span className="fs-sm">Last Name</span>
                </th>
                <th>
                  <span className="fs-sm">Phone Number</span>
                </th>
                <th>
                  <span className="fs-sm">E-mail</span>
                </th>
                <th>
                  <span className="fs-sm">Role</span>
                </th>
                <th>
                  <span className="fs-sm">Disabled</span>
                </th>
                <th>
                  <span className="fs-sm">Actions</span>
                </th>
              </tr>
              </thead>
              <tbody>
              {!visibleRows.length && (
                <tr>
                  <td colSpan="8" className="text-center text-muted py-lg">
                    No users found
                  </td>
                </tr>
              )}
              {visibleRows.map((row, index) => (
                <tr key={row.id}>
                  <td>
                    {dataFormat.imageFormatter(
                      row.avatars,
                      row,
                      pageStart + index,
                    )}
                  </td>
                  <td>{row.firstName}</td>
                  <td>{row.lastName}</td>
                  <td>{row.phoneNumber}</td>
                  <td>{row.email}</td>
                  <td>{row.role}</td>
                  <td>{dataFormat.booleanFormatter(row.disabled)}</td>
                  <td>{actionFormatter(row.id)}</td>
                </tr>
              ))}
              </tbody>
            </table>
          </div>

          <Row className="mt-md align-items-center">
            <Col md="6">
              <small className="text-muted">
                Showing {pageStartNumber}-{pageEndNumber} of {totalRows}
              </small>
            </Col>
            <Col md="6" className="d-flex justify-content-md-end gap-2 mt-2 mt-md-0">
              <Input
                className={s.pageSizeSelect}
                type="select"
                value={pageSize}
                onChange={handlePageSizeChange}
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
              <span className="align-self-center px-2">
                  {currentPage} / {totalPages}
                </span>
              <Button
                color="default"
                size="sm"
                disabled={currentPage >= totalPages}
                onClick={() => handlePageChange(currentPage + 1)}
              >
                Next
              </Button>
            </Col>
          </Row>
        </div>
      </Widget>

      <Modal
        size="sm"
        isOpen={modalOpen}
        toggle={closeModal}
      >
        <ModalHeader toggle={closeModal}>
          Confirm delete
        </ModalHeader>
        <ModalBody>
          Are you sure you want to delete this item?
        </ModalBody>
        <ModalFooter>
          <Button color="default" onClick={closeModal}>
            Cancel
          </Button>
          <Button color="primary" onClick={handleDelete}>
            Delete
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default UsersListTable;
