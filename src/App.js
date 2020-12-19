import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import 'bootstrap-css-only/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'mdbreact/dist/css/mdb.css';
import Courses from './components/Courses/Courses';
import Students from './components/Students/Students';
import Home from './components/Home';
import SaveViewCourse from './components/Courses/SaveViewCourse';
import SaveViewStudent from './components/Students/SaveViewStudent';

import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Test from './components/NotFound/NotFound';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

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
            <Route component={Test} />
          </Switch>
        </div>
        <Footer />
      </Router>
    );
  }
}

export default App;
