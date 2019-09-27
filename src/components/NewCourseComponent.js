import React, {Component} from 'react';
import CourseService from "../services/CourseService";

class NewCourseComponent extends Component {

    constructor(props){
        super(props);
        this.handleSubmit.bind(this);
    }
    render() {
        return (
            <div className="container-fluid m-2">
                <h4>Create course</h4>
                <form>
                    <div className="form-group">
                        <input type="text" className="form-control" id="courseName" placeholder="Course name"
                               name="courseName"/>
                    </div>
                    <div className="form-group">
                        <input type="text" className="form-control" id="idNumber" placeholder="ID Number"
                               name="idNumber"/>
                    </div>
                    <div className="form-group">
                        <input type="text" className="form-control" id="price" placeholder="Price" name="price"/>
                    </div>
                    <div className="form-group">
                        <textarea className="form-control" id="description" placeholder="Description"
                                  name="description"/>
                    </div>
                    <div className="form-group">
                        <select className="form-control" id="category" placeholder="Category" name="category">
                            <option>adwd</option>
                            <option>adwd</option>
                            <option>adwd</option>
                        </select>
                    </div>
                    <button type="submit" className="btn btn-primary">Add</button>
                </form>
            </div>
        )
    }

    handleSubmit(event){
        event.preventDefault();
        const data = new FormData(event.target);

        CourseService.createCourse(data);
    }
}

export default NewCourseComponent;