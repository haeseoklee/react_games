import React from 'react';
import Td from './Td';

const Tr = ({tableData, currentRow, dispatch, halted}) => {
    return(
        <tr>
            {tableData[currentRow].map((v, i) => {
                return (
                    <Td tableData={tableData} currentRow={currentRow} currentCol={i} dispatch={dispatch} halted={halted}/>
                );
            })}
        </tr>
    );
};


export default Tr;