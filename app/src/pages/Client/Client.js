import React, { Component } from 'react';

class Client extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
    };
  }

  componentWillMount() {
    const { socket } = this.context;
    const { params } = this.props;

    // Request that the relay send our connection the current message.
    socket.emit('GET_MESSAGE', { clientId: params.clientId });

    // Handle initial message relay and all future messages.
    socket.on('RELAY_MESSAGE', (data) => {
      // Only handle messages intended for this client.
      if (data.clientId === params.clientId) {
        // Update the current state to display the active message.
        this.setState({ message: data.message });
      }
    });
  }

  displayMessage() {
    return {__html: this.state.message};
  }

  render() {
    return (
      <div>
        <h2>Welcome to Genghiscon 2017!</h2>
        <div dangerouslySetInnerHTML={this.displayMessage()} />
      </div>
    );
  }
}

Client.contextTypes = {
  socket: React.PropTypes.object,
};

export default Client;
