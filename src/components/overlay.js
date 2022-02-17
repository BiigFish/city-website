import React, { useState } from "react";
import Menu from './menu';
import TextBox from './text'
import Info from './info'

function Overlay(){
    const [show, setShow] = useState(0);
    const changeAbout = () => {
      if (show === 1) {
        setShow(0)
      }
      else
        setShow(1)
    };
    const changeStory = () => {
      if (show === 2) {
        setShow(0)
      }
      else
        setShow(2)
    }

    return(
      <div>
        <Menu 
          onClickAbout={changeAbout}
          onClickStory={changeStory}
        />
        <Info />
        <TextBox display={show}
        />

      </div>
    );

}

export default Overlay;