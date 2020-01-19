import React, {useState, useCallback, useEffect, useMemo, useRef} from 'react';
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
};

const getRandomNumbers2 = () => {
    let candidates = Array(45).fill().map((v, i) => i + 1);
    let array = [];
    while (candidates.length > 0) {
        array.push(
            candidates.splice(Math.floor(Math.random() * candidates.length), 1)[0]
        );
    }
    let bonus = array[array.length - 1];
    let winNumbers = array.slice(0, 6).sort((a, b) => a - b);
    return [...winNumbers, bonus];
};

const LottoHooks = () => {
    const lottoNumbers = useMemo(() => getRandomNumbers(), []);
    const [winNumbers, setWinNumbers] = useState(lottoNumbers);
    const [winBalls, setWinBalls] = useState([]);
    const [bonus, setBonus] = useState(null);
    const [redo, setRedo] = useState(false);
    const timeouts = useRef([]);
    const date = new Date();

    useEffect(() => {
        for(let i = 0; i < winNumbers.length-1; i++){
            timeouts.current[i] = setTimeout(() => {
                setWinBalls((prevState) => [...prevState, winNumbers[i]])
            }, (i + 1) * 1000);
            timeouts.current[6] = setTimeout(() => {
                setBonus(winNumbers[6]);
                setRedo(true);
            }, 7000);
        }
        return () => {
            timeouts.current.forEach(timeout => {
                clearTimeout(timeout);
            });
        };
    }, [timeouts.current]);
    // 빈 배열이면 componentDidMount와 동일
    // 배열에 요소가 있으면 componentDidMount랑 componentDidUpdate 둘 다 수행

    const onClickRedo = useCallback(() => {
        setWinBalls([]);
        setWinNumbers(getRandomNumbers());
        setBonus(null);
        setRedo(false);
        timeouts.current = [];
    }, [winNumbers])
    
    return (
        <>
            <p>당첨숫자</p>
            {winBalls.map((v) => <Ball key={v + date} number={v}/>)}
            <p>보너스</p>
            {bonus && <Ball number={bonus}/>}
            {redo && <button onClick={onClickRedo}>한번더</button>}
        </>
    );
}

export default LottoHooks;