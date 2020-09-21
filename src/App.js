import React from 'react';
import './App.css';
import Board from './components/Board';
import Selection from './components/selection';
import './css/bootstrap.min.css';

import {BrowserRouter as Router, Route,Switch} from 'react-router-dom'

function App() {
  return (
    
   <div>
     <Board />
   </div>
  );
}

export default App;
