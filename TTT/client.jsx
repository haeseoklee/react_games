import React from 'react';
import ReactDOM from 'react-dom';
import { hot } from 'react-hot-loader/root';
import TTT from './TTT';

const Hot = hot(TTT);

ReactDOM.render(<Hot/>, document.querySelector('#root'));
