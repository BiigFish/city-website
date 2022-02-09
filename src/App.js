import React, { Component} from "react";
import "./App.css";
import CanvasMenu from './components/canvas';


class App extends Component{
  render(){
    return(
      <div className="App">
        <div className="canvas-container">
          <CanvasMenu />
        </div>
        <h1> Hello, World! </h1>
        

      </div>
    );
  }
}

export default App;