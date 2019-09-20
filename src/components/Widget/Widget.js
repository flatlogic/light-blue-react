import React from 'react';
import PropTypes from 'prop-types';
import { UncontrolledTooltip } from 'reactstrap';
import s from './Widget.module.scss';
import Loader from '../Loader'; // eslint-disable-line css-modules/no-unused-class
import AnimateHeight from 'react-animate-height';

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
    customControls: PropTypes.node,
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
    customControls: null,
    options: {},

  };

  state = {
    randomId: Math.floor(Math.random() * 100),
    hideWidget: false,
    collapseWidget: false,
    height: 'auto',
    fullscreened: false,
    reloading: false,
  }

  componentDidMount() {
    
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

  handleExpand = () => {
    
    this.setState({
      height: 'auto',
      collapseWidget: false
    });

  };

  handleReload = () => {
    this.setState({ reloading: true });
    
    setTimeout(() => this.setState({ reloading: false }),2000);
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
      fetchingData,
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
      collapseWidget 
    } = this.state;
    
    return (
    <React.Fragment>
      <section
        style={{display: hideWidget ? 'none' : ''}}  
        className={
          ['widget', 
          fullscreened ? 'fullscreened'  : '',
          collapseWidget ? 'collapsed' : '', 
          s.widget, 
          className].join(' ')
        }
        ref={(widget) => { this.el = widget; }} {...attributes}
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
              {/* {fullscreen && (
                <button data-widgster="restore" id={`restoreId-${randomId}`}>
                  <i className="glyphicon glyphicon-resize-small" />
                  {showTooltip && (
                    <UncontrolledTooltip
                      placement={tooltipPlacement}
                      target={`restoreId-${randomId}`}
                    >Restore</UncontrolledTooltip>
                  )}
                </button>
              )} */}
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

              {!fullscreened &&
                close && (
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
              )}
            </div>
          )}
            
        <AnimateHeight
          duration={ 500 }
          height={ height } // see props documentation bellow
        >
        {
          customControls && (
            <div className={`${s.widgetControls} widget-controls`}>
              {customControls}
            </div>
          )
        }

          <div className={`${s.widgetBody} widget-body ${bodyClass}`}>
            {reloading ?  <Loader className={s.widgetLoader} size={40}/> : children}
          </div>
    
       </AnimateHeight>
       
      </section>
      <div style={{display: fullscreened ? 'block'  : 'none'}} className={s.widgetBgFc}></div>
      </React.Fragment>
    );
  }
}

export default Widget;
