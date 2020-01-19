import React, {Component} from 'react';
import Ball from './Ball';

const getRandomNumbers = () => {
    let candidates = [];
    let array = [];
    for(let i=1; i<46; i++){
        candidates.push(i);
    }
    for(let i=0; i<7; i++){
        let candidate = candidates.splice(Math.floor(Math.random() * (45 - i)), 1)[0];
        array.push(candidate);
    }
    return array;
}

class Lotto extends Component {
    state = {
        winNumbers: getRandomNumbers(),
        winBalls: [],
        bonus: null,
        redo: false
    };

    timeouts = [];

    componentDidMount() {
        this.runTimeout();
    }

    componentDidUpdate(preProps, prevState) {
       /*
        const {winBalls, winNumbers} = this.state;
        if (winBalls.length === 0) {
            
        }
        */
        if (prevState.winNumbers !== this.state.winNumbers) {
            console.log("restart");
            this.runTimeout();
        } 
        
    }

    componentWillUnmount() {
        this.timeouts.forEach(timeout => {
            clearTimeout(timeout);
        });
    }

    onClickRedo = () => {
        this.setState({
            result: '',
            winNumbers: getRandomNumbers(),
            winBalls: [],
            bonus: null
        })
        this.timeouts = [];
        //this.runTimeout();
    };

    runTimeout = () => {
        const {winNumbers} = this.state;
        for(let i = 0; i < winNumbers.length-1; i++){
            this.timeouts[i] = setTimeout(() => {
                this.setState((prevState) => ({
                    winBalls: [...prevState.winBalls, winNumbers[i]],
                }));
            }, (i + 1) * 1000);
            this.timeouts[6] = setTimeout(() => {
                this.setState({
                    bonus: winNumbers[6],
                    redo: true,
                })
            }, 7000);
        }
    }

    render() {
        const {winBalls, bonus, redo} = this.state;
        const date = new Date();
        return (
            <>
                <p>당첨숫자</p>
                {winBalls.map((v) => <Ball key={v + date} number={v}/>)}
                <p>보너스</p>
                {bonus && <Ball number={bonus}/>}
                {redo && <button onClick={this.onClickRedo}>한번더</button>}
            </>
        );
    };
}

export default Lotto;