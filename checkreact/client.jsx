const {hot} = require('react-hot-loader/root');
const React = require('react');
const ReactDOM = require('react-dom');
const CheckReact = require('./CheckReactHooks');
const Hot = hot(CheckReact);

ReactDOM.render(<Hot/>, document.querySelector('#root'));
