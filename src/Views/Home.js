import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-material-responsive-grid';

import LeftNav from './LeftNav';
import Container from './Container';

/*const states = [
	'Uttar Pradesh',
	'Maharashtra',
	'Bihar',
	'West Bengal',
	'Madhya Pradesh',
	'Tamil Nadu',
	'Rajasthan',
	'Karnataka',
	'Gujarat',
	"Andhra Pradesh",
	'Odisha',
	'Telangana',
	'Kerala',
	'Jharkhand',
	'Assam',
	'Punjab',
	'Chhattisgarh',
	'Haryana',
	'Jammu and Kashmir',
	'Uttarakhand',
	"Himachal Pradesh",
	'Tripura',
	"Meghalaya",
	'Manipur',
	'Nagaland',
	'Goa',
	'Arunachal Pradesh',
	'Mizoram',
	'Sikkim',
	'Delhi',
	'Puducherry',
	"Chandigarh",
	"Andaman and Nicobar Islands",
	'Dadra and Nagar Haveli',
	'Daman and Diu',
	'Lakshadweep'
];*/


class Home extends Component {
	constructor(props){
		super(props);
		this.state = {selectedState: undefined};
	}

	onSelectState = (item) => {
		this.setState({selectedState: item});
	}

	render() {
		return (
			<div>
				<header className="App-header">
				</header>
				<Grid>
					<Row>
						<Col xs4={1} lg={3} md={3}>
							<LeftNav onClickState={this.onSelectState}/>
						</Col>
						<Col xs4={3} lg={9} md={9}>
							<Container state={this.state.selectedState}/>
						</Col>
					</Row>
			</Grid>
		  </div>
		)
	 }
}

export default Home
