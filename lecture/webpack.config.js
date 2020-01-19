const path = require('path');

module.exports = {
    name: 'word-relays-etting',
    mode: 'development', //실서비스 : production
    devtool: 'eval',
    resolve: {
        extensions: ['.js', '.jsx']
    }, // entry 에서 app을 적을때 일일이 파일 확장자를 적어주지 않아도 된다.

    entry: {
        app: ['./client'], //./client.jsx에서 불러오고 있으면 중복해서 불러오지 않아도 된다.
    }, //입력

    module: {
        rules: [{
            test: /\.jsx?/,
            loader: 'babel-loader',
            options: {
                presets: ['@babel/preset-env', '@babel/preset-react'],
            },
        }],
    }, //  module에서는 웹팩으로 설치한 모듈과 연결 
       // (입력)으로 모은 파일을 (모듈)을 통해서 변환한 다음 (출력)으로 결과코드를 생성

    output: {
        path: path.join(__dirname, 'dist'), 
        filename: 'app.js',
    }, //출력

    // 결론 : 웹팩이란 수십, 수백개로 쪼개진 자바스크립트 파일을 한번에 합쳐주는 도구이다.
}