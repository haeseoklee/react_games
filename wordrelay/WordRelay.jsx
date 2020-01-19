const React = require('react');
const {useState, useRef} = React;


const WordRelay = () => {
	const [word, setWord] = useState('리액트');
    const [value, setValue] = useState('');
    const [result, setResult] = useState('');
    const inputRef = useRef(null);

    const onChange = (e) => {
        setValue(e.target.value);
    }

    const onSubmit = (e) => {
        e.preventDefault();
        let ans = '틀렸습니다';
		let b = word[word.length-1] === value[0]; // word.charAt(word.length-1) === value.charAt(0);
        if (b){
            ans = '정답입니다!' ;
			setWord(value);
        }
        setResult(ans);
        setValue('');
        inputRef.current.focus();
    }
    
    return (
        <>
            <div>{word}</div>
            <input ref={inputRef} value={value} onChange={onChange}/>
            <button onClick={onSubmit}>제출</button>
            <div>{result}</div>
        </>
    );
}

module.exports = WordRelay;
