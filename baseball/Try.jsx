const React = require('react');

class Try extends React.PureComponent {

    // 함수로 한번 감싸주면 더 정밀한 코딩을 할수 있다.
    // props 를 constructor로 받는 예제 
    constructor(props){
        super(props);
        this.state = {
            res: this.props.value.res,
            try: this.props.value.try,
        };
    }
    // props를 바꾸길 원하면 props를 물려준 부모 컴포넌트에서 바꾼다
    // 정 바꾸길 원하면 props를 state로 만든후 그 state를 바꾼다
    // state = {
    //    result: this.props.result,
    //    try: this.props.try,
    // }
    render(){
        // distructuring 으로 코드길이를 줄여보자!
        // const {v} = this.props;
        return (
            <li>{this.state.try.join('') + '은 ' + this.state.res} </li>
        );
    }
}

module.exports = Try;