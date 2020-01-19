const {hot} = require('react-hot-loader/root');
const React = require('react');
const ReactDOM = require('react-dom');
const WordRelay = require('./WordRelay');
const Hot = hot(WordRelay); // 자동으로 react를 컴파일하기 위한 설정(hot loader)

ReactDOM.render(<Hot/>, document.querySelector('#root'));
