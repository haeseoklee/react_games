import React, {useCallback} from 'react';
import { CLICK_CELL } from './TTT';

const Td = ({tableData, currentRow, currentCol, dispatch, halted}) => {

    const onClickTd = useCallback(() => {
        if (tableData[currentRow][currentCol] || halted){
            return;
        }
        dispatch({type: CLICK_CELL, row: currentRow, col: currentCol});
    }, [tableData[currentRow][currentCol], halted]);

    return(
        <td onClick={onClickTd}>{tableData[currentRow][currentCol]}</td>
    );
};


export default Td;