import React from 'react';
import {
  Row, Col, Button,
} from 'reactstrap';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Widget from '../../../components/Widget';
import s from './Notifications.module.scss';

class Notifications extends React.Component {
  
  state = {
    options: {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true
    }
  }

  componentDidMount() {
    toast.success('Thanks for checking out Messenger!', {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: true,
      pauseOnHover: false,
      draggable: true
    });
  }

  addSuccessNotification = () => toast.success('Showing success message was successful!', this.state.options);
  

  addInfoNotification = () => toast.info( 
  <div>
    Launching thermonuclear war...
    <button className={s.notifyRetry} onClick={this.launchNotification}>Cancel launch</button>
  </div>, 
  { 
    ...this.state.options,
  });


  addErrorNotification = () => {
      toast.error(
      <div>
        Error destroying alien planet
        <button className={s.errorRetry} onClick={this.retryNotification}>Retry</button>
      </div>
      , this.state.options);
  }

  toggleLocation = (location) => {
    this.setState({
      options: {
        position: location,
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true
      }
    });
  }

  retryNotification = () => {
    toast.success('Alien planet destroyed!', {...this.state.options, delay: 1000});
  }
  launchNotification = () => {
    toast.success('Thermonuclear war averted', {...this.state.options, delay: 1000});
  }

  render() {
    return (
      <div className={s.root}>
      <ToastContainer
        position={this.state.position}
        enableMultiContainer 
        containerId={'toast-container'} 
        newestOnTop
        closeOnClick
        rtl={false}
        
      />
        <ol className="breadcrumb">
          <li className="breadcrumb-item">YOU ARE HERE</li>
          <li className="breadcrumb-item active">UI Notifications</li>
        </ol>
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
                    this.toggleLocation('top-left');
                  }}
                />
                <div
                  className="bit top right" onClick={() => {
                    this.toggleLocation('top-right');
                  }}
                />
                <div
                  className="bit top" onClick={() => {
                    this.toggleLocation('top-center');
                  }}
                />
                <div
                  className="bit bottom left" onClick={() => {
                    this.toggleLocation('bottom-left');
                  }}
                />
                <div
                  className="bit bottom right" onClick={() => {
                    this.toggleLocation('bottom-right');
                  }}
                />
                <div
                  className="bit bottom" onClick={() => {
                    this.toggleLocation('bottom-center');
                  }}
                />
              </div>
            </Col>

            <Col lg="4" xs="12">
              <h5 className="m-t-1">Notification Types</h5>
              <p>Different types of notifications for lost of use cases. Custom classes are also
                supported.</p>
              <p><Button color="info" id="show-info-message" onClick={this.addInfoNotification}>Info
                Message</Button></p>
              <p><Button color="danger" id="show-error-message" onClick={this.addErrorNotification}>Error
                + Retry Message</Button></p>
              <p><Button
                color="success" id="show-success-message" onClick={this.addSuccessNotification}
              >Success
                Message</Button></p>
            </Col>

            <Col lg="4" xs="12">
              <h5 className="m-t-1">Dead Simple Usage</h5>
              <p>Just few lines of code to instantiate a notifications object. Does not require
                passing any options:</p>
              <pre><code>{'toast("Thanks for checking out Messenger!");'}</code></pre>
              <p>More complex example:</p>
              <pre>
                <code>{'\ntoast.success( \'There was an explosion while processing your request.\', { \n position: location,\n autoClose: 5000, \n hideProgressBar: false, \n closeOnClick: true,\n pauseOnHover: true, \n draggable: true \n});\n\n'}
                </code>
              </pre>
            </Col>
          </Row>
        </Widget>
      </div>
    );
  }
}

export default Notifications;
