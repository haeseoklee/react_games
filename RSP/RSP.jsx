/* 
const React = require('react');
const {Component} = React;
 */
import React, { Component } from 'react';

/*

React 클래스의 라이프사이클

constructor -> render -> ref -> componentDidMount ->
(setState/props가 바뀔때) -> shouldComponentUpdate(true) -> render -> componentDidUpdate ->
(부모가 나 <현재 컴포넌트>를 없앴을경우) -> componentWillUnmount -> 소멸 


componentDidMount : 컴포넌트가 처음 랜더링 된 후 실행됨 / 
                    이 후 재랜더링 후에는 실행되지 않음 / 
                    비동기 요청을 많이 함 /
                    
componentDidUpdate : 리랜더링 후 실행됨

componentWillUnmount : 컴포넌트가 제거되기 직전 실행됨 /
                    비동기 요청한 것을 정리해줌 / 

*/

const rspCoords = {
    scissor: '0',
    rock: '-142px',
    paper: '-284px',
};
  
const scores = {
    scissor: 1,
    rock: 0,
    paper: -1,
};

const computerChoice = (imgCoord) => {
    return Object.entries(rspCoords).find(function(v) {
        return v[1] == imgCoord;
    })[0];
};


class RSP extends Component {
    constructor(props){
        super(props);
        this.state = {
            result: '',
            imgCoord: rspCoords.rock,
            score: 0,
        };
        this.interval = null;
    };

    componentDidMount () {
        this.interval = setInterval(this.changeHand, 100);
    };

    componentWillUnmount () {
        clearInterval(this.interval);
    };

    changeHand = () => {
        const { imgCoord } = this.state;
        const { rock, scissor, paper } = rspCoords;
        switch (imgCoord) {
            case rock:
                this.setState({
                    imgCoord: scissor,
                })
                break;
            case scissor:
                this.setState({
                    imgCoord: paper,
                })
                break;
            case paper:
                this.setState({
                    imgCoord: rock,
                })
                break;
            default:
                return null;
        }
    };

    onClickBtn = (choice) => () => {
        clearInterval(this.interval);
        const {imgCoord} = this.state;
        
        const compChoice = computerChoice(imgCoord);
        const userChoice = choice;

        const compScore = scores[compChoice];
        const userScore = scores[userChoice];
        
        const diff = compScore - userScore;
        console.log(compChoice, userChoice);
        console.log(diff);
        if (diff === 0) {
            this.setState({
                result: '비겼습니다',
            });
        } else if (diff === -1 || diff === 2) {
            this.setState( (prevState) => ({
                result: '이겼습니다',
                score: prevState.score + 1,
            }));
        } else {
            this.setState( (prevState) => ({
                result: '졌습니다',
                score: prevState.score - 1,
            }));
        }
        
        setTimeout(() => {
            this.interval = setInterval(this.changeHand, 100);
        }, 2000);
    };

    render() {
        const { result, imgCoord, score } = this.state;
        return(
            <>
                <div id="computer" style={{ background: `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${imgCoord} 0`}}></div>
                <div>
                    <button id="rock" className="btn" onClick={this.onClickBtn('rock')}>바위</button>
                    <button id="scissor" className="btn" onClick={this.onClickBtn('scissor')}>가위</button>
                    <button id="paper" className="btn" onClick={this.onClickBtn('paper')}>보</button>
                </div>
                <div>{result}</div>
                <div>현재 {score} 점</div>
            </>
        );
    };
}

export default RSP;