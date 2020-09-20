import React from 'react';
import './App.css';
import Board from './components/Board';
import Selection from './components/selection';
import './css/bootstrap.min.css';

import {BrowserRouter as Router, Route,Switch} from 'react-router-dom'

function App() {
  return (
    <Router>
      <div >
        <Switch>
          <div id = "App-container" className = "row row-list">
              <Route path="/fireGame" exact component={Board}></Route>
          </div>
      </Switch>
      <Switch>
        <div id = "App-container" className = "row row-list">
              <Route path="/" exact component={Selection}></Route>
        </div>
      </Switch>
      </div>
    </Router>
  );
}

export default App;
