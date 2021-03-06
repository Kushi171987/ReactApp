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
   
   //Using async/await
   // async function callApi(key) {
   //    try{
   //       let response = await Axios.get(key);
   //    }catch(error){
   //       console.error(error);
   //    }
   // }

   // callApi = (key) => {
   //    fetch(key).then(response => {
   //       console.log(response.data);
   //    }).catch(error => {
   //       console.error(error);
   //    });
   // }

	callApi = key => {
		Axios.get(key)
         .then(response => {
            console.log(response.data);
            this.setState({
               name: response.data
            });
         }).catch(error => {
            console.error(error.response.statusText);
            this.setState({
               name: error.response.statusText
            });
         })
	}
	
	render() {
		return (
			<div  className='Container'>
				{this.state.name}
      	</div>
		)
	}
}

export default Container
