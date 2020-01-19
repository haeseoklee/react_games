/* 
const {hot} = require('react-hot-loader/root');
const React = require('react');
const ReactDOM = require('react-dom');
const RSP = require('./RSP');
const Hot = hot(RSP); 
 */

import React from 'react';
import ReactDOM from 'react-dom';
import { hot } from 'react-hot-loader/root';
import RSP from './RSP.jsx';

const Hot = hot(RSP);

ReactDOM.render(<Hot/>, document.querySelector('#root'));
