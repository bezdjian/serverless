import React, { Component } from 'react';
import CourseService from '../services/CourseService';

import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

import { RingLoader } from 'react-spinners';
import { css } from '@emotion/core';

import book from '../images/book.jpg';

import { Button } from 'react-bootstrap';
import { Alert } from 'react-bootstrap';

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

class Courses extends Component {
  constructor(props) {
    super(props);
    this.state = {
      courses: [],
      message: null,
      error: null,
      loading: true,
    };
    this.refreshCourses = this.refreshCourses.bind(this);
  }

  componentDidMount() {
    this.refreshCourses();
  }

  refreshCourses() {
    CourseService.findAllCourses()
      .then(response => {
        this.setState({
          courses: response.data.courses,
          message: 'Courses are loaded',
          error: null,
          loading: false,
        });
      })
      .catch(error => {
        console.log('Error accured: ' + error.message);
        this.setState({
          error: error,
          message: error.message,
          loading: false,
        });
      });
  }

  deleteCourseClicked(id) {
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
          loading: false,
        });
      });
  }

  render() {
    return (
      <div className="container-fluid p-2">
        <div className="container">
          {this.state.loading ? (
            <div className="sweet-loading">
              <RingLoader
                css={override}
                sizeUnit={'px'}
                size={150}
                color={'#123abc'}
                loading={this.state.loading}
              />
            </div>
          ) : this.state.error ? (
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
              <Button
                className="btn btn-success p-2 mb-2"
                onClick={() =>
                  this.props.history.push('/view-save-course/' + -1)
                }
              >
                <FontAwesomeIcon icon={faPlus} /> {/* Add a new course */}
                Add a new course
              </Button>
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
                      alt={course.coursename}
                    />
                    <div className="card-body">
                      <h4 className="card-title center">{course.coursename}</h4>
                      <p className="card-text">{course.description}</p>
                      <p className="card-text">Category: {course.category}</p>
                      <p className="card-link">Price: {course.price}:-</p>
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
