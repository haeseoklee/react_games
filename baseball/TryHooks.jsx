const React = require('react');
// memo로 state 변화가 없을 때 업데이트 되는 것을 막아서 필요없는 랜더링을 줄인다 즉, 최적화 작업이다.
// class 기반은 PureComponent Hooks 기반은 memo
const Try = React.memo(({v}) =>  {
    return (
        <li>{v.try + '은 ' + v.res} </li>
    );
});

module.exports = Try;