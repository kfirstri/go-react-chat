import React, { Component } from 'react'
import './ChatWindow.css'

import Message from '../Components/Message'

class ChatWindow extends Component {
  componentDidUpdate() {
    let currDiv = this.refs.msgWindow;
    currDiv.scrollTop = currDiv.scrollHeight;
  }

  render() {
    return (
      <div className="chat-window">
        <div className="title">
          Chat Title - { this.props.title }
        </div>
        <div className="all-messages" ref="msgWindow">
          { this.props.msgData.map((m, i) => { return <Message key={i} id={i} data={m} /> }) }
        </div>
      </div>
    )
  }
}

export default ChatWindow;