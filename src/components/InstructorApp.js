import React, {Component} from 'react';
import CoursesComponent from "./CoursesComponent";

class InstructorApp extends Component {
    render() {
        return (
            <div>
                <h1>Instructor Application</h1>
                <CoursesComponent/>
            </div>
        )
    }
}

export default InstructorApp;