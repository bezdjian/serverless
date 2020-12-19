import React, {Component} from 'react';
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
      const {status, data} = response;
      if(status === 204) {
        // 204 NO_CONTENT
        console.log('IN IF');
        this.setState({
          message: 'There are no students at this moment',
          error: 'There are no students at this moment',
          loading: false,
        });
      } else {
        this.setState({
          students: data,
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
            className="btn btn-success p-2 mb-2"
            onClick={() => this.props.history.push('/view-save-student/' + -1)}
          >
            <i class="far fa-plus"></i>
            Add new Student
          </button>

          {this.state.error && (
            <div className="alert alert-danger">
              <i class="far fa-triangle"></i>
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
                  <div className="btn-group btn-group-actions" role="group">
                    <button
                      className="btn btn-danger"
                      onClick={() => this.deleteStudentClicked(student.id)}
                    >
                      <i class="far fa-trash-undo-alt"></i>
                    </button>
                    <button
                      className="btn btn-info"
                      onClick={() =>
                        this.props.history.push(
                          '/view-save-student/' + student.id,
                        )
                      }
                    >
                      <i class="far fa-edit"></i>
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
      this.setState({message: `Student with id ${id} deleted`});
      this.refreshStudents();
    });
  }
}

export default Students;
