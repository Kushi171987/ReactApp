import React, { Component } from 'react';

import Axios from '../Axios/Axios';

class Container extends Component {
	constructor(props){
		super(props);
		this.state = {state: props.state};
	}

	componentWillReceiveProps(nextProps){
		if(nextProps.hasOwnProperty('state')){
			this.callApi(nextProps.state);
		}
	}

	callApi = key => {
		Axios.get(key)
		.then(response => {
			console.log(response.data);
			this.setState({
				state: response.data
			});
		}).catch(error => {
			console.error(error.data);
		})
	}
	
	render() {
		return (
			<div  className='Container'>
				<span className='Make-Center'>
					{this.state.state}
				</span>	
      	</div>
		)
	}
}

export default Container
