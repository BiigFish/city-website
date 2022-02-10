import "./text.css";
import ReactMarkdown from 'react-markdown';

const markdown = `this is a test

## and there is more
oh sshit

semi shit
`

const Text = () => {
    return (
        <div className='text-container'>
                <ReactMarkdown children={markdown} />
        </div>
    );
};

export default Text;
