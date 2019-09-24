import React from 'react';
import PropTypes from 'prop-types';
import { UncontrolledTooltip } from 'reactstrap';
import s from './Widget.module.scss';
import classNames from 'classnames';
import Loader from '../Loader'; // eslint-disable-line css-modules/no-unused-class
import AnimateHeight from 'react-animate-height';
import {
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from 'reactstrap';

class Widget extends React.Component {
  static propTypes = {
    title: PropTypes.node,
    className: PropTypes.string,
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node,
    ]),
    close: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
    fullscreen: PropTypes.bool,
    collapse: PropTypes.bool,
    refresh: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
    settings: PropTypes.bool,
    settingsInverse: PropTypes.bool,
    tooltipPlacement: PropTypes.string,
    showTooltip: PropTypes.bool,
    bodyClass: PropTypes.string,
    customControls: PropTypes.bool,
    options: PropTypes.object, //eslint-disable-line,
  };

  static defaultProps = {
    title: null,
    className: '',
    children: [],
    close: true,
    fullscreen: true,
    collapse: true,
    refresh: true,
    settings: false,
    settingsInverse: false,
    tooltipPlacement: 'bottom',
    showTooltip: false,
    bodyClass: '',
    customControls: false,
    customClose: null,
    customExpand: null,
    customCollapse: null,
    customFullscreen: null,
    customReload: null,
    customDropDown: null,
    prompt: false,
    collapsed: false,
    options: {},

  };

  state = {
    randomId: Math.floor(Math.random() * 100),
    hideWidget: false,
    collapseWidget: false,
    height: 'auto',
    fullscreened: false,
    reloading: false,
    modal: false,
    apiData: ''
  }

  componentDidMount() {
    if(this.props.collapsed) {
      this.handleCollapse();
    }
  }

  toggleModal = () => {
    this.setState({ modal: !this.state.modal });
  }

  handleClose = () => {
    this.setState({ hideWidget: !this.state.hideWidget})
  }

  handleCollapse = () => {

    this.setState({
      height: 0,
      collapseWidget: true,
      reloading: false
    });

  };

  closeWithModal = () => {
    this.toggleModal();
    this.handleClose();
  }

  handleExpand = () => {
    
    this.setState({
      height: 'auto',
      collapseWidget: false
    });

  };

  handleReload = () => {
    this.setState({ reloading: true });
    let endpoint = true;
    if(!endpoint) {
      setTimeout(() => this.setState({ reloading: false }),2000);
    } else {
      this.setState({ reloading: true });
      fetch('https://jsonplaceholder.typicode.com/todos/1')
        .then(response => response.json())
        .then(json => this.setState({ apiData: json.title}))
        .then(setTimeout(() => this.setState({ reloading: false }), 1000))
    }
  }

  handleFullscreen = () => {
    this.setState({ fullscreened: !this.state.fullscreened });
  }
  
  render() {
    const {
      title,
      className,
      children,
      close,
      fullscreen,
      collapse,
      refresh,
      settings,
      settingsInverse,
      tooltipPlacement,
      showTooltip,
      bodyClass,
      customControls,
      customClose,
      customExpand,
      customCollapse,
      customFullscreen,
      customReload,
      fetchingData,
      customDropDown,
      customBody,
      prompt,
      collapsed,
      options, //eslint-disable-line
      ...attributes
    } = this.props;
    const mainControls = !!(close || fullscreen || collapse || refresh || settings || settingsInverse);

    const {
      reloading,
      fullscreened,
      randomId,
      height,
      hideWidget,
      collapseWidget,
      modal,
    } = this.state;

    
    
    return (
    <React.Fragment>
      <section
        style={{display: hideWidget ? 'none' : ''}}  
        className={
          ['widget', 
          classNames({'fullscreened' : !!fullscreened, 'collapsed' : !!collapseWidget, 'reloading': !!reloading}),
          s.widget, 
          className].join(' ')
        } {...attributes}
        >
        {
          title && (
            typeof title === 'string'
              ? <h5 className={s.title}>{title}</h5>
              : <header className={s.title}>{title}</header>
          )
        }
        
        {
          !customControls && mainControls && (
            <div className={`${s.widgetControls} widget-controls`}>
              {settings && (
                <button><i className="la la-cog" /></button>
              )}
              {settingsInverse && (
                <button className={`bg-gray-transparent ${s.inverse}`}><i
                  className="la la-cog text-white"
                /></button>
              )}
              {refresh && (
                <button onClick={this.handleReload} id={`reloadId-${randomId}`}>
                  {typeof refresh === 'string' ?
                    <strong className="text-gray-light">{refresh}</strong> :
                    <i className="la la-refresh" />}
                  {showTooltip && (
                    <UncontrolledTooltip
                      placement={tooltipPlacement}
                      target={`reloadId-${randomId}`}
                    >Reload</UncontrolledTooltip>
                  )}
                </button>
              )}
              {fullscreen && (
                <button onClick={this.handleFullscreen} id={`fullscreenId-${randomId}`}>
                  <i className={`glyphicon glyphicon-resize-${fullscreened ? 'small' : 'full'}`} />
                  {showTooltip && (
                    <UncontrolledTooltip
                      placement={tooltipPlacement}
                      target={`fullscreenId-${randomId}`}
                    >Fullscreen</UncontrolledTooltip>
                  )}
                </button>
              )}
              {!fullscreened && 
                collapse && (
                  <span>
                    <button onClick={this.handleCollapse} id={`collapseId-${randomId}`}>
                    <i className="la la-angle-down" />
                      {showTooltip && (
                        <UncontrolledTooltip
                          placement={tooltipPlacement}
                          target={`collapseId-${randomId}`}
                        >Collapse</UncontrolledTooltip>
                      )}
                    </button>
                  </span>
                )
              }

              {!fullscreened &&
                collapse && (
                <span>
                  <button onClick={this.handleExpand} id={`expandId-${randomId}`}>
                    <i className="la la-angle-up" />
                    {showTooltip && (
                      <UncontrolledTooltip
                        placement={tooltipPlacement}
                        target={`expandId-${randomId}`}
                      >Expand</UncontrolledTooltip>
                    )}
                  </button>
                </span>
              )}

              {!fullscreened && (
                (close && !prompt) ? (
                <button onClick={this.handleClose} id={`closeId-${randomId}`}>
                  {typeof close === 'string' ?
                    <strong className="text-gray-light">{close}</strong> :
                    <i className="la la-remove" />}
                  {showTooltip && (
                    <UncontrolledTooltip
                      placement={tooltipPlacement}
                      target={`closeId-${randomId}`}
                    >Close</UncontrolledTooltip>
                  )}
                </button>
              ) : (
                <button onClick={this.toggleModal} id={`closeId-${randomId}`}>
                {typeof close === 'string' ?
                  <strong className="text-gray-light">{close}</strong> :
                  <i className="la la-remove" />}
                {showTooltip && (
                  <UncontrolledTooltip
                    placement={tooltipPlacement}
                    target={`closeId-${randomId}`}
                  >Modal</UncontrolledTooltip>
                )}
              </button>
              ))}
            </div>
          )}
        {
          customControls && (
            <div className={`${s.widgetControls} widget-controls`}>
              {customDropDown && (
                <UncontrolledDropdown>
                  <DropdownToggle
                    tag="span"
                    data-toggle="dropdown"

                  >
                    <i className="glyphicon glyphicon-cog" />
                  </DropdownToggle>
                  <DropdownMenu className="bg-widget-transparent" right>
                    <DropdownItem onClick={this.handleReload} title="Reload">
                      Reload &nbsp;&nbsp;
                      <span className="badge badge-pill badge-success animated bounceIn">
                        <strong>9</strong>
                      </span>
                    </DropdownItem>
                    <DropdownItem onClick={this.handleFullscreen} title={!fullscreened ? "Full Screen" : "Restore"}>{!fullscreened ? "Fullscreen" : "Restore"} </DropdownItem>
                    <DropdownItem divider />
                    {!prompt ? <DropdownItem onClick={this.handleClose} title="Close">Close</DropdownItem>
                    : <DropdownItem onClick={this.toggleModal} title="Close">Close</DropdownItem>}
                  </DropdownMenu>
                </UncontrolledDropdown>
              )}
              {!fullscreened && ((customClose && !prompt) ? (
                <div className={s.customControlItem} onClick={this.handleClose}>
                  {customClose}
                </div>
              ) : (
                <div className={s.customControlItem} onClick={this.toggleModal}>
                  {customClose}
                </div>
              ))}
              {!fullscreened && (customExpand && (
                <div className={s.customControlItem} onClick={this.handleExpand}>
                  {customExpand}
                </div>
              ))}
              {!fullscreened && (customCollapse && (
                <div className={s.customControlItem} onClick={this.handleCollapse}>
                  {customCollapse}
                </div>
              ))}
              {customFullscreen && (
                <div className={s.customControlItem} onClick={this.handleFullscreen}>
                  {customFullscreen}
                </div>
              )}
              {customReload && (
                <div className={s.customControlItem} onClick={this.handleReload}>
                  {customReload}
                </div>
              )}
            </div>
          )
        }
        <AnimateHeight
          duration={ 500 }
          height={ height } // see props documentation bellow
        >


          <div className={`${s.widgetBody} widget-body ${bodyClass}`}>
            {reloading || fetchingData ?  <Loader className={s.widgetLoader} size={40}/> : customBody ? (
                <div className="jumbotron handle bg-gray text-white mb-0">
                <div className="container">
                  <h1>Draggable story!</h1>
                  <p className="lead">
                    <em>Build</em> your own
                    interfaces! Sit back and relax.
                  </p>
                  <p className="text-center">
                    <button onClick={this.handleFullscreen} className="btn btn-danger btn-lg">
                      {!fullscreened ? 
                        <React.Fragment>Fullscreen me! &nbsp;
                          <i className="fa fa-check" />
                        </React.Fragment>
                        : 'Go Back'
                      }
                    </button>
                  </p>
                </div>
              </div>
            ) : children}
          </div>
    
       </AnimateHeight>
       
      </section>
      {prompt && (
        <Modal isOpen={modal} toggle={this.toggleModal} id="news-close-modal">
        <ModalHeader toggle={this.toggleModal} id="news-close-modal-label">Sure?</ModalHeader>
        <ModalBody className="bg-white">
          Do you really want to unrevertably remove this super news widget?
        </ModalBody>
        <ModalFooter>
          <Button color="default" onClick={this.toggleModal} data-dismiss="modal">No</Button>{' '}
          <Button color="danger" onClick={this.closeWithModal} id="news-widget-remove">Yes,
            remove widget</Button>
        </ModalFooter>
      </Modal> 
      )}
      <div style={{display: fullscreened ? 'block'  : 'none'}} className={s.widgetBgFc}></div>
      </React.Fragment>
    );
  }
}

export default Widget;
