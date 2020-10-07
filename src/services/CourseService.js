import axios from 'axios';
import { v4 as uuid } from 'uuid';

const FETCH_COURSES_URL = process.env.REACT_APP_FETCH_COURSES_URL;
const SAVE_COURSE_URL = process.env.REACT_APP_SAVE_COURSE_URL;
const REMOVE_COURSE_URL = process.env.REACT_APP_REMOVE_COURSE_URL;
const UPLOAD_COURSE_IMAGE_URL = process.env.REACT_APP_UPLOAD_COURSE_IMAGE_URL;

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
      // TODO: Save the image in S3 (via api->lambda) and retrieve s3 URL and then save into course.imageUrl.
      console.log('Image uploaded: ', file);
      console.log('Image uploaded name: ', file.name);
      //Add image info into course object
      course.imageName = file.name;
      this.uploadCourseImage(file, file.name)
        .then(link => {
          console.log('LINK: ', link);
          course.imageUrl = link;
        })
        .catch(error => {
          console.log('Error when getting link: ', error);
        });
    }
    // When creating a new course, ID is null, so we assign an UUID.
    if (!course.id) course.id = uuid().replace(/-/g, '');

    return axios.post(`${SAVE_COURSE_URL}/save`, JSON.stringify(course), {
      //return axios.post(`http://localhost:3000/save`, JSON.stringify(course), {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  uploadCourseImage(file, filename) {
    return axios
      .post(`${UPLOAD_COURSE_IMAGE_URL}/upload?filename=${filename}`, file, {
        headers: {
          'Content-Type': 'image/png',
        },
      })
      .then(response => {
        console.log('S3 RESPONSE: ', response);
        // Return the S3 url link where the image is.
        return response.data.message;
      });
  }
}

export default new CourseService();
