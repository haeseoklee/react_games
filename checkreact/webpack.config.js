const path = require('path');
const webpack = require('webpack');

module.exports = {
	name: 'checkreact',
	mode: 'development',
	devtool: 'eval',  // 배포시에는 hidden-source-map
	resolve: {
		extensions: ['.js', '.jsx'],
	},
	entry: {
		app: ['./client'],
	},
	module: {
		rules: [{
			test: /\.jsx?/,
			loader: 'babel-loader',
			options: {
				presets: [
					['@babel/preset-env', {  // 플러그인들의 모임이 preset-env
						targets: {
							browsers: ['> 10% in KR'] // browserslist에서 옵션 확인가능
						}
					}],
					'@babel/preset-react',
				],
				plugins: ['react-hot-loader/babel', '@babel/plugin-proposal-class-properties']
			}
		}]
	},
	plugins: [
		new webpack.LoaderOptionsPlugin({debug: true}),
	],
	output: {
		path: path.join(__dirname, 'src'),
		filename: 'app.js',
	},
}