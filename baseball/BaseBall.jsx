const React = require('react');
const Try = require('./Try');

const getNumbers = (N) => {
    let candidate = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    let array = [];
    let i = 0;
    while (i < N){
        array.push(candidate.splice(Math.floor(Math.random() * (9 - i)), 1)[0]);
        i++;
    }
    console.log(array);
    return array;
}

class BaseBall extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            result: '숫자야구게임에 오신걸 환영합니다',
            value: '',
            answer: getNumbers(4),
            tries: [],
        };
        const inputRef = null;
    }

    onSubmitForm = (e) => {
        e.preventDefault();
        let ans = this.state.answer;
        let val = this.state.value.split('').map((i) => parseInt(i));
        let res = '시도 횟수를 초과! 게임을 다시 시작합니다';
        let strike = 0;
        let ball = 0;
        if (this.state.tries.length < 10){
            res = '올바른 입력값이 아닙니다';
            if (this.isValueValid(val)){
                for(let i=0; i<4; i++){
                    if (ans.includes(val[i])){
                        if (val[i] === ans[i]){
                            strike++;
                            continue;
                        }
                        ball++;
                    }
                }
                if (strike == 4 && ball == 0){
                    res = `축하합니다! ${ans.join('')}은 홈런입니다`;
                    this.restart(res);
                }
                else{
                    res = strike + ' 스트라이크 ' + ball + ' 볼 ' + '입니다';
                    // 참조가 바뀌어야 react가 알아차릴수 있다!
                    // 그러므로 배열을 업데이트할 때 push 대신 새로운 배열을 생성해준다.
                    // this.state.tries.push([val, res]);
                    // this.state.tries = [...this.state.tries, [val, res]];
                    
                    // setState를 연달아 사용할 경우 비동기 문제로인해 setState를 함수형으로 바꾼 후
                    // prevState를 사용해 값을 업데이트해주는게 좋다.
                    this.setState((prevState) => {
                        return({
                            result: res,
                            value: '',
                            tries: [...prevState.tries, {try: val, res:res}],
                        })
                    })
                }
            }
            else{
                this.setState({
                    result: res,
                    value: '',
                })
            }
        }
        else{
            this.restart(res);
        }
        this.inputRef.focus();
    }

    onChangeInput = (e) => {
        this.setState({
            value: e.target.value
        });
    }

    isValueValid = (v) => {
        return v.length == 4 ? true : false; 
    }

    restart = (res) => {
        this.setState({
            result: res,
            value: '',
            answer: getNumbers(4),
            tries: [],
        })
    }

    onInputRef = (c) => {
        this.inputRef = c;
    }
    // this.setState는 render 함수를 호출한다
    // 즉, render 함수안에는 this.setState 를 호출하면 안됨 - 무한반복
    render() {
        const {result, value, tries} = this.state;
        return (
            <>
                <h1>{result}</h1>
                <form onSubmit={this.onSubmitForm}>
                    <input ref={this.onInputRef} type="number" maxLength={4} value={value} onChange={this.onChangeInput}/>
                </form>
                <h4>시도: {tries.length} 남은시도:  {10 - tries.length}</h4>
                <ul>
                    {tries.map((v, i) => <Try key = {v.try + v.res + i} value={v} index={i}/> 
                        // value 와  index 는 props로 넘겨주는 이름
                        // map으로 순회할때 최적화를 위해 key를 '고유한 값'으로 만들어준다. key값으로 인덱스i를 포함하는건 좋은 방벙은 아님.
                        // 화살표 함수는 리턴 생략가능
                    )}
                </ul>
            </>
        );
    }
}

module.exports = BaseBall;