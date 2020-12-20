import React, { Component } from 'react';
import StudentService from '../../services/StudentService';

import user from './img/user.png';

class Students extends Component {
  constructor(...args) {
    super(...args);
    this.state = {
      students: [],
      message: null,
      error: null,
      loading: true,
    };
    this.refreshStudents = this.refreshStudents.bind(this);
  }

  componentDidMount() {
    this.refreshStudents();
  }

  refreshStudents() {
    StudentService.findAllStudents()
      .then(response => {
        if (!response.data.students) {
          // NO_CONTENT
          this.setState({
            message: 'There are no students at this moment',
            error: 'There are no students at this moment',
            loading: false,
          });
        } else {
          this.setState({
            students: response.data.students,
            message: 'Students are loaded',
            error: null,
            loading: false,
          });
        }
      })
      .catch(error => {
        console.log('findAllStudents: ERROR: ' + error.message);
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
          <button
            className="btn btn-info p-2 mb-2 rounded-pill"
            onClick={() => this.props.history.push('/view-save-student/' + -1)}
          >
            <i className="fas fa-plus mr-2" />
            Add new Student
          </button>

          {this.state.error && (
            <div className="alert alert-danger">
              <i className="far fa-triangle" />
              {this.state.message}
            </div>
          )}
          <div className="card-columns" key="cardsKey">
            {this.state.students &&
              this.state.students.map(student => (
                <div className="card bg-light" key={student.id}>
                  <img
                    onClick={() =>
                      this.props.history.push(
                        '/view-save-student/' + student.id,
                      )
                    }
                    className="card-img-top pointer-cursor"
                    key={student.id}
                    src={user}
                    alt={student.username}
                    height="190"
                  />
                  <div className="card-body">
                    <h4 className="card-title">
                      {student.firstname} {student.lastname}
                    </h4>
                    <p className="card-text">
                      <span>Username: </span>
                      {student.username}
                    </p>
                    <p className="card-text">Email: {student.email}</p>
                    <p className="card-link">{student.country}</p>
                    <div className="btn-group" role="group">
                      <button
                        className="btn btn-danger"
                        onClick={() => this.deleteStudentClicked(student.id)}
                      >
                        <i className="fas fa-trash-alt fa-2x" />
                      </button>
                      <button
                        className="btn btn-info"
                        onClick={() =>
                          this.props.history.push(
                            '/view-save-student/' + student.id,
                          )
                        }
                      >
                        <i className="fas fa-edit fa-2x" />
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

  deleteStudentClicked(id) {
    // Add trackPromise
    StudentService.deleteStudent(id).then(response => {
      console.log('Student with id', id, 'deleted');
      this.setState({ message: `Student with id ${id} deleted` });
      this.refreshStudents();
    });
  }
}

export default Students;
