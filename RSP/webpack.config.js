const path = require('path');
const webpack = require('webpack');

module.exports = {
	name: 'RSP',
	mode: 'development',
	devtool: 'eval',
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
					['@babel/preset-env', {
						targets: {
							browsers: ['> 10% in KR']
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