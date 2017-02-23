import React, { Component } from 'react'
import './Message.css'

class Message extends Component {
  render() {
    let allClassNames = `message ${this.props.data.recieved ? 'recieved' : ''}`;

    return (
      <div className={ allClassNames }>
        { this.props.data.username } - { this.props.data.message }
      </div>
    )
  }
}

export default Message