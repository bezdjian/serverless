import React, {Component} from 'react';
import StudentService from '../../services/StudentService';
import {trackPromise} from 'react-promise-tracker';

import './style.css';

class SaveViewStudent extends Component {
  constructor(...args) {
    super(...args);
    //Get the Student ID from params.
    const {id} = this.props.match.params;

    this.state = {
      student: {
        id: id,
        username: '',
        firstname: '',
        lastname: '',
        email: '',
        country: '',
        image: '',
      },
      invalidFields: false,
      error: null,
      disabled: id <= 0,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleStudentFirstNameChange = this.handleStudentFirstNameChange.bind(
      this,
    );
    this.handleStudentLastNameChange = this.handleStudentLastNameChange.bind(
      this,
    );
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleCountryChange = this.handleCountryChange.bind(this);

    // Call load student to set the values in this.state
    if(id !== -1) {
      trackPromise(
        StudentService.findStudent(id)
        .then(response => {
          console.log('Viewing Student ', response.data.students[0]);
          this.setState({
            student: {
              ...response.data.students[0],
            },
          });
        })
        .catch(err => console.log(err)),
      );
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    return (
      <div className="container pt-5 pb-5">
        <div className="mb-4">
          <h2>Save student</h2>
        </div>

        {this.state.error && (
          <div className="alert alert-danger">
            <p>{this.state.error}</p>
          </div>
        )}

        {/* Card Content */}
        <div className="pt-0">
          {/* Form */}
          <form onSubmit={this.handleSubmit}>
            <div className="form-row">
              <div className="col mb-3">
                {/* user name */}
                <div className="md-form">
                  <label className="required">*</label>
                  <input
                    type="text"
                    className="form-control"
                    id="firstname"
                    placeholder="Firstname"
                    name="firstname"
                    value={this.state.student.firstname}
                    onChange={this.handleStudentFirstNameChange}
                  />
                </div>
              </div>
              <div className="col">
                {/* Last name */}
                <div className="md-form">
                  <label className="required">*</label>
                  <input
                    type="text"
                    className="form-control"
                    id="lastname"
                    placeholder="Lastname"
                    name="lastname"
                    value={this.state.student.lastname}
                    onChange={this.handleStudentLastNameChange}
                  />
                </div>
              </div>
            </div>

            <div className="form-row">
              <div className="col mb-3">
                <div className="md-form">
                  <label className="required">*</label>
                  <input
                    type="text"
                    className="form-control"
                    id="username"
                    placeholder="Username"
                    name="username"
                    value={this.state.student.username}
                    onChange={this.handleUsernameChange}
                  />
                </div>
              </div>
            </div>

            <div className="form-row">
              <div className="col mb-3">
                <div className="md-form">
                  <label className="required">*</label>
                  <input
                    type="text"
                    className="form-control"
                    id="email"
                    placeholder="Email"
                    name="email"
                    value={this.state.student.email}
                    onChange={this.handleEmailChange}
                  />
                </div>
              </div>
            </div>

            <div className="form-row">
              <div className="col mb-3">
                <div className="md-form">
                  <input
                    type="text"
                    className="form-control"
                    id="country"
                    placeholder="Country"
                    name="country"
                    value={this.state.student.country}
                    onChange={this.handleCountryChange}
                  />
                </div>
              </div>
            </div>

            <div className="form-row">
              <button
                type="button"
                className="btn btn-outline-info"
                onClick={() => (window.location = '/students')}
              >
                <i className="fas fa-backward mr-2 fa-2x" />
              </button>
              <button
                type="submit"
                className="btn btn-info"
                disabled={this.state.disabled}
              >
                <i className="fas fa-save mr-2 fa-2x" />
              </button>
              <button
                type="reset"
                className="btn btn-info"
                onClick={() => this.clearForm()}
              >
                <i className="fas fa-redo mr-2 fa-2x" />
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  handleUsernameChange(event) {
    this.setState({
      student: {
        ...this.state.student,
        username: event.target.value,
      },
    });
    this.toggleButton_requiredFields();
  }

  handleStudentFirstNameChange(event) {
    this.setState({
      student: {
        ...this.state.student,
        firstname: event.target.value,
      },
    });
    this.toggleButton_requiredFields();
  }

  handleStudentLastNameChange(event) {
    this.setState({
      student: {
        ...this.state.student,
        lastname: event.target.value,
      },
    });
    this.toggleButton_requiredFields();
  }

  handleEmailChange(event) {
    this.setState({
      student: {
        ...this.state.student,
        email: event.target.value,
      },
    });
    this.toggleButton_requiredFields();
  }

  handleCountryChange(event) {
    this.setState({
      student: {
        ...this.state.student,
        country: event.target.value,
      },
    });
    this.toggleButton_requiredFields();
  }

  handleSubmit(event) {
    event.preventDefault();

    if(this.validFormData()) {
      trackPromise(
        StudentService.createStudent(this.state.student)
        .then(() => {
          this.props.history.push('/students');
        })
        .catch(err => {
          console.log('Error on save student: ', err.message);
          this.setState({
            error: err.message,
          });
        }),
      );
    } else {
      this.setState({
        disabled: true,
        invalidFields: false,
      });
    }
  }

  validFormData() {
    return (
      this.state.student.username !== '' &&
      this.state.student.firstname !== '' &&
      this.state.student.lastname !== '' &&
      this.state.student.username != null &&
      this.state.student.firstname != null &&
      this.state.student.lastname != null
    );
  }

  toggleButton_requiredFields() {
    if(this.validFormData()) {
      this.setState({
        disabled: false,
        invalidFields: true,
      });
    } else {
      this.setState({
        disabled: true,
        invalidFields: false,
      });
    }
  }
}

export default SaveViewStudent;
