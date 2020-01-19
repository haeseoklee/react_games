const React = require('react');
const Result = require('./ResultHooks');
const {Component, useState, useRef} = React;


const CheckReact = () => {
    const [state, setState] = useState('waiting');
    const [message, setMessage] = useState('클릭해서 시작하세요');
    const [result, setResult] = useState([]);
    let timeout = useRef(null);
    let startTime = useRef(null);
    let endTime = useRef(null);

    const onClick = () => {
        switch (state) {
            case 'waiting':
                setState('ready');
                setMessage('초록색이 되면 클릭하세요');
                timeout.current = setTimeout(() => {
                    startTime.current = new Date();
                    setState('now');
                    setMessage('지금클릭');
                }, Math.floor(Math.random() * 1000 + 2000));
                break;
            case 'now':
                endTime.current = new Date();
                setState('waiting');
                setMessage('클릭해서 시작하세요');
                setResult([...result, endTime.current - startTime.current]);
                break;
            case 'ready':
                clearTimeout(timeout.current);
                setState('waiting');
                setMessage('너무 빨리 눌렀습니다. 클릭해서 시작하세요');
                break;
            default:
                console.log('오류!');
        }
    }
    return (
        <>
            <div
                id="screen"
                className={state}
                onClick={onClick}
            >
                {message}
            </div>
            <Result result={result}/>
        </>
    );
}


module.exports = CheckReact;