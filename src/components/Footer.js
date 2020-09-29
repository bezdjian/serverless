import React, { Component } from 'react';
import 'bootstrap/dist/js/bootstrap';

import { faHome, faListAlt, faUsers } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class Header extends Component {
  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light position-sticky">
        <a className="navbar-brand" href="/">
          MyLMS v2 Footer
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <a className="nav-link" href="/">
                <FontAwesomeIcon icon={faHome} /> Home{' '}
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/courses">
                <FontAwesomeIcon icon={faListAlt} /> All Courses
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/students">
                <FontAwesomeIcon icon={faUsers} /> Students
              </a>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default Header;
