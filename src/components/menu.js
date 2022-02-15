import React from "react";
import "./menu.css";


const Menu = ({ onClickAbout, changeAbout, onClickStory, changeStory}) => {


return (
    
    <div className="menu-container">
        <div className='triangle'></div>
        <div className='text'>
            <button onClick={() => window.location.reload(false)}><h1>My City</h1></button>
            <button onClick={onClickAbout}><h2>About</h2>{changeAbout}</button>
            <button onClick={onClickStory}><h2>Story</h2>{changeStory}</button>
        </div>
    </div>
);

};

export default Menu;