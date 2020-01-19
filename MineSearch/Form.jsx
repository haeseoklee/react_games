import React, { useState, useContext, useCallback } from 'react';
import { TableContext, START_GAME } from './MineSearch';


const Form = () => {

    const [row, setRow] = useState(5);
    const [col, setCol] = useState(5);
    const [mine, setMine] = useState(10);
    const { dispatch } = useContext(TableContext);

    const onChangeRow = useCallback((e) => {
        setRow(e.target.value);
    }, []);

    const onChangeCol = useCallback((e) => {
        setCol(e.target.value);
    }, []);

    const onChangeMine = useCallback((e) => {
        setMine(e.target.value);
    }, []);

    const onClickBtn = useCallback(() => {
        if (row * col < mine) {
            return;
        }
        dispatch({ type: START_GAME, rowLength: row, colLength: col, numberOfMines: mine });
    }, [row, col, mine]);

    return (
        <>
            <input type="number" placeholder="세로" value={row} onChange={onChangeRow}/>
            <input type="number" placeholder="가로" value={col} onChange={onChangeCol}/>
            <input type="number" placeholder="지뢰" value={mine} onChange={onChangeMine}/>
            <button onClick={onClickBtn}>시작</button>
        </>
    )
}

export default Form;