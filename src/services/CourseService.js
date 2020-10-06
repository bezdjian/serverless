import axios from 'axios';
import { v4 as uuid } from 'uuid';

const FETCH_COURSES_URL = process.env.REACT_APP_FETCH_COURSES_URL;
const SAVE_COURSE_URL = process.env.REACT_APP_SAVE_COURSE_URL;
const REMOVE_COURSE_URL = process.env.REACT_APP_REMOVE_COURSE_URL;

class CourseService {
  findAllCourses() {
    return axios.get(`${FETCH_COURSES_URL}/courses/all`);
  }

  findCourse(id) {
    return axios.get(`${FETCH_COURSES_URL}/courses/` + id);
  }

  deleteCourse(id) {
    return axios.delete(`${REMOVE_COURSE_URL}/remove/${id}`);
  }

  saveCourse(course, file) {
    if (file) {
      console.log('Image uploaded URL: ', URL.createObjectURL(file));
      console.log('Image uploaded: ', file);
      console.log('Image uploaded name: ', file.name);
      console.log('Image uploaded size: ', file.size);
      //Add image info into course object
      course.image = file;
      course.imageName = file.name;
      course.imageUrl = URL.createObjectURL(file);
      course.imageSize = file.size;
    }
    // When creating a new course, ID is null, so we assign an UUID.
    if (!course.id) course.id = uuid().replace(/-/g, '');

    return axios.post(`${SAVE_COURSE_URL}/save`, JSON.stringify(course), {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}

export default new CourseService();
