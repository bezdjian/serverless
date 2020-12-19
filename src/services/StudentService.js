import axios from 'axios';

const BASE_URL = process.env.REACT_APP_SERVICE_URL;
const STUDENT_API_URL = BASE_URL + '/mylms-service/api/student';

class StudentService {
  findAllStudents() {
    console.log(process.env);
    return axios.get(`${STUDENT_API_URL}/all`);
  }

  findStudent(id) {
    return axios.get(`${STUDENT_API_URL}/` + id);
  }

  deleteStudent(id) {
    return axios.delete(`${STUDENT_API_URL}/delete/${id}`);
  }

  createStudent(data) {
    return axios.post(`${STUDENT_API_URL}/save`, data, {
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

export default new StudentService();
