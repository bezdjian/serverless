import axios from 'axios';
import { v4 as uuid } from 'uuid';

const FETCH_COURSES_URL = process.env.REACT_APP_FETCH_COURSES_URL;
const SAVE_COURSE_URL = process.env.REACT_APP_SAVE_COURSE_URL;
const REMOVE_COURSE_URL = process.env.REACT_APP_REMOVE_COURSE_URL;

class CourseService {
  findAllCourses() {
    console.log(process.env);
    return axios.get(`${FETCH_COURSES_URL}/courses/all`);
  }

  findCourse(id) {
    return axios.get(`${FETCH_COURSES_URL}/courses/` + id);
  }

  deleteCourse(id) {
    return axios.delete(`${REMOVE_COURSE_URL}/remove/${id}`);
    //return axios.delete(`http://127.0.0.1:3000/remove/${id}`);
  }

  saveCourse(course) {
    // Edit is working on course object. add is not!
    console.log('Saving course: ', course);
    if (course.id == -1) course.id = uuid();
    console.log('Saving course JSON: ', JSON.stringify(course));
    
    //return axios.post(`${SAVE_COURSE_URL}/save`, JSON.stringify(course), {
    return axios.post(`http://127.0.0.1:3000/save`, JSON.stringify(course), {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}

export default new CourseService();
