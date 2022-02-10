import React from "react";
import "./menu.css";
import Text from './text';


const Menu = () => {
return (
    
    <div className="menu-container">
        <div className='triangle'></div>
        <div className='text'>
            <button onClick={() => window.location.reload(false)}><h1>My City</h1></button>
            <h2>About</h2>
            <h2>Story</h2>
        </div>
        <Text />
    </div>
);
};

export default Menu;