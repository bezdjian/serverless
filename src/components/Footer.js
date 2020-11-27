import React, { Component } from 'react';
import 'bootstrap/dist/js/bootstrap';

class Footer extends Component {
  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="w-100">
          <div className="text-center">
            <a className="navbar-brand" href="/">
              <small>MyLMS v2</small>
            </a>
            <div>
              <small className="text-sm-center font-white">
                Developed by Harout Bezdjian with AWS Services
              </small>
            </div>
          </div>
        </div>
      </nav>
    );
  }
}

export default Footer;
