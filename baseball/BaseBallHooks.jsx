const React = require('react');
const {useState, useEffect} = React;
const Try = require('./TryHooks');

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

const BaseBall = () => {

    const [result, setResult] = useState('숫자야구게임에 오신걸 환영합니다');
    const [value, setValue] = useState('');
    const [answer, setAnswer] = useState(getNumbers(4));
    const [tries, setTries] = useState([]);
    const [strike, setStrike] = useState(0);
    const [ball, setBall] = useState(0);


    const onChangeInput = (e) => {
        setValue(e.target.value);
    }

    const onSubmitForm = (e) => {
        e.preventDefault();
        setValue(value.split('').map((i) => parseInt(i)));
        if (tries.length < 10){
            if (isValueValid(value)){
                for(let i=0; i<4; i++){
                    if (answer.includes(value[i])){
                        
                        if (value[i] === answer[i]){
                            setStrike((prev)=>{
                                return prev.strike++;
                            })
                            continue;
                        }
                        setBall((prev)=>{
                            return prev.ball++;
                        })
                    }
                }
                if (strike === 4 && ball === 0){
                    restart(`축하합니다! ${answer.join('')}은 홈런입니다`);
                }
                else{
                    let message = strike + ' 스트라이크 '+ ball + ' 볼 ' + '입니다';
                    setResult(strike + ' 스트라이크 ' + ball + ' 볼 ' + '입니다');
                    setValue('');
                    setTries([...tries, {try: value, res: strike + ' 스트라이크 ' + ball + ' 볼 ' + '입니다'}]);
                    /*setTries((prevState) => {
                        console.log('flag');
                        return [...prevState.tries, {try: value, res: strike + ' 스트라이크 ' + ball + ' 볼 ' + '입니다'}];
                    })*/
                }
            }
            else{
                setResult('올바른 입력값이 아닙니다');
                setValue('');
            }
        }
        else{
            restart('시도 횟수를 초과! 게임을 다시 시작합니다');
        }
    }

    const isValueValid = (v) => {
        return v.length === 4 ? true : false; 
    }

    const restart = (res) => {
        setResult(res);
        setValue('');
        setAnswer(getNumbers(4));
        setTries([]);
        setStrike(0);
        setBall(0);
    }
    
    return (
        <>
            <h1>{result}</h1>
            <form onSubmit={onSubmitForm}>
                <input maxLength={4} type="number" maxLength={4} value={value} onChange={onChangeInput}/>
            </form>
            <h4>시도: {tries.length} 남은시도:  {10 - tries.length}</h4>
            <ul>
                {tries.map((v, i) => <Try key={v.try + v.res + i} v={v} i={i}/>)}
            </ul>
        </>
    );
}

module.exports = BaseBall;