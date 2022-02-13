import React, { Component} from "react";
import "./App.css";
import Canvas from './components/canvas';
import Menu from './components/menu';
import TextBox from './components/text'

class App extends Component{
  constructor(props) {
    super(props);
    this.state = {
      showAbout: true,
      showStory: true
    };
  }
  render(){
    return(
      <div>
        <Canvas />
        <Menu
          showAbout={this.state.showAbout}
          showStory={this.state.showStory}
        />
        <TextBox
          showAbout={this.state.showAbout}
          showStory={this.state.showStory}
        />

      </div>
    );
  }
}

export default App;