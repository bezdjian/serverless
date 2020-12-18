import React, { Component } from 'react';
import Select from 'react-select';
import './style.css';
import CourseService from '../../services/CourseService';

import { Alert } from 'react-bootstrap';

import { trackPromise } from 'react-promise-tracker';

class SaveViewCourse extends Component {
  constructor(...args) {
    super(...args);
    //Get the course ID from params.
    const { id } = this.props.match.params;
    console.log('Course ID: ', id);

    this.state = {
      course: {
        id: id,
        name: '',
        idNumber: '',
        image: '',
        description: '',
        price: '',
        category: '',
      },
      // TODO: find a way to get current categories.
      categories: [
        { value: 'Cloud', label: 'Cloud' },
        { value: 'Development', label: 'Development' },
      ],
      imageFile: '',
      invalidFields: false,
      text: 'Create course',
      error: null,
      disabled: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCourseNameChange = this.handleCourseNameChange.bind(this);
    this.handleCategoryChange = this.handleCategoryChange.bind(this);
    this.handleCategoryChange1 = this.handleCategoryChange1.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.handleIdNumberChange = this.handleIdNumberChange.bind(this);
    this.handlePriceChange = this.handlePriceChange.bind(this);
    this.handleImageChange = this.handleImageChange.bind(this);

    // Call load course to set the values in this.state
    if (id !== -1) {
      trackPromise(
        CourseService.findCourse(id)
          .then(response => {
            console.log('Viewing course ', response.data.courses[0]);
            this.setState({
              course: {
                ...response.data.courses[0],
                image: response.data.courses[0].imageUrl,
              },
              imageFile: response.data.courses[0],
              text: 'Edit course',
            });
          })
          .catch(err => console.log('Error while fetching course', err)),
      );
    }
    console.log('Course in state: ', this.state.course);
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    return (
      <div className="container pt-5 pb-5">
        <div className="mb-4">
          <h2>{this.state.text}</h2>
        </div>

        {this.state.invalidFields && (
          <Alert dismissible variant="danger">
            {/*<Alert.Heading>Oops!</Alert.Heading>*/}
            <p>
              <i className="fas fa-exclamation-triangle mr-2"></i>
              All fields are required
            </p>
          </Alert>
        )}

        {this.state.error && (
          <div className="alert alert-danger">
            <Alert dismissible variant="danger">
              <p>
                <i class="fas fa-exclamation-triangle mr-2"></i>
                {this.state.error}
              </p>
            </Alert>
          </div>
        )}

        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="name"
              placeholder="Course name"
              name="name"
              value={this.state.course.name}
              onChange={this.handleCourseNameChange}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="idNumber"
              placeholder="ID Number"
              name="idNumber"
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
            <input
              alt="Course image"
              type="file"
              placeholder="Course image"
              onChange={this.handleImageChange}
            />
            <img alt="" src={this.state.course.image} />
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
              className="form-group"
              id="categoryid"
              placeholder="Category"
              name="categoryid"
              value={this.state.course.category}
              onChange={this.handleCategoryChange1}
            >
              {this.state.categories.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <Select
              options={this.state.categories}
              value={this.state.course.category}
              placeholder="Category"
              onChange={this.handleCategoryChange}
            ></Select>
          </div>
          <button
            type="submit"
            className="btn btn-outline-info"
            disabled={this.state.disabled}
          >
            <i className="fas fa-save mr-2 fa-2x"></i>
            <label className="code-font">Save</label>
          </button>
        </form>
      </div>
    );
  }

  handleCourseNameChange(event) {
    this.setState({
      course: {
        ...this.state.course,
        name: event.target.value,
      },
    });
    this.toggleRequiredFields();
  }

  handleIdNumberChange(event) {
    this.setState({
      course: {
        ...this.state.course,
        idNumber: event.target.value,
      },
    });
    this.toggleRequiredFields();
  }

  handlePriceChange(event) {
    this.setState({
      course: {
        ...this.state.course,
        price: event.target.value,
      },
    });
    this.toggleRequiredFields();
  }

  handleImageChange(event) {
    var file = event.target.files[0];
    this.setState({
      course: {
        ...this.state.course,
        image: URL.createObjectURL(file),
      },
      imageFile: file,
    });
  }

  handleDescriptionChange(event) {
    this.setState({
      course: {
        ...this.state.course,
        description: event.target.value,
      },
    });
    this.toggleRequiredFields();
  }

  handleCategoryChange(event) {
    this.setState({
      course: {
        ...this.state.course,
        category: event.value,
      },
    });
    this.toggleRequiredFields();
  }

  handleCategoryChange1(event) {
    this.setState({
      course: {
        ...this.state.course,
        category: event.target.value,
      },
    });
    this.toggleRequiredFields();
  }

  handleSubmit(event) {
    event.preventDefault();

    if (this.isValidFields()) {
      trackPromise(
        CourseService.saveCourse(this.state.course, this.state.imageFile)
          .then(() => {
            this.props.history.push('/courses');
          })
          .catch(err => {
            console.log('Error on save: ', err.message);
            this.setState({
              error: err.message,
            });
          }),
      );
    } else {
      this.setState({
        disabled: true,
        invalidFields: true,
      });
    }
  }

  isValidFields() {
    return (
      this.state.course.name !== '' &&
      this.state.course.idNumber !== '' &&
      this.state.course.price !== ''
    );
  }

  toggleRequiredFields() {
    if (this.isValidFields()) {
      this.setState({
        disabled: false,
        invalidFields: false,
      });
    } else {
      this.setState({
        disabled: true,
        invalidFields: true,
      });
    }
  }
}

export default SaveViewCourse;
