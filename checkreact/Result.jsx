const React = require('react');
const {Component} = React;

class Result extends Component {
    
    setResult = () => {
        const {result} = this.props;
        return (
            result.length != 0 
            ? Math.floor(result.reduce((acc, cur)=> acc + cur) / result.length) + 'ms'
            : '결과없음'
        );
    }
    
    render() {
        
        return (
            <>
                <h1>평균속도: {this.setResult()}</h1>
            </>
        );
    }
}

module.exports = Result;