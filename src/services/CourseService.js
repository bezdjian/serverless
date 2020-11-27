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
    // Uploading image runs after response? make async? none async?
    if (file) {
      console.log('Uploading image: ', file);
      //Add image info into course object
      course.imageName = file.name;
      var imageUrl = this.uploadCourseImage(file);
    }

    console.log('imageUrl: ', imageUrl);
    course.imageUrl = imageUrl;
    // When creating a new course, ID is null, so we assign an UUID.
    if (!course.id) course.id = uuid().replace(/-/g, '');

    return this.save(course);
  }

  uploadCourseImage = async file => {
    const response = await axios.post(
      `${UPLOAD_COURSE_IMAGE_URL}/upload?filename=${file.name}`,
      file,
      {
        headers: {
          'Content-Type': file.type,
        },
      },
    );
    console.log('S3 RESPONSE: ', response);
    return response.data.message;
  };

  save(course) {
    console.log('Saving course: ', course);
    return axios.post(`${SAVE_COURSE_URL}/save`, JSON.stringify(course), {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}

export default new CourseService();
