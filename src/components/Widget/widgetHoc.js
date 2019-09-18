import React, { Component } from 'react'

const widgetHoc = (WrappedComponent) => {
	return class widgetHoc extends Component {
			
			state = {
				randomId: Math.floor(Math.random() * 100),
				hideWidget: false,
				collapseWidget: false
			}

			componentDidMount() {
				 
			}

			handleClose = () => {
				this.setState({ hideWidget: !this.state.hideWidget})
			}

			handleCollapse = () => {
				this.setState({ collapseWidget: true})
			}

			handleExpand = () => {
				this.setState({ collapseWidget: false})
			}

			render() {

					const { randomId, hideWidget, collapseWidget } = this.state;
				
					return(
									<WrappedComponent 
										{...this.props} 
										randomId={randomId}
										hideWidget={hideWidget}
										collapseWidget={collapseWidget}

										handleClose={this.handleClose}
										handleCollapse={this.handleCollapse}
										handleExpand={this.handleExpand}
									/>
					)
			}
	}
};

export default widgetHoc