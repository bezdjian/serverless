import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js'
import 'bootstrap-css-only/css/bootstrap.min.css'; 
import '@fortawesome/fontawesome-free/css/all.min.css'; 
import 'mdbreact/dist/css/mdb.css';
//import $ from 'jquery';

import Courses from './components/Courses/Courses';
import Students from './components/Students';
import Home from './components/Home';
import SaveViewCourse from './components/SaveViewCourse';
import SaveViewStudent from './components/SaveViewStudent';

import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <Router>
        <Header />
        <div>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/courses" exact component={Courses} />
            <Route path="/students" exact component={Students} />
            <Route
              path="/view-save-course/:id"
              exact
              component={SaveViewCourse}
            />
            <Route
              path="/view-save-student/:id"
              exact
              component={SaveViewStudent}
            />
          </Switch>
        </div>
        <Footer />
      </Router>
    );
  }
}

export default App;
