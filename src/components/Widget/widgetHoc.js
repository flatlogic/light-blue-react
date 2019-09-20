import React, { Component } from 'react'

const widgetHoc = (WrappedComponent) => {
  return class widgetHoc extends Component {
      
      state = {
        randomId: Math.floor(Math.random() * 100),
        hideWidget: false,
        collapseWidget: false,
        height: 'auto',
        fullscreened: false,
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
        this.setState({ fullscreened: !this.state.fullscreened })
      }

      handleRestore = () => {
        this.setState({ fullscreened: false })
      }

      render() {

          const { randomId, hideWidget, collapseWidget, height, reloading, fullscreened } = this.state;
        
          return(
                  <WrappedComponent 
                    {...this.props} 
                    randomId={randomId}
                    hideWidget={hideWidget}
                    collapseWidget={collapseWidget}
                    height={height}
                    reloading={reloading}
                    fullscreened={fullscreened}

                    handleClose={this.handleClose}
                    handleCollapse={this.handleCollapse}
                    handleExpand={this.handleExpand}
                    handleReload={this.handleReload}
                    handleFullscreen={this.handleFullscreen}
                  />
          )
      }
  }
};

export default widgetHoc