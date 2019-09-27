import React, {Component} from 'react';
import CourseService from "../services/CourseService";

class CoursesComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            courses: [],
            message: ""
        };
        this.refreshCourses = this.refreshCourses.bind(this);
    }

    componentDidMount() {
        this.refreshCourses();
    }

    refreshCourses() {
        CourseService.findAllCourses()
            .then(
                response => {
                    console.log("Finding all courses");
                    console.log(response);
                    this.setState({courses: response.data});
                }
            )
    }

    render() {
        return (
            <div className="container">
                <h3>All courses</h3>
                <div className="container">
                    <table className="table">
                        <thead>
                        <tr>
                            <td>Id</td>
                            <td>Description</td>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            this.state.courses.map(
                                course =>
                                    <tr key={course.id}>
                                        <td>{course.id}</td>
                                        <td>{course.coursename}</td>
                                    </tr>
                            )
                        }
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default CoursesComponent;