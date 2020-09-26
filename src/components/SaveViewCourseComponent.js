import React, { Component } from 'react';
import CourseService from '../services/CourseService';

import { faSave } from '@fortawesome/free-solid-svg-icons';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class SaveViewCourseComponent extends Component {
  constructor(props) {
    super(props);
    //Get the course ID from params.
    const { id } = this.props.match.params;

    this.state = {
      course: {
        id: id,
        coursename: '',
        idnumber: '',
        description: '',
        price: '',
        category: 1,
        image: '',
      },
      // TODO: find a way to get current categories.
      categories: [
        {
          "name": "Cloud"
        },
        {
          "name": "Programming"
        }
      ],
      validFields: id > 0 ? true : false,
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
      this.loadViewingCourse(id)
        .then(response => {
          console.log('Viewing course ', response.data);
          this.setState({
            course: {
              ...response.data,
              category: response.data.courseCategory.id,
            },
            text: 'Edit course',
          });
        })
        .catch(err => console.log(err));
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  loadViewingCourse(id) {
    return CourseService.findCourse(id);
  }

  render() {
    return (
      <div className="container-fluid m-2">
        <h4>{this.state.text}</h4>

        {!this.state.validFields && (
          <div className="alert alert-danger">
            <p>
              <FontAwesomeIcon icon={faExclamationTriangle} />
              All fields are required
            </p>
          </div>
        )}

        {this.state.error && (
          <div className="alert alert-danger">
            <p>{this.state.error}</p>
          </div>
        )}

        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="coursename"
              placeholder="Course name"
              name="coursename"
              value={this.state.course.coursename}
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
              value={this.state.course.idnumber}
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
    console.log('*** Form values in this.state.course ***');
    console.log(this.state.course);

    if (this.validateFields()) {
      CourseService.createCourse(this.state.course)
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
