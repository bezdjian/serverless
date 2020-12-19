import React, {Component} from 'react';
import CourseService from '../../services/CourseService';

import {Alert, Button} from 'react-bootstrap';

import {trackPromise} from 'react-promise-tracker';

import './style.css';

class Courses extends Component {
  constructor(...args) {
    super(...args);
    this.state = {
      courses: [],
      message: null,
      error: null,
      divAlignment: '',
    };
    this.refreshCourses = this.refreshCourses.bind(this);
  }

  componentDidMount() {
    this.refreshCourses();
  }

  isOdd(num) {
    return num % 2;
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
        console.log('Error while finding all the courses: ' + error.message);
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
        this.setState({message: `Course with id ${id} deleted`});
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
      <div className="container-fluid p-0">
        <div>
          {this.state.error ? (
            <Alert dismissible variant="danger">
              <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
              <p>
                <i className="fas fa-exclamation-triangle" />
                {this.state.message}
              </p>
            </Alert>
          ) : (
            <div>
              <div className="btn-group">
                <Button
                  className="btn btn-info p-2 mb-2 rounded-pill"
                  onClick={() =>
                    this.props.history.push('/view-save-course/' + -1)
                  }
                >
                  <i className="fas fa-plus" />
                  Add a new course
                </Button>
              </div>
              <section className="showcase">
                <div className="container-fluid p-0">
                  {//src={course.imageUrl}
                    this.state.courses.map((course, i) => {
                      let orderLg2 = '';
                      let orderLg1 = '';
                      if(this.isOdd(i)) {
                        orderLg2 = 'order-lg-2';
                        orderLg1 = 'order-lg-1';
                      }
                      // TODO: Remove this after fixing the course image.
                      const imageClass = course.idNumber.includes('aws')
                        ? 'aws-img'
                        : course.idNumber.includes('spring')
                          ? 'spring-img'
                          : 'si2';

                      return (
                        <div className="row no-gutters" key={'crow' + i}>
                          <div
                            className={
                              'col-lg-6 text-white showcase-img ' +
                              orderLg2 +
                              ' ' +
                              imageClass
                            }
                          />
                          <div
                            className={
                              'col-lg-6 my-auto showcase-text ' + orderLg1
                            }
                          >
                            <h2 className="code-font">{course.name}</h2>
                            <p className="lead mb-0 code-font">
                              {course.description}
                            </p>
                            <p className="lead mb-0 code-font">
                              <code>Category:</code> {course.category}
                            </p>
                            <br />
                            <p className="lead mb-0 code-font">
                              Price: {course.price} :-
                            </p>

                            <div
                              className="btn-group btn-group-actions"
                              role="group"
                            >
                              <Button
                                className="btn btn-danger m-0 p-3"
                                onClick={() =>
                                  this.deleteCourseClicked(course.id)
                                }
                              >
                                <i className="fas fa-trash fa-2x" />
                              </Button>
                              <Button
                                className="btn btn-info m-0 p-3"
                                onClick={() =>
                                  this.props.history.push(
                                    '/view-save-course/' + course.id,
                                  )
                                }
                              >
                                <i className="fas fa-edit fa-2x" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </section>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default Courses;
