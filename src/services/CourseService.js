import axios from 'axios';

const COURSE_API_URL = 'http://localhost:8080/mylms-service/api/course';
const CATEGORY_API_URL =
  'http://localhost:8080/mylms-service/api/course/category';

class CourseService {
  findAllCourses() {
    return axios.get(`${COURSE_API_URL}/all`);
  }

  findCourse(id){
    return axios.get(`${COURSE_API_URL}/`+id);
  }

  deleteCourse(id) {
    return axios.delete(`${COURSE_API_URL}/delete/${id}`);
  }

  createCourse(data) {
    return axios.post(`${COURSE_API_URL}/save`, data, {
      headers: { 'Content-Type': 'application/json' },
    });
  }

  loadCategories() {
    return axios.get(`${CATEGORY_API_URL}/all`);
  }
}

export default new CourseService();
