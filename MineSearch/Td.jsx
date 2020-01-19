import React, { useCallback, useContext } from 'react';
import { CLICK_CELL, TableContext, CODE } from './MineSearch';

const getTdStyle = (code) => {
    switch (code) {
      case CODE.NORMAL:
      case CODE.MINE:
        return '#222';
      case CODE.CLICKED_MINE:
      case CODE.OPENED:
        return 'white';
      case CODE.QUESTION_MINE:
      case CODE.QUESTION:
        return 'yellow';
      case CODE.FLAG_MINE:
      case CODE.FLAG:
        return 'red';
      default:
        return 'white';
    }
};

const getTdText = (code) => {
    switch (code) {
      case CODE.NORMAL:
        return '';
      case CODE.MINE:
        return '💣';
      case CODE.CLICKED_MINE:
        return '💥';
      case CODE.FLAG_MINE:
      case CODE.FLAG:
        return '🚩';
      case CODE.QUESTION_MINE:
      case CODE.QUESTION:
        return '❔';
      default:
        return code || '';
    }
  };



const Td = ({currentRow, currentCol}) => {

    const { tableData, dispatch, halted } = useContext(TableContext);
    const value = tableData[currentRow][currentCol];

    const onClickTd = useCallback(() => {
        if (value === CODE.OPENED || halted){
            return;
        }
        dispatch({type: CLICK_CELL, row: currentRow, col: currentCol, right: false});
    }, [value, halted]);

    const onClickContextMenu = useCallback((e) => {
        e.preventDefault();
        if (halted) {
            return;
        }
        dispatch({type: CLICK_CELL, row: currentRow, col: currentCol, right: true});
    }, [value, halted]);

    return(
        <td 
        onClick={onClickTd} 
        onContextMenu = {onClickContextMenu}
        style={{background: getTdStyle(value)}}
        >
        {getTdText(value)}
        </td>
    );
};


export default Td;