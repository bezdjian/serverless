import React, {Component} from 'react';
import CourseService from "../services/CourseService";

import book from '../images/book.jpg';

class CoursesComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            courses: [],
            message: null,
            error: null
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
                    console.log("Finding all courses, size " + response.data.length);
                    console.log(response.data);
                    this.setState({courses: response.data, message: "Courses are loaded", error: null});
                }
            ).catch(error => {
            console.log("findAllCourses: ERROR: " + error.message);
            this.setState({error: error, message: error.message});
        });
    }

    render() {
        return (
            <div className="container">
                <h3>All courses</h3>
                <div className="container">
                    {
                        this.state.error &&
                        <div className="alert alert-danger">{this.state.message}</div>
                    }
                    <div className="card-columns" key="cardsKey">
                        {
                            this.state.courses.map(
                                course =>
                                    <div className="card bg-light" key={course.id}>
                                        <img className="card-img-top" key={course.id} src={book}
                                             alt={course.coursename}/>
                                        <div className="card-body">
                                            <h4 className="card-title">{course.coursename}</h4>
                                            <p className="card-text">{course.description}</p>
                                            <p className="card-text">Category: {course.courseCategory.name}</p>
                                            <p className="card-link">Price: {course.price}:-</p>
                                            <button className="btn btn-outline-danger"
                                                onClick={() => this.deleteCourseClicked(course.id)}>Delete</button>
                                        </div>
                                    </div>
                            )
                        }
                    </div>
                </div>
            </div>
        )
    }

    deleteCourseClicked(id){
        CourseService.deleteCourse(id)
            .then(
                response => {
                    console.log("Delete response");
                    console.log(response.data);
                    this.setState({message: `Course with id ${id} deleted`});
                    this.refreshCourses();
                }
            )
    }
}

export default CoursesComponent;