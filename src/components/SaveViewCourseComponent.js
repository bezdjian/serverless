import React, { Component } from 'react';
import CourseService from '../services/CourseService';

import { faSave } from '@fortawesome/free-solid-svg-icons';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Alert } from 'react-bootstrap';

class SaveViewCourseComponent extends Component {
  constructor(props) {
    super(props);
    //Get the course ID from params.
    const { id } = this.props.match.params;

    this.state = {
      course: [{
        id: id,
        name: '',
        idNumber: '',
        description: '',
        price: '',
      }],
      // TODO: find a way to get current categories.
      categories: [
        {
          id: '1',
          name: 'Cloud',
        },
        {
          id: '2',
          name: 'Programming',
        },
      ],
      invalidFields: id === -1 ? false : true,
      text: 'Create course',
      error: null,
      disabled: id > 0 ? false : true,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCourseNameChange = this.handleCourseNameChange.bind(this);
    this.handleCategoryChange = this.handleCategoryChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.handleIdNumberChange = this.handleIdNumberChange.bind(this);
    this.handlePriceChange = this.handlePriceChange.bind(this);

    // Call load course to set the values in this.state
    if (id > 0) {
      CourseService.findCourse(id)
        .then(response => {
          console.log('Viewing course ', response.data.courses[0]);
          this.setState({
            course: {
              ...response.data.courses[0],
            },
            text: 'Edit course',
          });
        })
        .catch(err => console.log('Error while fetching course', err));
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    return (
      <div className="container-fluid m-2">
        <div className="mb-4">
          <h4>{this.state.text}</h4>
        </div>

        {!this.state.invalidFields && (
          <Alert dismissible variant="danger">
            <p>
              <FontAwesomeIcon icon={faExclamationTriangle} className="mr-2" />
              All fields are required
            </p>
          </Alert>
        )}

        {this.state.error && (
          <div className="alert alert-danger">
            <Alert dismissible variant="danger">
              <p>
                <FontAwesomeIcon
                  icon={faExclamationTriangle}
                  className="mr-2"
                />
                {this.state.error}
              </p>
            </Alert>
          </div>
        )}

        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label>Course name</label>
            <input
              type="text"
              className="form-control"
              id="coursename"
              placeholder="Course name"
              name="coursename"
              value={this.state.course.name}
              onChange={this.handleCourseNameChange}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="idnumber"
              placeholder="ID Number"
              name="idnumber"
              value={this.state.course.idNumber}
              onChange={this.handleIdNumberChange}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="price"
              placeholder="Price"
              name="price"
              value={this.state.course.price}
              onChange={this.handlePriceChange}
            />
          </div>
          <div className="form-group">
            <textarea
              className="form-control"
              id="description"
              placeholder="Description"
              name="description"
              value={this.state.course.description}
              onChange={this.handleDescriptionChange}
            />
          </div>
          <div className="form-group">
            <select
              className="form-control"
              id="categoryid"
              placeholder="Category"
              name="categoryid"
              onChange={this.handleCategoryChange}
            >
              {this.state.categories.map(cat => (
                <option key={cat.id} value={cat.id} defaultValue={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            className="btn btn-success"
            disabled={this.state.disabled}
          >
            <FontAwesomeIcon icon={faSave} /> {/* SAVE */}
            Save
          </button>
        </form>
      </div>
    );
  }

  handleCourseNameChange(event) {
    this.setState({
      course: {
        ...this.state.course,
        coursename: event.target.value,
      },
    });
    this.toggleButton_requiredFields();
  }

  handleIdNumberChange(event) {
    this.setState({
      course: {
        ...this.state.course,
        idnumber: event.target.value,
      },
    });
    this.toggleButton_requiredFields();
  }

  handlePriceChange(event) {
    this.setState({
      course: {
        ...this.state.course,
        price: event.target.value,
      },
    });
    this.toggleButton_requiredFields();
  }

  handleDescriptionChange(event) {
    this.setState({
      course: {
        ...this.state.course,
        description: event.target.value,
      },
    });
    this.toggleButton_requiredFields();
  }

  handleCategoryChange(event) {
    this.setState({
      course: {
        ...this.state.course,
        category: event.target.value,
      },
    });
    this.toggleButton_requiredFields();
  }

  handleSubmit(event) {
    event.preventDefault();

    if (this.validateFields()) {
      CourseService.createCourse(this.state.course[0])
        .then(() => {
          this.props.history.push('/courses');
        })
        .catch(err => {
          console.log('Error on save: ', err.message);
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
      this.state.course.coursename &&
      this.state.course.idnumber &&
      this.state.course.price
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

export default SaveViewCourseComponent;
