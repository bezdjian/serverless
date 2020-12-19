import React, { Component } from 'react';
import StudentService from '../../services/StudentService';

class SaveViewStudent extends Component {
  constructor(...args) {
    super(...args);
    //Get the Student ID from params.
    const { id } = this.props.match.params;

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
      validFields: id > 0,
      text: 'Create Student',
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
    if (id > 0) {
      this.loadViewingStudent(id)
        .then(response => {
          console.log('Viewing Student ', response.data);
          this.setState({
            student: {
              ...response.data,
            },
            text: 'Edit Student',
          });
        })
        .catch(err => console.log(err));
    }
  }

  componentDidMount() {
    //this.loadCategories();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  loadViewingStudent(id) {
    return StudentService.findStudent(id);
  }

  render() {
    return (
      <div className="card">
        <h5 className="card-header info-color text-center py-4 mb-4">
          <strong>{this.state.text}</strong>
        </h5>

        {!this.state.validFields && (
          <div className="alert alert-danger">
            <p>
              <i className="fas fa-exclamation-triangle" />
              All fields are required
            </p>
          </div>
        )}

        {this.state.error && (
          <div className="alert alert-danger">
            <p>{this.state.error}</p>
          </div>
        )}

        {/* Catd Content */}
        <div className="card-body px-lg-5 pt-0">
          {/* Form */}
          <form onSubmit={this.handleSubmit}>
            <div className="form-row">
              <div className="col mb-3">
                {/* user name */}
                <div className="md-form">
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

            <button
              type="submit"
              className="btn btn-outline-info"
              disabled={this.state.disabled}
            >
              <i className="fas fa-save mr-2 fa-2x" />
              <label className="code-font">Save</label>
            </button>
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
    console.log('*** Form values in this.state.student ***');
    console.log(this.state.student);

    if (this.validateFields()) {
      StudentService.createStudent(this.state.student)
        .then(() => {
          this.props.history.push('/students');
        })
        .catch(err => {
          console.log('Error on save student: ', err.message);
          this.setState({
            error: err.message,
          });
        });
    } else {
      this.setState({
        disabled: true,
        validFields: false,
      });
    }
  }

  validateFields() {
    if (
      this.state.student.username &&
      this.state.student.firstname &&
      this.state.student.lastname
    ) {
      this.setState({ validFields: true });
      return true;
    }
    return false;
  }

  toggleButton_requiredFields() {
    console.log('** this.validateFields(): ', this.validateFields());
    if (this.validateFields()) {
      this.setState({
        disabled: false,
        validFields: true,
      });
    } else {
      this.setState({
        disabled: true,
        validFields: false,
      });
    }
  }
}

export default SaveViewStudent;
