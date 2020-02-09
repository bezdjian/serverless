import React, { Component } from 'react';
import 'bootstrap/dist/js/bootstrap';

import { faHome, faListAlt, faUsers } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class Header extends Component {
  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
        <a className="navbar-brand" href="/">
          MyLMS v2
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
                <span className="sr-only">(current)</span>
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
          <ul className="form-inline my-2 my-lg-0 navbar-nav">
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="/"
                id="navbarDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Profile
              </a>
              <div
                className="dropdown-menu dropdown-menu-right"
                aria-labelledby="navbarDropdown"
              >
                <a className="dropdown-item" href="/">
                  Action
                </a>
                <a className="dropdown-item" href="/">
                  Another action
                </a>
                <div className="dropdown-divider"></div>
                <a className="dropdown-item" href="/">
                  Something else here
                </a>
              </div>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default Header;
