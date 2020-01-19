const React = require('react');
const {useState, useRef} = React;


const GuGuDan = () => {

    const getRandom = () => {
        return Math.ceil(Math.random() * 9);
    }

    const [first, setFirst] = useState(getRandom());
    const [second, setSecond] = useState(getRandom());
    const [value, setValue] = useState('');
    const [result, setResult] = useState('');
    const inputRef = useRef(null);

    const onChange = (e) => {
        setValue(e.target.value);
    }

    const onSubmit = (e) => {
        e.preventDefault();
        let v = parseInt(value);
        let b = v === first * second;
        let ans = '틀렸습니다';
        // 비동기로 처리하기 때문에 밑에 쓰인 setFirst, setSecond, setResult, setValue는
        // 따로따로 실행되지 않고 React는 자동으로 모아서 한번에 실행시킨다.,
        if (b){
            ans = '정답입니다!' ;
            setFirst(getRandom());
            setSecond(getRandom());
        }
        /*
        //이전 state를 사용하고 싶을때 !! 함수를 안에 만들어준다~
        setResult((prevResult) => {
            return (v + ' 은(는) ' + ans);
        })
        */
        setResult(v + ' 은(는) ' + ans);
        setValue('');
        inputRef.current.focus();
    }
    

    // 랜더링 할때 Hooks(함수형)은 이 컴포넌트 함수 전체가 다시 실행된다. class 기반보다 느릴 수 있다.
    // console.log('랜더링');
    // React는 class 속성을 사용하지 못하는 대신 className 속성을 사용해야함
    // 마찬가지로 for 속성대신 htmlFor사용
    // <></> 는 <React.Fragment></React.Fragment>의 간소화 
    return (
            <>
                <div>{first} 곱하기 {second} 는 ?</div>
                <input ref={inputRef} type="number" value={value} onChange={onChange}/>
                <button onClick={onSubmit}>입력!</button>
                <div>{result}</div>
            </>
            );
}

module.exports = GuGuDan;