import React, { Component } from 'react';

import Axios from '../Axios/Axios';

class Container extends Component {
	constructor(props){
		super(props);
		this.state = {state: props.state};
	}

	static getDerivedStateFromProps(props, state){
		if(props.hasOwnProperty('state')){
			return props;
		}
		return null;
	}

	componentDidMount(){
		console.log('componentDidMount');
	}
	
	componentDidUpdate(prevProps, prevState, snapshot){
		console.log('componentDidUpdate');
		if(this.state.state){
			this.callApi(this.state.state);
		}
	}

	componentWillUnmount(){
		console.log('componentWillUnmount')
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
