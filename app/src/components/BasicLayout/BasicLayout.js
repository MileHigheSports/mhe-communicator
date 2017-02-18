import React, { Component } from 'react';

class BasicLayout extends Component {
  render() {
    return(
      <div>
        <nav className="navbar navbar-inverse navbar-fixed-top">
          <div className="container">
            <div className="navbar-header">
              <a className="navbar-brand" href="#">Mile High eSports Communicator</a>
            </div>
          </div>
        </nav>

        <div className="container container-offset">
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default BasicLayout;
