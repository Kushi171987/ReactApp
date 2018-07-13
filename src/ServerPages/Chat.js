import React, { Component } from 'react';
import socketIOClient from "socket.io-client";
import Axios from '../Axios/Axios';

class Chat extends Component {
  constructor() {
    super();
    this.state = {
      date: false,
      temp: false
    };
  }
  componentDidMount() {
      let self = this;
      const socket = socketIOClient(Axios.getBaseUrl());
      socket.on("date", function(data){
         self.setState({ date: data });
      });
      socket.on("temp", function(data){
         self.setState({ temp: data });
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
    const { date, temp } = this.state;
    return (
      <div style={{ textAlign: "center" }}>
        {date && temp
          ? <div>
               <p>
                  Date is: {date}
               </p>
               <p>
                  Temp is: {temp}
               </p>
            </div>
          : <p>Loading...</p>}
      </div>
    );
  }
}
export default Chat;