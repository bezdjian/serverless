import React, { Component } from 'react';
import 'bootstrap/dist/js/bootstrap';

import { faHome, faListAlt, faUsers } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class Footer extends Component {
  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark footer">
        <div className="w-100">
          <div className="text-center">
            <a className="navbar-brand" href="/">
              <small>MyLMS v2</small>
            </a>
            <div>
              <small className="text-sm-center">
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
