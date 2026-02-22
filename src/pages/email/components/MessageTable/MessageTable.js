import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { Table, Input, FormGroup, Label } from 'reactstrap';

import Widget from '../../../../components/Widget';
import MessageTableHeader from '../MessageTableHeader/MessageTableHeader';
import Pagination from '../Pagination/Pagination';
import Compose from '../Compose/Compose';
import Message from '../Message/Message';

import mock from '../../mock';
import s from './MessageTable.module.scss';

const MessageTable = ({
  filter,
  openedMessage,
  openMessage,
  compose,
  composeData,
  changeCompose,
}) => {
  const [messages, setMessages] = useState(mock);
  const [checkedIds, setCheckedIds] = useState([]);
  const [searchString, setSearchString] = useState('');
  const prevFilterRef = useRef(filter);

  const chooseNone = () => {
    setCheckedIds([]);
  };

  useEffect(() => {
    if (filter !== prevFilterRef.current) {
      chooseNone();
      openMessage(null);
      prevFilterRef.current = filter;
    }
  }, [filter, openMessage]);

  const chooseAll = () => {
    const data = filter
      ? messages.filter((message) => message[filter])
      : messages;

    setCheckedIds(data.map((message) => message.id));
  };

  const chooseRead = () => {
    const newCheckedIds = [];

    messages.forEach((message) => {
      if (!message.unreaded) {
        newCheckedIds.push(message.id);
      }
    });

    setCheckedIds(newCheckedIds);
  };

  const chooseUnread = () => {
    const newCheckedIds = [];

    messages.forEach((message) => {
      if (message.unreaded) {
        newCheckedIds.push(message.id);
      }
    });

    setCheckedIds(newCheckedIds);
  };

  const choose = (id) => {
    setCheckedIds((prevCheckedIds) => {
      const indexOfId = prevCheckedIds.indexOf(id);

      if (indexOfId === -1) {
        return [...prevCheckedIds, id];
      }

      const newCheckedIds = [...prevCheckedIds];
      newCheckedIds.splice(indexOfId, 1);
      return newCheckedIds;
    });
  };

  const markUnread = () => {
    setMessages((prevMessages) => prevMessages.map((message) => {
      if (checkedIds.indexOf(message.id) !== -1) {
        return {
          ...message,
          unreaded: true,
        };
      }
      return message;
    }));
  };

  const markRead = () => {
    setMessages((prevMessages) => prevMessages.map((message) => {
      if (checkedIds.indexOf(message.id) !== -1) {
        return {
          ...message,
          unreaded: false,
        };
      }
      return message;
    }));
  };

  const deleteItems = () => {
    setMessages((prevMessages) => prevMessages
      .map((message) => {
        if (checkedIds.indexOf(message.id) !== -1) {
          return {
            ...message,
            deleted: true,
          };
        }
        return message;
      })
      .filter((message) => !message.deleted));

    setCheckedIds([]);
  };

  const starItem = (id) => {
    setMessages((prevMessages) => prevMessages.map((message) => {
      if (message.id === id) {
        return {
          ...message,
          starred: !message.starred,
        };
      }

      return message;
    }));
  };

  const handleOpenMessage = (id) => {
    setMessages((prevMessages) => prevMessages.map((message) => {
      if (message.id === id) {
        return {
          ...message,
          unreaded: false,
        };
      }

      return message;
    }));

    openMessage(id);
  };

  const search = (value) => {
    setSearchString(value.toLowerCase());
  };

  const isSearchable = (message) => {
    if (searchString) {
      return (
        message.content.toLowerCase().indexOf(searchString) !== -1 ||
        message.from.toLowerCase().indexOf(searchString) !== -1 ||
        message.theme.toLowerCase().indexOf(searchString) !== -1
      );
    }

    return true;
  };

  const filteredMessages = messages.filter((message) => message[filter]);
  const dataToDisplay = filter ? filteredMessages : messages;

  return (
    <div className={s.messages}>
      {openedMessage === null && !compose
        ? <Pagination />
        : <button className={cx('btn btn-default', s.backButton)} onClick={() => openMessage(null)}>
          <i className="fa fa-angle-left fa-lg" />
        </button>
      }
      {/* eslint-disable */}
      {openedMessage === null && !compose
        ? <Widget>
          <MessageTableHeader
            all={chooseAll}
            none={chooseNone}
            read={chooseRead}
            unread={chooseUnread}
            markRead={markRead}
            markUnread={markUnread}
            deleteItems={deleteItems}
            search={search}
          />
          <Table hover>
            <thead>
              <tr>
                <th>
                  <FormGroup className="checkbox abc-checkbox" check>
                    <Input
                      id="checkbox-main"
                      type="checkbox"
                      onChange={dataToDisplay.length !== checkedIds.length ? chooseAll : chooseNone}
                      checked={dataToDisplay.length !== 0 && checkedIds.length === dataToDisplay.length}
                    />{' '}
                    <Label for="checkbox-main" check />
                  </FormGroup>
                </th>
              </tr>
            </thead>
            <tbody>
              {dataToDisplay
                .filter((message) => isSearchable(message))
                .map((message) =>
                  (<tr
                    key={message.id}
                    className={cx({ [s.unreadedMessage]: message.unreaded })}
                  >
                    <td className={s.messageCheckbox} >
                      <FormGroup className="checkbox abc-checkbox" check>
                        <Input
                          id={`checkbox${message.id}`}
                          type="checkbox"
                          checked={checkedIds.indexOf(message.id) !== -1}
                          onChange={() => choose(message.id)}
                        />{' '}
                        <Label for={`checkbox${message.id}`} check />
                      </FormGroup>
                    </td>
                    <td
                      className={s.messageStar}
                      onClick={() => starItem(message.id)}>{message.starred
                        ? <span className={s.messageStarred}><i className="fa fa-star text-success" /></span>
                        : <span><i className="fa fa-star-o" /></span>}
                    </td>
                    <td
                      className={s.messageFrom}
                      onClick={() => handleOpenMessage(message.id)}
                    >{message.from}</td>
                    <td onClick={() => handleOpenMessage(message.id)}>{message.theme}</td>
                    <td className={s.messageClip}>{message.attachments && <i className="fa fa-paperclip" />}</td>
                    <td className={s.messageDate}>{message.date}</td>
                  </tr>),
                )}
            </tbody>
          </Table>
        </Widget>
        : compose
          ? <Compose data={composeData} />
          : <Message message={messages[openedMessage]} compose={changeCompose} />
      }
      {/* eslint-enable */}
    </div>
  );
};

MessageTable.propTypes = {
  filter: PropTypes.string,
  openedMessage: PropTypes.number,
  openMessage: PropTypes.func.isRequired,
  compose: PropTypes.bool.isRequired,
  composeData: PropTypes.shape({
    from: PropTypes.string,
    theme: PropTypes.string,
  }),
  changeCompose: PropTypes.func.isRequired,
};

MessageTable.defaultProps = {
  filter: null,
  openedMessage: null,
  composeData: null,
};

export default MessageTable;
