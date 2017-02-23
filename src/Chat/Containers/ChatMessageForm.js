import React, { Component } from 'react'
import './ChatMessageForm.css'

class ChatMessageForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      message: ''
    }
    this.sendMessage = this.sendMessage.bind(this);
    this.handleFormData = this.handleFormData.bind(this);
  }

  handleFormData(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  sendMessage(e) {
    // pop up
    this.props.sendMessage({ username: this.state.username, message: this.state.message });
    this.setState({ message: '' });
    e.preventDefault();
  }

  render() {
    return (
      <div className="new-message" onSubmit={ this.sendMessage }>
        <form>
          <input type="text" 
                 className="field username" 
                 name="username" 
                 value={ this.state.username } 
                 placeholder="Username:"
                 onChange={ this.handleFormData } />
          <input type="text" 
                 className="field message" 
                 name="message" 
                 value={ this.state.message }
                 placeholder="Enter a Message:"
                 onChange={ this.handleFormData } />
          <input type="submit" className="field submit" value="Send!"/>
        </form>
      </div>
    )
  }
}

export default ChatMessageForm;