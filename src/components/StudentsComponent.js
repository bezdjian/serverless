import React, { Component } from 'react';
import StudentService from '../services/StudentService';

import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

import { RingLoader } from 'react-spinners';
import { css } from '@emotion/core';

import user from '../images/user.png';

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

class StudentsComponent extends Component {
  constructor(props) {
    super(props);
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
        this.setState({
          students: response.data,
          message: 'Students are loaded',
          error: null,
          loading: false,
        });
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
            <FontAwesomeIcon icon={faPlus} /> {/* Add a new student */}
          </button>

          <div className="sweet-loading">
            <RingLoader
              css={override}
              sizeUnit={'px'}
              size={150}
              color={'#123abc'}
              loading={this.state.loading}
            />
          </div>

          {this.state.error && (
            <div className="alert alert-danger">
              <FontAwesomeIcon icon={faExclamationTriangle} />
              {this.state.message}
            </div>
          )}
          <div className="card-columns" key="cardsKey">
            {this.state.students.map(student => (
              <div className="card bg-light" key={student.id}>
                <img
                  onClick={() =>
                    this.props.history.push('/view-save-student/' + student.id)
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
                      <FontAwesomeIcon icon={faTrashAlt} /> {/* DELETE */}
                    </button>
                    <button
                      className="btn btn-info"
                      onClick={() =>
                        this.props.history.push(
                          '/view-save-student/' + student.id,
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
      </div>
    );
  }

  deleteStudentClicked(id) {
    StudentService.deleteStudent(id).then(response => {
      console.log('Student with id', id, 'deleted');
      this.setState({ message: `Student with id ${id} deleted` });
      this.refreshStudents();
    });
  }
}

export default StudentsComponent;
