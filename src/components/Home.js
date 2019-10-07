import React, { Component } from 'react';

import '../css/App.css';
import '../css/bootstrap.min.css';
//import '../js/bootstrap.min';

import CoursesComponent from './CoursesComponent';
import HomeComponent from './HomeComponent';
import NewCourseComponent from './NewCourseComponent';
import ViewEditCourseComponent from './ViewEditCourseComponent';
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
            <Route path="/new-course" exact component={NewCourseComponent} />
            <Route
              path="/view-edit-course/:id"
              exact
              component={ViewEditCourseComponent}
            />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default Home;
