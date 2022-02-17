import "./text.css";
import React from "react";
import ReactMarkdown from 'react-markdown';

const Text = props => {
    const display = props.display



const about = `
# about

This is where the about section will go`;

const story = `# Story
All you had was a name of the city:_____, and the name of your friend:_____.

How could you possibly hope to find your friend in the endless sprawl of the skyscraping towers? So many people with their own stories jammed into massive blocks.

Maybe one day there will be stories for each building. But not today.`;
        
        
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
