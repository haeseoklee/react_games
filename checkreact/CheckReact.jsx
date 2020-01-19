const React = require('react');
const Result = require('./Result');
const {Component} = React;

class CheckReact extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            state : 'waiting',
            message: '클릭해서 시작하세요',
            result: [],
        };
    };
    timeout;
    startTime;
    endTime;
    onClick = () => {
        switch(this.state.state){
            case 'waiting':
                this.setState({
                    state: 'ready',
                    message: '초록색이 되면 클릭하세요'
                });
                this.timeout = setTimeout(() => {
                    this.startTime = new Date();
                    this.setState({
                        state: 'now',
                        message: '지금클릭!',
                    })
                }, Math.floor(Math.random() * 1000 + 2000)); // setTimeout(function, time)
                break;
            case 'now':
                this.endTime = new Date();
                this.setState({
                    state: 'waiting',
                    message: '클릭해서 시작하세요',
                    result: [...this.state.result, this.endTime - this.startTime]
                });
                break;
            case 'ready':
                clearTimeout(this.timeout);
                this.setState({
                    state: 'waiting',
                    message: '너무 빨리 눌렀습니다. 클릭해서 시작하세요'
                });
                break;
            default:
                console.log('오류!');
        }
    };

    render(){
        const {state, message, result} = this.state;
        return(
            <>
                <div
                    id="screen"
                    className={state}
                    onClick={this.onClick}
                >
                    {message}
                </div>
                <Result result={result}/>
            </>
        );
    };
}

module.exports = CheckReact;