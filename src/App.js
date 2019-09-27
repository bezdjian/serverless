import React from 'react';
//import logo from './logo.svg';
import './css/App.css';
import './css/bootstrap.min.css';

import InstructorApp from "./components/InstructorApp";

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <p>Some headers</p>
            </header>
            <div className="container">
                <InstructorApp/>
            </div>
        </div>
    );
}

export default App;
