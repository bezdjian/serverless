import React, { Component } from 'react';
import CourseService from "../services/CourseService";

class NewCourseComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            course: {
                coursename: "",
                idnumber: "",
                description: "",
                price: "",
                category: 1
            },
            categories: []
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCourseNameChange= this.handleCourseNameChange.bind(this);
        this.handleCategoryChange = this.handleCategoryChange.bind(this);
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
        this.handleIdNumberChange = this.handleIdNumberChange.bind(this);
        this.handlePriceChange = this.handlePriceChange.bind(this);
    }

    componentDidMount(){
        this.loadCategories();
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

    loadCategories(){
        CourseService.loadCategories()
            .then(
                response => {
                    console.log("Categories loaded..");
                    console.log(response.data);
                    this.setState({categories: response.data});
                }
            )
    }


    render() {
        return (
            <div className="container-fluid m-2">
                <h4>Create course</h4>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <input type="text" className="form-control" id="coursename" placeholder="Course name"
                            name="coursename" value={this.state.course.coursename}
                            onChange={this.handleCourseNameChange} />
                    </div>
                    <div className="form-group">
                        <input type="text" className="form-control" id="idnumber" placeholder="ID Number"
                            name="idnumber" value={this.state.course.idnumber}
                            onChange={this.handleIdNumberChange} />
                    </div>
                    <div className="form-group">
                        <input type="text" className="form-control" id="price" placeholder="Price"
                            name="price" value={this.state.course.price}
                            onChange={this.handlePriceChange} />
                    </div>
                    <div className="form-group">
                        <textarea className="form-control" id="description" placeholder="Description"
                            name="description" value={this.state.course.description}
                            onChange={this.handleDescriptionChange} />
                    </div>
                    <div className="form-group">
                        <select className="form-control" id="category" placeholder="Category"
                            name="category" value={this.state.course.category}
                            onChange={this.handleCategoryChange}
                            se="1">
                                {this.state.categories.map(
                                    (cat) => (
                                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                                    )
                                )}
                        </select>
                    </div>
                    <button type="submit" className="btn btn-primary">Add</button>
                </form>
            </div>

        )
    }

    handleCourseNameChange(event) {
        this.setState({
            course: {
                ...this.state.course,
                coursename: event.target.value
            }
        });
    }

    handleIdNumberChange(event) {
        this.setState({ 
            course: {
                ...this.state.course,
                idnumber: event.target.value
            } 
        });
    }

    handlePriceChange(event) {
        this.setState({ 
            course: {
                ...this.state.course,
                price: event.target.value
            } 
        });
    }

    handleDescriptionChange(event) {
        this.setState({ 
            course: {
                ...this.state.course,
                description: event.target.value
            } 
        });
    }

    handleCategoryChange(event) {
        this.setState({ 
            course: {
                ...this.state.course,
                category: event.target.value
            } 
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        console.log("*** Form values in this.state.course ***");
        console.log(this.state.course);
        CourseService.createCourse(this.state.course);
        this.props.history.push('/courses');
        this.refreshCourses();
    }
}

export default NewCourseComponent;