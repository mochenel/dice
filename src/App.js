import React from 'react';
import './App.css';
import Board from './components/Board';
import Win from './components/win';
import './css/bootstrap.min.css';

function App() {
  return (
  	<div >
      <div id = "App-container" className = "row row-list">
          <Board />
    </div>

    </div>
  );
}

export default App;
