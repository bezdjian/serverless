import React, { Component } from 'react';
import CourseService from '../services/CourseService';

import book from '../images/book.jpg';

class CoursesComponent extends Component {
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
    CourseService.findAllCourses()
      .then(response => {
        console.log(response.data.length + ' Courses found');
        this.setState({
          courses: response.data,
          message: 'Courses are loaded',
          error: null,
        });
      })
      .catch(error => {
        console.log('findAllCourses: ERROR: ' + error.message);
        this.setState({ error: error, message: error.message });
      });
  }

  render() {
    return (
      <div className="container">
        <h3>All courses</h3>
        <div className="container">
          <button
            className="btn btn-primary p-2 mb-2"
            onClick={() => this.props.history.push('/view-save-course/' + -1)}>
            Add a new course
          </button>
          {this.state.error && (
            <div className="alert alert-danger">{this.state.message}</div>
          )}
          <div className="card-columns" key="cardsKey">
            {this.state.courses.map(course => (
              <div className="card bg-light" key={course.id}>
                <img
                  onClick={() =>
                    this.props.history.push('/view-save-course/' + course.id)
                  }
                  className="card-img-top pointer-cursor"
                  key={course.id}
                  src={book}
                  alt={course.coursename}
                />
                <div className="card-body">
                  <h4 className="card-title">{course.coursename}</h4>
                  <p className="card-text">{course.description}</p>
                  <p className="card-text">
                    Category: {course.courseCategory.name}
                  </p>
                  <p className="card-link">Price: {course.price}:-</p>
                  <div className="btn-group" role="group">
                    <button
                      className="btn btn-danger"
                      onClick={() => this.deleteCourseClicked(course.id)}
                    >
                      Delete
                  </button>
                    <button
                      className="btn btn-info"
                      onClick={() => this.props.history.push('/view-save-course/' + course.id)}>
                      Edit
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  deleteCourseClicked(id) {
    CourseService.deleteCourse(id).then(response => {
      console.log('Course with id', id, 'deleted');
      console.log(response.data);
      this.setState({ message: `Course with id ${id} deleted` });
      this.refreshCourses();
    });
  }
}

export default CoursesComponent;
