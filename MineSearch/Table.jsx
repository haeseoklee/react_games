import React, {useContext} from 'react';
import Tr from './Tr';
import { TableContext } from './MineSearch';

const Table = () => {
    const {tableData} = useContext(TableContext);
    return(
        <table>
            {tableData.map((v, i) => (<Tr currentRow={i}/>) )}
        </table>
    );
};

export default Table;