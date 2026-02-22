import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { UncontrolledTooltip } from 'reactstrap';
import s from './Widget.module.scss';
import classNames from 'classnames';
import Loader from '../Loader';
import AnimateHeight from 'react-animate-height';
import { v4 as uuid } from 'uuid'
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

const widgetPropTypes = {
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
    fetchingData: PropTypes.bool,
};

const widgetDefaultProps = {
    title: null,
    className: '',
    children: [],
    close: false,
    fullscreen: false,
    collapse: false,
    refresh: false,
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
    fetchingData: false,
    widgetType: "",
};

const Widget = (props) => {
  const [state, setComponentState] = useState({
    randomId: uuid(),
    hideWidget: false,
    collapseWidget: !!props.collapsed,
    height: props.collapsed ? 0 : 'auto',
    fullscreened: false,
    reloading: false,
    modal: false,
    apiData: '',
  });

  const setState = (value) => {
    if (typeof value === 'function') {
      setComponentState((prevState) => ({
        ...prevState,
        ...value(prevState),
      }));
      return;
    }

    setComponentState((prevState) => ({
      ...prevState,
      ...value,
    }));
  };


  const toggleModal = () => {
    setState({ modal: !state.modal });
  }

  const handleClose = () => {
    setState({ hideWidget: !state.hideWidget})
  }

  const handleCollapse = () => {
    let heightValue = state.collapseWidget ? 'auto' : 0
    setState({
      height: heightValue,
      collapseWidget: !state.collapseWidget,
      reloading: false
    });

  };

  const closeWithModal = () => {
    toggleModal();
    handleClose();
  }

  const handleExpand = () => {

    setState({
      height: 'auto',
      collapseWidget: false
    });

  };

  const handleReload = () => {
    const { widgetType, updateWidgetData } = props;
    const type = widgetType;
    if(type) {
      updateWidgetData(type)
    }
    setState({ reloading: true });
    let endpoint = false;
    if(!endpoint) {
      setTimeout(() => setState({ reloading: false }),2000);
    } else {
      setState({ reloading: true });
      fetch('https://yourapi.com')
        .then(response => response.json())
        .then(json => setState({ apiData: json.title}))
        .then(setTimeout(() => setState({ reloading: false }), 1000))
    }
  }

  const handleFullscreen = () => {
    setState({ fullscreened: !state.fullscreened });
  }

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
      widgetType,
      updateWidgetData,
      options, //eslint-disable-line
      ...attributes
    } = props;
    const mainControls = !!(close || fullscreen || collapse || refresh || settings || settingsInverse);

    const {
      reloading,
      fullscreened,
      randomId,
      height,
      hideWidget,
      collapseWidget,
      modal,
    } = state;



    return (
    <React.Fragment>
      <section
        style={{display: hideWidget ? 'none' : ''}}
        className={
          classNames('widget', {'fullscreened' : !!fullscreened, 'collapsed' : !!collapseWidget}, s.widget, className, (reloading || fetchingData) ? s.reloading : '')
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
                <button className={`${s.inverse}`}><i
                  className="la la-cog text-white mt-0"
                /></button>
              )}
              {refresh && (
                <button onClick={handleReload} id={`reloadId-${randomId}`}>
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
                <button onClick={handleFullscreen} id={`fullscreenId-${randomId}`}>
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
                    <button onClick={handleCollapse} id={`collapseId-${randomId}`}>
                    <i className={`la la-angle-${!collapseWidget ? 'down' : 'up'}`} />
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
              {!fullscreened && (
                (close && !prompt) ? (
                <button onClick={handleClose} id={`closeId-${randomId}`}>
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
                <button onClick={toggleModal} id={`closeId-${randomId}`}>
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
          {customDropDown && (
            <div className={`${s.widgetControls} widget-controls`}>
            <UncontrolledDropdown>
              <DropdownToggle
                tag="span"
                data-toggle="dropdown"

              >
                <i className="glyphicon glyphicon-cog" />
              </DropdownToggle>
              <DropdownMenu className="bg-widget-transparent">
                <DropdownItem onClick={handleReload} title="Reload">
                  Reload &nbsp;&nbsp;
                  <span className="badge rounded-pill bg-success animate__animated animate__bounceIn">
                    <strong>9</strong>
                  </span>
                </DropdownItem>

                <DropdownItem onClick={handleFullscreen} title={!fullscreened ? "Full Screen" : "Restore"}>{!fullscreened ? "Fullscreen" : "Restore"} </DropdownItem>
                <DropdownItem divider />
                {!fullscreened && (!prompt ? <DropdownItem onClick={handleClose} title="Close">Close</DropdownItem>
                : <DropdownItem onClick={toggleModal} title="Close">Close</DropdownItem>)}
              </DropdownMenu>
            </UncontrolledDropdown>
            </div>
          )}
        {
          customControls && (
            <div className={`${s.widgetControls} widget-controls`}>
              {!fullscreened && ((customClose && !prompt) ? (
                <button onClick={handleClose} id={`closeId-${randomId}`} className={s.customControlItem}><i title="Close" className="glyphicon glyphicon-remove"/></button>
              ) : (
                  <button onClick={toggleModal} id={`closeId-${randomId}`} className={s.customControlItem}><i title="Close" className="glyphicon glyphicon-remove"/></button>
              ))}
              {!fullscreened && (customCollapse && (
                  <button onClick={handleCollapse} id={`closeId-${randomId}`} className={s.customControlItem}><i title="Collapse" className={`glyphicon glyphicon-chevron-${!collapseWidget ? 'down' : 'up'}`}/></button>
              ))}
              {customFullscreen && (
                  <button onClick={handleFullscreen} id={`closeId-${randomId}`} className={s.customControlItem}><i title="Fullscreen" className={`glyphicon glyphicon-resize-${fullscreened ? 'small' : 'full'}`} /></button>
              )}
              {customReload && (
                  <button onClick={handleReload} id={`closeId-${randomId}`} className={s.customControlItem}><i title="I am spinning!" className="fa fa-refresh" /></button>
              )}
            </div>
          )
        }
        <AnimateHeight
          duration={ 500 }
          height={ height }
        >

          <div className={`${s.widgetBody} widget-body ${bodyClass}`}>
            {reloading || fetchingData ?  <Loader className={s.widgetLoader} size={40}/> : customBody ? (
                <div className="jumbotron handle bg-transparent text-white mb-0">
                <div className="container">
                  <h1>Draggable story!</h1>
                  <p className="lead">
                    <em>Build</em> your own
                    interfaces! Sit back and relax.
                  </p>
                  <p className="text-center">
                    <button onClick={handleFullscreen} className="btn btn-danger btn-lg">
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
        <Modal isOpen={modal} toggle={toggleModal} id="news-close-modal">
        <ModalHeader toggle={toggleModal} id="news-close-modal-label">Sure?</ModalHeader>
        <ModalBody className="bg-white">
          Do you really want to unrevertably remove this super news widget?
        </ModalBody>
        <ModalFooter>
          <Button color="default" onClick={toggleModal} data-dismiss="modal">No</Button>{' '}
          <Button color="danger" onClick={closeWithModal} id="news-widget-remove">Yes,
            remove widget</Button>
        </ModalFooter>
      </Modal>
      )}
      <div style={{display: fullscreened ? 'block'  : 'none'}} className={s.widgetBackground}></div>
      </React.Fragment>
    );
};

Widget.propTypes = widgetPropTypes;
Widget.defaultProps = widgetDefaultProps;

export default Widget;
