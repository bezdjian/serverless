import axios from 'axios';
import { v4 as uuid } from 'uuid';

const FETCH_STUDENT_API = process.env.REACT_APP_FETCH_STUDENT_URL;
const SAVE_STUDENT_API = process.env.REACT_APP_SAVE_STUDENT_URL;

class StudentService {
  findAllStudents() {
    console.log(process.env);
    return axios.get(`${FETCH_STUDENT_API}/students/all`);
  }

  findStudent(id) {
    return axios.get(`${FETCH_STUDENT_API}/students/` + id);
  }

  deleteStudent(id) {
    return axios.delete(`${SAVE_STUDENT_API}/remove/${id}`);
  }

  createStudent(student) {
    if (!student.id || student.id < 0) {
      student.id = uuid().replace(/-/g, '');
    }
    return axios.post(`${SAVE_STUDENT_API}/save`, JSON.stringify(student), {
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

export default new StudentService();
