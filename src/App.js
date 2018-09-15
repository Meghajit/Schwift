import React, { Component } from 'react';
import Board from './Components/Board';

class App extends Component {
  render() {
    return (
      <div className="App" style={{textAlign:'center'}}>
        <Board />
      </div>
    );
  }
}

export default App;
