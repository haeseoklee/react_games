import React from 'react';
import Tr from './Tr';

const Table = ({tableData, dispatch, halted}) => {
    return(
        <table>
            {tableData.map((v, i) => {
                return(
                    <Tr tableData={tableData} currentRow={i} dispatch={dispatch} halted={halted}/>
                );
            })}
        </table>
    );
};

export default Table;