import axios from 'axios';

const COURSE_API_URL = 'http://localhost:8080/api/course';

class CourseService{
    findAllCourses(){
        return axios.get(`${COURSE_API_URL}/all`);
    }

    deleteCourse(id){
        return axios.delete(`${COURSE_API_URL}/delete/${id}`);
    }
}

export default new CourseService();