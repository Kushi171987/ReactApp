import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Home from './Views/Home';
import About from './Views/About';
import NoMatch from './NoMatch';

class App extends Component {
	constructor(props){
		super(props);
		this.state = {};
	}

  render() {
    return (
      <Router>
			<Switch>
				<Route exact path="/" component={Home}/>
				<Route path="/about" component={About}/>
				<Route component={NoMatch}/>
			</Switch>
		</Router>
    );
  }
}

export default App;
