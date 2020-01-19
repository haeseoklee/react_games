import React, {useState, useCallback, useMemo, useEffect, useReducer} from 'react';
import Table from './Table';

export const SET_WINNER = 'SET_WINNER';
export const CLICK_CELL = 'CLICK_CELL';
export const CHANGE_TURN = 'CHANGE_TURN';
export const RESET_GAME = 'RESET_GAME';
export const SET_TIE = 'SET_TIE';


const initialState = {
    winner: '',
    turn: 'O',
    tableData: [
        ['', '', ''],
        ['', '', ''],
        ['', '', ''],
    ],
    recentCell: [-1, -1],
    clicked: 0,
    halted: false,
    tie: false,
    redo: false,
};

const reducer = (state, action) => {
    switch (action.type) {

        case SET_TIE:
            return ({
                ...state,
                tie: true,
                redo: true,
            })

        case SET_WINNER:
            return ({
                ...state,
                winner: state.turn,
                halted: true,
                redo: true,
            })

        case CHANGE_TURN:
            return ({
                ...state,
                turn: state.turn === 'O' ? 'X' : 'O',
            });

        case CLICK_CELL: {
            const tableData = [...state.tableData];
            tableData[action.row] = [...tableData[action.row]];
            tableData[action.row][action.col] = state.turn;
            return ({
                ...state,
                tableData: tableData,
                recentCell: [action.row, action.col],
                clicked: state.clicked + 1,
            });
        }

        case RESET_GAME:
            return ({
                ...state,
                winner: '',
                turn: 'O',
                tableData: [
                    ['', '', ''],
                    ['', '', ''],
                    ['', '', ''],
                ],
                recentCell: [-1, -1],
                clicked: 0,
                halted: false,
                tie: false,
                redo: false,
            })
            
        default:
            return null;
    }
}

const TTT = () => {

    const [state, dispatch] = useReducer(reducer, initialState);
    const {tableData, winner, recentCell, clicked, halted, tie, redo} = state;
    
    useEffect(() => {
        const [row, col] = recentCell;
        if (row < 0){
            return;
        }
        let results = [];
        let win = true;
        const length = tableData.length;
        const value = tableData[row][col];
        for (let i = 0; i < length; i++) {
            if (value !== tableData[i][col]) {
                win = false;
                break;
            }
        }
        results.push(win);
        win = true;
        for (let i = 0; i < length; i++) {
            if (value !== tableData[row][i]) {
                win = false;
                break;
            }
        }
        results.push(win);
        win = true;
        let j = 0;
        for (let i = 0; i < length; i++) {
            if (value !== tableData[i][j++]) {
                win = false;
                break;
            }
        }
        results.push(win);
        win = true;
        j = length - 1;
        for (let i = 0; i < length; i++) {
            if (value !== tableData[i][j--]) {
                win = false;
                break;
            }
        }
        results.push(win);
        if (results.includes(true)) {
            dispatch({type: SET_WINNER});
        }
        else {
            if (length * length === clicked) {
                dispatch({type: SET_TIE});
            }
            else {
                dispatch({type: CHANGE_TURN});
            }
        }

    }, [recentCell]);

    const onClickRedo = useCallback(() => {
        dispatch({type: RESET_GAME});
    }, [redo]);

    return (
        <>
            <Table tableData={tableData} dispatch={dispatch} halted={halted}/>
            {winner && <p>{winner}님의 승리</p>}
            {tie && <p>무승부 입니다</p>}
            {redo && <button onClick={onClickRedo}>다시 시작</button>}
        </>
    );
};

export default TTT;
