const React = require('react');
// const {Component} = React;


class WordRelay extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            text : "hello world!!",
        };
    }
    render() {
        return <h1>{this.state.text}</h1>;
    }
}

module.exports = WordRelay;