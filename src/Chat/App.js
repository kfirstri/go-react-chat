import React, { Component } from 'react';
import './App.css';

import ChatMessageForm from './Containers/ChatMessageForm'
import ChatWindow from './Containers/ChatWindow'

class App extends Component {
  constructor(props) {
    super(props);

    this.sendMessage = this.sendMessage.bind(this);
    this.addMessageToState = this.addMessageToState.bind(this);
    this.recieveMessage = this.recieveMessage.bind(this);

    let address = `ws://${window.location.hostname}:3001/ws`;
    let conn = new WebSocket(address);

    conn.addEventListener('message', this.recieveMessage);

    this.state = { 
      messages: [],
      conn: conn
    };
  }

  recieveMessage(e) {
    var msg = JSON.parse(e.data);
    msg.recieved = true;
    
    this.addMessageToState(msg);
  }

  sendMessage(msg) {
    // Send the message
    this.state.conn.send(JSON.stringify(msg));

    // Add to view
    this.addMessageToState(msg);
  }

  addMessageToState(msg) {
    this.setState({
      messages: this.state.messages.concat(msg)
    })
  }

  render() {
    return (
      <div className="ChatApp">
        <ChatWindow title="Hello Chat" msgData={ this.state.messages } />
        <ChatMessageForm sendMessage={ this.sendMessage }/>
      </div>
    );
  }
}

export default App;
