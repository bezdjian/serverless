import React, { Component } from 'react';
import CourseService from '../../services/CourseService';

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
          console.log('Courses: ', response.data.courses);
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
              <i className="fas fa-exclamation-triangle"></i>
                {this.state.message}
              </p>
            </Alert>
          ) : (
            <div>
              <div className="btn-group">
                <Button
                  className="btn btn-success p-2 mb-2 rounded-0"
                  onClick={() =>
                    this.props.history.push('/view-save-course/' + -1)
                  }
                >
                  <i className="fas fa-plus"></i> {/* Add a new course */}
                  Add a new course
                </Button>
              </div>
              <div className="card-columns" key="cardsKey">
                {//src={course.imageUrl}
                this.state.courses.map(course => (
                  <div className="row no-gutters">
                    <div
                      key={course.id}
                      className="col-lg-6 order-lg-2 text-white showcase-img"
                      
                    ></div>
                    <div className="col-lg-6 order-lg-1 my-auto showcase-text">
                      <h2>{course.name}</h2>
                      <p className="lead mb-0">
                        <p className="card-text">{course.description}</p>
                        <p className="card-text">Category: {course.category}</p>
                        <p className="card-link">Price: {course.price} :-</p>
                        <div
                          className="btn-group btn-group-actions"
                          role="group"
                        >
                          <button
                            className="btn btn-danger"
                            onClick={() => this.deleteCourseClicked(course.id)}
                          >
                            <i className="fas fa-trash"></i> {/* DELETE */}
                          </button>
                          <button
                            className="btn btn-info"
                            onClick={() =>
                              this.props.history.push(
                                '/view-save-course/' + course.id,
                              )
                            }
                          >
                            <i className="fas fa-edit"></i>  {/* EDIT */}
                          </button>
                        </div>
                      </p>
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
