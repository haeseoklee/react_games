import React, {useContext} from 'react';
import Td from './Td';
import { TableContext } from './MineSearch';

const Tr = ({currentRow}) => {
    const {tableData} = useContext(TableContext);
    return(
        <tr>
            {tableData[currentRow].map((v, i) => (<Td currentRow={currentRow} currentCol={i}/>) )}
        </tr>
    );
};


export default Tr;