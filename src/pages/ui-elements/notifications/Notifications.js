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
    position: "bottom-right"
  }

  componentDidMount() {
    this.addSuccessNotification();
  }

  addSuccessNotification = () => toast.success('Wow so easy!', {
    position: this.state.position,
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true
  });
  

  addInfoNotification = () => toast.info('Wow so easy!', {
    position: this.state.position,
    autoClose: false,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true
  });

  addErrorNotification = () => {

    if (Math.floor(Math.random() * 3) + 1  < 3) { 
      
      toast.error('Error destroying alien planet', {
        position: this.state.position,
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true
      });
    } else {
      toast.success('Alien planet destroyed!', {
        position: this.state.position,
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true
      });      
    }

  }

  toggleLocation = (location) => {
    let className = location;
    this.setState({
      position: className,
    });
  }

  render() {
    return (
      <div className={s.root}>
      <ToastContainer 
        enableMultiContainer 
        containerId={'toast-container'} 
        position={this.state.position}
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnVisibilityChange
        draggable
        pauseOnHover
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
                { /* eslint-enable */}
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
              <pre><code>{'Messenger().post("Thanks for checking out Messenger!");'}</code></pre>
              <p>More complex example:</p>
              <pre>
                <code>{'\nMessenger().post({\n  message: \'There was an explosion while processing your request.\',\n  type: \'error\',\n  showCloseButton: true\n});\n\n'}
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
