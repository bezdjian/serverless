import axios from 'axios';

const COURSE_API_URL = 'http://localhost:8080/mylms-service/api/course';

class CourseService{
    findAllCourses(){
        return axios.get(`${COURSE_API_URL}/all`);
    }

    deleteCourse(id){
        return axios.delete(`${COURSE_API_URL}/delete/${id}`);
    }

    createCourse(data){
        return axios.post(`${COURSE_API_URL}/save`, data, {
            headers: {'Content-Type': 'application/json'}
        });
    }
}

export default new CourseService();