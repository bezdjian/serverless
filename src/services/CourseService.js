import axios from 'axios';

const FETCH_COURSES_URL = process.env.REACT_APP_FETCH_COURSES_URL;
const SAVE_COURSE_URL = process.env.REACT_APP_SAVE_COURSE_URL;

class CourseService {
  findAllCourses() {
    console.log(process.env);
    return axios.get(`${FETCH_COURSES_URL}/courses/all`);
  }

  findCourse(id) {
    return axios.get(`${FETCH_COURSES_URL}/courses/` + id);
  }

  deleteCourse(id) {
    return axios.delete(`${URL}/delete/${id}`);
  }

  createCourse(data) {
    return axios.post(`${SAVE_COURSE_URL}/courses`, data, {
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

export default new CourseService();
