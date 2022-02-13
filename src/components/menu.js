import React from "react";
import "./menu.css";


class Menu extends React.Component {
    constructor(props) {
        super(props);
        this.handleShowAboutChange = this.handleShowAboutChange.bind(this);
    }
    handleShowAboutChange(e) {
        this.props.onShowAboutChange(e.target.value);
    }

    render() {
    const showAbout = this.props.showAbout;

function button() {
    showAbout = true;
}

return (
    
    <div className="menu-container">
        <div className='triangle'></div>
        <div className='text'>
            <button onClick={() => window.location.reload(false)}><h1>My City</h1></button>
            <button onClick={() => button()}><h2>About</h2></button>
            <h2>Story</h2>
        </div>
    </div>
);
}
};

export default Menu;