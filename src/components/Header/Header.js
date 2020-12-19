import React from 'react';
import './style.css';

const Header = () => {
  return (
    <>
      <nav className="navbar navbar-expand-lg p-0">
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
              <i className="fas fa-bars" />
            </span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item active">
                <a className="nav-link" href="/">
                  <i className="fas fa-home" />
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/courses">
                  <i className="far fa-list-alt" />
                  All Courses
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/students">
                  <i className="fas fa-users" />
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
                  <div className="dropdown-divider" />
                  <a
                    className="dropdown-item"
                    href="signOut"
                    onClick={() => console.log('hejdå!')}
                  >
                    <i className="fas fa-sign-out-alt mr-1" />
                    Sign out
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <header className="masthead text-white text-center">
        <div className="overlay" />
        <div className="container">
          <div className="row">
            <div className="col-xl-9 mx-auto">
              <h1 className="mb-5 code-font">
                Education is a pen that draws you future.
              </h1>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
