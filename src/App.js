import React from "react";
import "./App.css";
import Canvas from './components/canvas';
import Overlay from './components/overlay'

function App(){
    return(
      <div>
        <Canvas />
        <Overlay />

      </div>
    );

}

export default App;