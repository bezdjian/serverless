import React, { Component } from 'react';
import './style.css';

class Header extends Component {
  render() {
    return (
      <>
        <nav className="navbar navbar-expand-lg">
          <div className="container">
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
              <span className="navbar-toggler-icon">
              <i class="fas fa-bars"></i>
              </span>
            </button>

            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav mr-auto">
                <li className="nav-item active">
                  <a className="nav-link" href="/">
                    <i className="fas fa-home"></i>
                    Home
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/courses">
                    <i className="far fa-list-alt"></i>
                    All Courses
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/students">
                    <i className="fas fa-users"></i>
                    Students
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
                    <a
                      className="dropdown-item"
                      href="/"
                      onClick={() => console.log('hejdå!')}
                    >
                      Sign out
                    </a>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <header className="masthead text-white text-center">
          <div className="overlay"></div>
          <div className="container">
            <div className="row">
              <div className="col-xl-9 mx-auto">
                <h1 className="mb-5">
                  Build a landing page for your business or project and generate
                  more leads!
                </h1>
              </div>
            </div>
          </div>
        </header>
      </>
    );
  }
}

export default Header;
