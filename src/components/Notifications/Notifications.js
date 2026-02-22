import React, { useState } from 'react';
import { ButtonGroup, Button } from 'reactstrap';
import classnames from 'classnames';
import NotificationsDemo from './notifications-demo/Notifications';
import NewNotificationsDemo from './notifications-demo/NewNotifications';
import MessagesDemo from './notifications-demo/Messages';
import ProgressDemo from './notifications-demo/Progress';

import s from './Notifications.module.scss';

const Notifications = () => {
  const [notificationsTabSelected, setNotificationsTabSelected] = useState(1);
  const [newNotifications, setNewNotifications] = useState(null);
  const [isLoad, setIsLoad] = useState(false);

  const changeNotificationsTab = (tab) => {
    setNotificationsTabSelected(tab);
    setNewNotifications(null);
  };

  const loadNotifications = () => {
    setIsLoad(true);

    setTimeout(() => {
      changeNotificationsTab(1);
      setNewNotifications(<NewNotificationsDemo />);
      setIsLoad(false);
    }, 1500);
  };

  let notificationsTab;

  switch (notificationsTabSelected) {
    case 1:
      notificationsTab = <NotificationsDemo />;
      break;
    case 2:
      notificationsTab = <MessagesDemo />;
      break;
    case 3:
      notificationsTab = <ProgressDemo />;
      break;
    default:
      notificationsTab = <NotificationsDemo />;
      break;
  }

  return (
    <section className={`${s.notifications} navbar-notifications`}>
      <header className={[s.cardHeader, 'card-header'].join(' ')}>
        <div className="text-center mb-sm">
          <strong>You have 13 notifications</strong>
        </div>
        <ButtonGroup className={s.notificationButtons}>
          <Button
            outline
            color="default"
            size="sm"
            className={s.notificationButton}
            onClick={() => changeNotificationsTab(1)}
            active={notificationsTabSelected === 1}
          >
            Notifications
          </Button>
          <Button
            outline
            color="default"
            size="sm"
            className={s.notificationButton}
            onClick={() => changeNotificationsTab(2)}
            active={notificationsTabSelected === 2}
          >
            Messages
          </Button>
          <Button
            outline
            color="default"
            size="sm"
            className={s.notificationButton}
            onClick={() => changeNotificationsTab(3)}
            active={notificationsTabSelected === 3}
          >
            Progress
          </Button>
        </ButtonGroup>
      </header>
      {newNotifications || notificationsTab}
      <footer className={[s.cardFooter, 'text-sm', 'card-footer'].join(' ')}>
        <Button
          color="link"
          className={classnames(
            { disabled: isLoad },
            s.btnNotificationsReload,
            'btn-xs',
            'float-end',
            'py-0'
          )}
          onClick={loadNotifications}
          id="load-notifications-btn"
        >
          {isLoad ? (
            <span>
              <i className="la la-refresh la-spin" /> Loading...
            </span>
          ) : (
            <i className="la la-refresh" />
          )}
        </Button>
        <span className="fs-mini">Synced at: 21 Apr 2014 18:36</span>
      </footer>
    </section>
  );
};

export default Notifications;
