import React, { Component } from 'react';
import './App.css';
import { Link } from 'react-router-dom';

class App extends Component {
  render() {
    return (
        <div>
          <div className="App">
              <p className="App-intro">
                <Link to ='/survey_system/login'>Login</Link>
              </p>
          </div>
        </div>
    );
  }
}

export default App;
