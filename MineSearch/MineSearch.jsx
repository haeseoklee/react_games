import React, {useCallback, useMemo, useEffect, useReducer, createContext} from 'react';
import Table from './Table';
import Form from './Form';

export const START_GAME = 'START_GAME';
export const CLICK_CELL = 'CLICK_CELL';
export const GAME_OVER = 'GAME_OVER';

const DIRECTION = [[1, 0], [0, 1], [-1, 0], [0, -1], [1, 1], [-1, -1], [1, -1], [-1, 1]];

export const TableContext = createContext({
    tableData: [],
    halted: false,
    clicked: 0,
    dispatch: () => {},
})

export const CODE = {
    MINE: -7,
    NORMAL: -1,
    QUESTION: -2,
    FLAG: -3,
    QUESTION_MINE: -4,
    FLAG_MINE: -5,
    CLICKED_MINE: -6,
    OPENED: 0,
};

const initialState = {
    tableData: [],
    rowLength: 0,
    colLength: 0,
    numberOfMines: 0,
    halted: false,
    clicked: 0,
    result: false,
};

const plantMine2 = (row, col, mine) => {
    row = parseInt(row);
    col = parseInt(col);
    mine = parseInt(mine);
    let minePositions = new Set();
    let x, y;
    let tableData = Array(row).fill().map(() => Array(col).fill(CODE.NORMAL));
    
    while (minePositions.size < mine) {
        x = Math.floor(Math.random() * row);
        y = Math.floor(Math.random() * col);
        minePositions.add(x + ' ' + y);
    }
    for (let position of minePositions) {
        [x, y] = position.split(' ');
        x = parseInt(x);
        y = parseInt(y);
        tableData[x][y] = CODE.MINE;
    }
    return tableData;
}

const howManyMines = (row, col, rowLength, colLength, tableData) => {
    let inform = 0;
    DIRECTION.forEach(([i, j]) => {
        if (row + i < 0 || col + j < 0 || row + i >= rowLength || col + j >= colLength) {
            return false;
        }
        if (tableData[row + i][col + j] === CODE.MINE) {
            inform++;
        }
    })
    return inform;
}


const reducer = (state, action) => {
    switch (action.type) {
        case START_GAME:{
            const rowLength = parseInt(action.rowLength);
            const colLength = parseInt(action.colLength);
            const numberOfMines = parseInt(action.numberOfMines);
            return ({
                ...state,
                tableData: plantMine2(rowLength, colLength, numberOfMines),
                rowLength,
                colLength,
                numberOfMines,
                halted: false,
                result: false,
                clicked: 0,
            });
        }
            
        case CLICK_CELL: {
            const tableData = [...state.tableData];
            tableData[action.row] = [...tableData[action.row]];
            let value = tableData[action.row][action.col];
            let halted = false;
            let clicked = state.clicked;
            if (action.right) {
                if (value === CODE.NORMAL) {
                    value = CODE.FLAG;
                }
                else if (value === CODE.MINE) {
                    value = CODE.FLAG_MINE;
                }
                else if (value === CODE.FLAG) {
                    value = CODE.QUESTION;
                }
                else if (value === CODE.FLAG_MINE){
                    value = CODE.QUESTION_MINE;
                }
                else if (value === CODE.QUESTION) {
                    value = CODE.NORMAL;
                }
                else { // value === CODE.QUESTION_MINE
                    value = CODE.MINE;
                }
            }
            else {
                if (value === CODE.NORMAL) {
                    value = CODE.OPENED;
                    let stack = [[action.row, action.col]];
                    let check = new Set();
                    if (!check.has(action.row + ' ' + action.col)) {
                        check.add(action.row + ' ' + action.col);
                        clicked++;
                        value = howManyMines(action.row, action.col, state.rowLength, state.colLength, tableData);
                    }
                    while (stack.length) {
                        let [row, col] = stack.pop();
                        let able = true;
                        let candidates = [];
                        DIRECTION.forEach(([x, y]) => {
                            let newRow = row + x;
                            let newCol = col + y;
                            if (newRow < 0 || newCol < 0 || newRow >= state.rowLength || newCol >= state.colLength) {
                                return false;
                            }
                            if (tableData[newRow][newCol] === CODE.MINE) {
                                able = false;
                            }
                            else {
                                candidates.push([newRow, newCol]);
                            }
                        });
                        if (able) {
                            candidates.forEach(([x, y]) => {
                                let position = x + ' ' + y;
                                if (!check.has(position) && tableData[x][y] === CODE.NORMAL){
                                    tableData[x][y] = howManyMines(x, y, state.rowLength, state.colLength, tableData);;
                                    clicked++;
                                    stack.push([x, y]);
                                    check.add(position);
                                }
                            })
                            
                        }
                    }
                }
                else {
                    if (value === CODE.MINE || CODE.FLAG_MINE) {
                        value = CODE.CLICKED_MINE;
                        halted = true;
                    }
                    else {
                        value = CODE.OPENED;
                    }
                }
            }
            tableData[action.row][action.col] = value;
            return ({
                ...state,
                tableData,
                halted: halted,
                clicked: clicked,
            });
        }
        
        case GAME_OVER: {
            const tableData = [...state.tableData];
            tableData.forEach((row, i) => {
                tableData[i] = [...tableData[i]];
                tableData[i].forEach((col, j) => {
                    if (tableData[i][j] === CODE.MINE) {
                        tableData[i][j] = CODE.CLICKED_MINE;
                    }
                });
            });
            let message = '게임종료';
            if (action.finished) {
                message = '🎉축하합니다🎉';
            }
            console.log(message);
            return ({
                ...state,
                tableData,
                result: message,
            });
        }
        default:
            return null;
    }
}

const MineSearch = () => {

    const [state, dispatch] = useReducer(reducer, initialState);
    const { tableData, result, halted, clicked, rowLength, colLength, numberOfMines} = state;
    const value = useMemo(() => ({ tableData, dispatch, halted }), [tableData]);
    let timer = null;
    
    useEffect(() => {
        if (!rowLength || !colLength) {
            return;
        }
        if (rowLength * colLength === numberOfMines + clicked) {
            dispatch({type: GAME_OVER, finished: true});
        }
        else if (halted) {
            dispatch({type: GAME_OVER, finished: false});
        }
    }, [clicked, halted]);


    return (
        <TableContext.Provider value={value}>
            <Form></Form>
            <div>{timer}</div>
            <Table></Table>
            <div>{result && <p>{result}</p>}</div>
        </TableContext.Provider>
    );
};

export default MineSearch;