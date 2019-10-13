import React, { Component } from 'react';
import '../css/bootstrap.min.css';
// import '../js/bootstrap.min';

import CoursesComponent from './CoursesComponent';
import HomeComponent from './HomeComponent';
import SaveViewCourseComponent from './SaveViewCourseComponent';
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
            <Route
              path="/view-save-course/:id"
              exact
              component={SaveViewCourseComponent}
            />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default Home;
