import React, { Component } from 'react';
import socketIOClient from "socket.io-client";
import Axios from '../Axios/Axios';

class Chat extends Component {
  constructor() {
    super();
    this.state = {
      response: false,
      endpoint: Axios.getBaseUrl()
    };
  }
  componentDidMount() {
      let self = this;
      const { endpoint } = this.state;
      const socket = socketIOClient(endpoint);
      socket.on("date", function(data){
         self.setState({ response: data });
      });
  }
  render() {
    const { response } = this.state;
    return (
      <div style={{ textAlign: "center" }}>
        {response
          ? <p>
              Date is: {response}
            </p>
          : <p>Loading...</p>}
      </div>
    );
  }
}
export default Chat;