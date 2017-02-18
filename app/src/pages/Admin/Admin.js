import React, { Component } from 'react';
import { connect } from 'react-redux';

class Admin extends Component {

  constructor(props) {
    super(props);
    this.state = {
      message: '',
    };
  }

  handleFieldChange = (e) => {
    // Update the message in state with every change to the field.
    this.setState({ message: e.target.value });
  }

  handleFormSubmit = (e) => {
    e.preventDefault();
    const { socket } = this.context;
    const { params, onMessageSubmit } = this.props;
    const { message } = this.state;

    // Update the store.
    onMessageSubmit(message);

    // Send the message to the relay for distribution and storage.
    socket.emit('SET_MESSAGE', {
      clientId: params.clientId,
      message: message,
    });

    // Reset the form state to have an empty field.
    this.setState({ message: '' });
  }

  render() {
    return (
      <form onSubmit={(e) => this.handleFormSubmit(e)}>
        <div>{this.props.message}</div>
        <input
          type="text"
          name="message"
          value={this.state.message}
          onChange={(e) => this.handleFieldChange(e)}
        />
        <button type="submit">Send Message</button>
      </form>
    );
  }
}

Admin.contextTypes = {
  socket: React.PropTypes.object,
};

export default connect()(Admin);
