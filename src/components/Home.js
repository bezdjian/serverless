import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import CoursesComponent from './CoursesComponent';
import StudentsComponent from './StudentsComponent';
import HomeComponent from './HomeComponent';
import SaveViewCourseComponent from './SaveViewCourseComponent';
import SaveViewStudentComponent from './SaveViewStudentComponent';

import Header from './Header';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

class Home extends Component {
  render() {
    return (
      <Router>
        <Header />
        <div>
          <Switch>
            <Route path="/" exact component={HomeComponent} />
            <Route path="/courses" exact component={CoursesComponent} />
            <Route path="/students" exact component={StudentsComponent} />
            <Route
              path="/view-save-course/:id"
              exact
              component={SaveViewCourseComponent}
            />
            <Route
              path="/view-save-student/:id"
              exact
              component={SaveViewStudentComponent}
            />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default Home;
