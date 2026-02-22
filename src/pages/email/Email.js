import React, { useEffect, useState } from 'react';
import cx from 'classnames';
import { Alert } from 'reactstrap';

import Filters from './components/Filters/Filters';
import MessageTable from './components/MessageTable/MessageTable';

import s from './Email.module.scss';

const Email = () => {
  const [isNotificationOpen, setIsNotificationOpen] = useState(true);
  const [filter, setFilter] = useState(null);
  const [openedMessage, setOpenedMessage] = useState(null);
  const [compose, setCompose] = useState(false);
  const [composeData, setComposeData] = useState(null);
  const [alertAfter, setAlertAfter] = useState(false);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setAlertAfter(true);
    }, 0);

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  const onFilter = (nextFilter) => {
    setFilter(nextFilter);
    setCompose(false);
    setComposeData(null);
  };

  const closeNotification = () => {
    setIsNotificationOpen(false);
  };

  const openMessage = (id) => {
    setOpenedMessage(id);
    if (id === null) {
      setCompose(false);
      setComposeData(null);
    }
  };

  const changeCompose = (nextCompose, data) => {
    setCompose(nextCompose);

    if (data) {
      setComposeData(data);
    }
  };

  return (
    <div>
      <div className={s.pageTopLine}>
        <h1 className="page-title">Email - <span className="fw-semi-bold">Inbox</span></h1>
        <Alert
          isOpen={isNotificationOpen}
          color="warning"
          toggle={closeNotification}
          className={cx(s.alert, { [s.alertAfter]: alertAfter })}
        >
          Hey! This is a <span className="fw-semi-bold">real app</span> with CRUD and Search functions. Have fun!
        </Alert>
      </div>
      <div className={s.view}>
        <Filters
          filter={onFilter}
          openMessage={openMessage}
          compose={changeCompose}
        />
        <MessageTable
          filter={filter}
          openedMessage={openedMessage}
          openMessage={openMessage}
          compose={compose}
          changeCompose={changeCompose}
          composeData={composeData}
        />
      </div>
    </div>
  );
};

export default Email;
