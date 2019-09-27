import axios from 'axios';

const COURSE_API_URL = 'http://localhost:8080/api/course';

class CourseService{
    findAllCourses(){
        return axios.get(`${COURSE_API_URL}/all`);
    }
}

export default new CourseService();