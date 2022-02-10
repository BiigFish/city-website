import React, { Component} from "react";
import "./App.css";
import CanvasMenu from './components/canvas';
import Menu from './components/menu';

class App extends Component{
  render(){
    return(
      <div className="App">
        <div className="canvas-container">
          <CanvasMenu />
        </div>
        <Menu />

      </div>
    );
  }
}

export default App;