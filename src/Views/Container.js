import React, { Component } from 'react';

import Axios from '../Axios/Axios';

class Container extends Component {
	constructor(props){
		super(props);
		this.state = {key: props.item, name: null};
	}

	static getDerivedStateFromProps(props, state){
		if(props.item !== state.key){
			return {
				key: props.item,
				name: null
			};
		}
		return null;
	}

	componentDidMount(){
		console.log('componentDidMount');
	}
	
	componentDidUpdate(prevProps, prevState){
		console.log('componentDidUpdate');
		if (this.state.name === null) {
			this.callApi(this.state.key);
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
				name: response.data
			});
		}).catch(error => {
			console.error(error.data);
		})
	}
	
	render() {
		return (
			<div  className='Container'>
				<span className='Make-Center'>
					{this.state.name}
				</span>	
      	</div>
		)
	}
}

export default Container
