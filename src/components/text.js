import "./text.css";
import ReactMarkdown from 'react-markdown';
import React from "react";

const Text = props => {
    const display = props.display



        const about = `# About
        Random text oh yeah
        ## yes indeed
        `
        const story = `# Story
        This is the story section
        `
        
        if (display === 1) {
            return (
                <div className='text-container'>
                        <ReactMarkdown children={about} />
                </div>
            );
        }
        else if (display === 2) {
            return (
                <div className='text-container'>
                        <ReactMarkdown children={story} />
                </div>
            );
        }
        else {
            return (null);
        }

};

export default Text;
