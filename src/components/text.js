import "./text.css";
import ReactMarkdown from 'react-markdown';
import React from "react";

class Text extends React.Component {
    render() {

        const showAbout = this.props.showAbout;
        const showStory = this.props.showStory;

        const about = `# About
        Random text oh yeah
        ## yes indeed
        `
        const story = `# Story
        This is the story section
        `
        
        if (showAbout) {
            return (
                <div className='text-container'>
                        <ReactMarkdown children={about} />
                </div>
            );
        }
        else if (showStory) {
            return (
                <div className='text-container'>
                        <ReactMarkdown children={story} />
                </div>
            );
        }
        else {
            return (null);
        }
}
};

export default Text;
