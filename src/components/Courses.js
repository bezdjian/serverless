import React, { Component } from 'react';
import CourseService from '../services/CourseService';

import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

import book from '../images/book.jpg';

import { Button } from 'react-bootstrap';
import { Alert } from 'react-bootstrap';

import { trackPromise } from 'react-promise-tracker';

class Courses extends Component {
  constructor(props) {
    super(props);
    this.state = {
      courses: [],
      message: null,
      error: null,
    };
    this.refreshCourses = this.refreshCourses.bind(this);
  }

  componentDidMount() {
    this.refreshCourses();
  }

  refreshCourses() {
    trackPromise(
      CourseService.findAllCourses()
        .then(response => {
          this.setState({
            courses: response.data.courses,
            message: 'Courses are loaded',
            error: null,
          });
        })
        .catch(error => {
          console.log('Error accured: ' + error.message);
          this.setState({
            error: error,
            message: error.message,
          });
        }),
    );
  }

  deleteCourseClicked(id) {
    trackPromise(
      CourseService.deleteCourse(id)
        .then(response => {
          console.log('Course with id', id, 'deleted');
          this.setState({ message: `Course with id ${id} deleted` });
          this.refreshCourses();
        })
        .catch(error => {
          console.log('Error while removing a course: ', error.message);
          this.setState({
            error: error,
            message: error.message,
          });
        }),
    );
  }

  render() {
    return (
      <div className="container-fluid p-2">
        <div className="container">
          {this.state.error ? (
            <Alert dismissible variant="danger">
              <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
              <p>
                <FontAwesomeIcon
                  icon={faExclamationTriangle}
                  className="mr-2"
                />
                {this.state.message}
              </p>
            </Alert>
          ) : (
            <div>
              <div className="btn-group">
                <Button
                  className="btn btn-primary p-2 mb-2 rounded-0"
                  onClick={() => this.props.history.push('/')}
                >
                  <FontAwesomeIcon icon={faHome} className="mr-1" />
                  Home
                </Button>
                <Button
                  className="btn btn-success p-2 mb-2 rounded-0"
                  onClick={() =>
                    this.props.history.push('/view-save-course/' + -1)
                  }
                >
                  <FontAwesomeIcon icon={faPlus} /> {/* Add a new course */}
                  Add a new course
                </Button>

                <Button
                  className="btn btn-success p-2 mb-2 rounded-0"
                  onClick={() => CourseService.testApi()}
                >
                  <FontAwesomeIcon icon={faPlus} /> {/* Add a new course */}
                  Test API
                </Button>
              </div>
              <div className="card-columns" key="cardsKey">
                {this.state.courses.map(course => (
                  <div className="card bg-light" key={course.id}>
                    <img
                      onClick={() =>
                        this.props.history.push(
                          '/view-save-course/' + course.id,
                        )
                      }
                      className="card-img-top pointer-cursor rounded"
                      key={course.id}
                      src={book}
                      alt={course.name}
                    />
                    <div className="card-body">
                      <h4 className="card-title center">{course.name}</h4>
                      <p className="card-text">{course.description}</p>
                      <p className="card-text">Category: {course.category}</p>
                      <p className="card-link">Price: {course.price} :-</p>
                      <div className="btn-group btn-group-actions" role="group">
                        <button
                          className="btn btn-danger"
                          onClick={() => this.deleteCourseClicked(course.id)}
                        >
                          <FontAwesomeIcon icon={faTrashAlt} /> {/* DELETE */}
                        </button>
                        <button
                          className="btn btn-info"
                          onClick={() =>
                            this.props.history.push(
                              '/view-save-course/' + course.id,
                            )
                          }
                        >
                          <FontAwesomeIcon icon={faEdit} /> {/* EDIT */}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default Courses;
