import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-material-responsive-grid';

import LeftNav from './LeftNav';
import Container from './Container';
import Notifications from './Notifications';

import ErrorBoundary from './Errors/ErrorBoundary';

class Home extends Component {
	constructor(props){
		super(props);
		this.state = {selectedItem: undefined};
	}

	onSelectState = (item) => {
		this.setState({selectedItem: item});
	}

	render() {
		return (
			<div>
				<header className="App-header">
				</header>
				<Grid>
					<Row>
						<ErrorBoundary>
							<Notifications message={this.state.selectedItem}/>
						</ErrorBoundary>
					</Row>					
					<Row>
						<Col xs4={1} lg={3} md={3}>
							<ErrorBoundary>
								<LeftNav onClickState={this.onSelectState}/>
							</ErrorBoundary>
						</Col>
						<Col xs4={3} lg={9} md={9}>
							<ErrorBoundary>
								<Container item={this.state.selectedItem}/>
							</ErrorBoundary>
						</Col>
					</Row>
			</Grid>
		  </div>
		)
	 }
}

export default Home
