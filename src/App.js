import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Dashboard from './Views/Dashboard';
import About from './Views/About';
import NoMatch from './NoMatch';
import Chat from './ServerPages/Chat';

class App extends Component {
	constructor(props){
		super(props);
		this.state = {};
	}

    render() {
        return (
            <Router>
                <Switch>
                    <Route exact path="/" component={Dashboard}/>
                    <Route path="/about" component={About}/>
                    <Route component={NoMatch}/>
                </Switch>
            </Router>
        );
    }
}

export default App;
