const React = require('react');
const {memo} = React;

const Result = memo(({result}) => {

    setResult = () => {
        return (
            result.length != 0 
            ? Math.floor(result.reduce((acc, cur)=> acc + cur) / result.length) + 'ms'
            : '결과없음'
        );
    }

    return (
        <>
            <h1>평균속도: {setResult()}</h1>
        </>
    );
});

module.exports = Result;
