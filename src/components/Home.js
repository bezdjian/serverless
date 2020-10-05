import React, { Component } from 'react';

import { getUserName } from '../services/UserService';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
    };

    getUserName().then(username => {
      this.setState({
        username: username,
      });
    });
  }

  render() {
    return (
      <div className="card">
        <div className="card-header">Hello {this.state.username}!</div>
        <div className="card-body">Welcome to our online school v1..</div>
      </div>
    );
  }
}

export default Home;
