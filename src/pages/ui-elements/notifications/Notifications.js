import React, { useEffect, useState } from 'react';
import {
  Row, Col, Button,
} from 'reactstrap';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { v4 as uuid } from 'uuid'
import Widget from '../../../components/Widget';
import s from './Notifications.module.scss';

const Notifications = () => {
  const [options, setOptions] = useState({
    position: 'top-right',
    autoClose: 5000,
    closeOnClick: false,
    pauseOnHover: false,
    draggable: true,
  });

  useEffect(() => {
    toast.success('Thanks for checking out Messenger!', {
      position: 'bottom-right',
      autoClose: 5000,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true
    });
  }, []);

  const addSuccessNotification = () => {
    toast.success('Showing success message was successful!', options);
  };

  const toggleLocation = (location) => {
    setOptions((prevOptions) => ({
      ...prevOptions,
      position: location,
    }));
  };
 
  const addInfoNotification = () => {
    let id = uuid();
    toast.info( 
    <div>
      Launching thermonuclear war...
      <Button onClick={() => launchNotification(id)} outline color="info" size="xs" className="width-100 mb-xs me-1 mt-1">Cancel launch</Button>
    </div>, 
    {...options, toastId: id},
    );
  };
 
  const launchNotification = (id) => toast.update(id, { ...options, render: 'Thermonuclear war averted', type: toast.TYPE.SUCCESS });
 
  const addErrorNotification = () => {
    let id = uuid();
    toast.error(
    <div>
      Error destroying alien planet <br/>
      <Button onClick={() => retryNotification(id)} outline color="default" size="xs" className="width-100 mb-xs mr-xs mt-1">Retry</Button>
    </div>, 
    {...options, toastId: id}
    );
  };

  const retryNotification = (id) =>  toast.update(id, {...options, render: 'Alien planet destroyed!', type: toast.TYPE.SUCCESS });
  
  return (
      <div className={s.root}>
        <h1 className="page-title">Messages - <span className="fw-semi-bold">Notifications</span>
        </h1>

        <Widget title={<h6> Messenger </h6>} close collapse settings>
          <Row>
            <Col lg="4" xs="12">
              <h5 className="m-t-1">Layout options</h5>
              <p>There are few position options available for notifications. You can click any of
                them
                to change notifications position:</p>
              <div className="location-selector">
                <div
                  className="bit top left" onClick={() => {
                    toggleLocation('top-left');
                  }}
                />
                <div
                  className="bit top right" onClick={() => {
                    toggleLocation('top-right');
                  }}
                />
                <div
                  className="bit top" onClick={() => {
                    toggleLocation('top-center');
                  }}
                />
                <div
                  className="bit bottom left" onClick={() => {
                    toggleLocation('bottom-left');
                  }}
                />
                <div
                  className="bit bottom right" onClick={() => {
                    toggleLocation('bottom-right');
                  }}
                />
                <div
                  className="bit bottom" onClick={() => {
                    toggleLocation('bottom-center');
                  }}
                />
              </div>
            </Col>

            <Col lg="4" xs="12">
              <h5 className="m-t-1">Notification Types</h5>
              <p>Different types of notifications for lost of use cases. Custom classes are also
                supported.</p>
              <p><Button color="info" id="show-info-message" onClick={addInfoNotification}>Info
                Message</Button></p>
              <p><Button color="danger" id="show-error-message" onClick={addErrorNotification}>Error
                + Retry Message</Button></p>
              <p><Button
                color="success" id="show-success-message" onClick={addSuccessNotification}
              >Success
                Message</Button></p>
            </Col>

            <Col lg="4" xs="12">
              <h5 className="m-t-1">Dead Simple Usage</h5>
              <p>Just few lines of code to instantiate a notifications object. Does not require
                passing any options:</p>
              <pre className={s.notificationsCode}><code>{'toast("Thanks for checking out Messenger!");'}</code></pre>
              <p>More complex example:</p>
              <pre className={s.notificationsCode}>
                <code>{'\ntoast.success( \'There was an explosion while processing your request.\', { \n position: location,\n autoClose: 5000, \n hideProgressBar: false, \n closeOnClick: true,\n pauseOnHover: true, \n draggable: true \n});\n\n'}
                </code>
              </pre>
            </Col>
          </Row>
        </Widget>
      </div>
  );
};

export default Notifications;
