import React from 'react';
import './App.css';
import Board from './components/Board';
import Selection from './components/selection';
import './css/bootstrap.min.css';

import {HashRouter as Router, Route,Switch} from 'react-router-dom'

function App() {
  return (
    
    <Router>
      <div id = "App-container" className = "row row-list">
        <Switch>
              <Route path="/fireGame" exact component={Board}></Route>
      </Switch>
      </div>
      <div id = "App-container" className = "row row-list">
      <Switch>
              <Route path="/" exact component={Selection}></Route>
      </Switch>
      </div>
    </Router>
  );
}

export default App;
