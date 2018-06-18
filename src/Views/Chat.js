import React, { Component } from 'react';
import socketIOClient from "socket.io-client";
import Axios from '../Axios/Axios';

class Chat extends Component {
  constructor() {
    super();
    this.state = {
      response: false
    };
  }
  componentDidMount() {
      let self = this;
      const socket = socketIOClient(Axios.getBaseUrl());
      socket.on("date", function(data){
         self.setState({ response: data });
      });
      socket.on('disconnect', function(error){
         let errorMsg = error ? error.message : 'socket is closed.'
         console.warn(errorMsg, socket.connected);
         if(socket.connected){
            socket.close();
         }
      })
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