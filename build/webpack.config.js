const fs = require('fs');
const path = require('path');

const webpack = require('webpack');
/** @type {import('svelte-preprocess').default} */
const sveltePreprocess = require('svelte-preprocess');
// eslint-disable-next-line @typescript-eslint/naming-convention
const TerserPlugin = require('terser-webpack-plugin');

const packageJson = require('../package.json');

const LIBRARY_NAME = packageJson.name;
const LIBRARY_FILENAME = `${LIBRARY_NAME}`;
const LIBRARY_VERSION = `${packageJson.version}`;
const AUTHOR = packageJson.author;

const sourceRootDir = path.resolve(__dirname, '../src');
const mainRootPath = path.resolve(sourceRootDir, './main');
// const commonRootPath = path.resolve(sourceRootDir, './common');

const moduleExtensions = ['.tsx', '.ts', '.mjs', '.js', '.svelte'];

const headerTextTemplate = fs.readFileSync(
	path.resolve(__dirname, '../src/banner/header.txt'),
	'utf8'
);
const preparedHeaderText = prependHeaderTextImpl(
	LIBRARY_NAME,
	AUTHOR,
	LIBRARY_VERSION
);

/**
 * @param {number|string} num numeric data
 * @param {number} length minimum length
 * @return {string} converted string
 */
function toNumberStringWithZero(num, length) {
	num = num.toString();
	length -= num.length;
	if (length > 0) num = Array(length + 1).join('0') + num;
	return num;
}

function prependHeaderTextImpl(name, author, version) {
	const date = new Date();
	return headerTextTemplate
		.replace('[name]', name)
		.replace('[author]', author)
		.replace('[version]', version || '')
		.replace('[year4]', toNumberStringWithZero(date.getFullYear(), 4))
		.replace(
			'[date]',
			toNumberStringWithZero(date.getFullYear(), 4) +
				'-' +
				toNumberStringWithZero(date.getMonth() + 1, 2) +
				'-' +
				toNumberStringWithZero(date.getDate(), 2)
		);
}

// function existsModule(name, extensions) {
// 	return (
// 		fs.existsSync(name) ||
// 		extensions.some((ext) => {
// 			return fs.existsSync(name + ext);
// 		})
// 	);
// }

module.exports = (env) => {
	const isMinified = !!(env && env.minified);
	const suffix = isMinified ? '.min' : '';

	const webpackConfBase = {
		mode: isMinified ? 'production' : 'development',
		devtool: isMinified ? 'hidden-source-map' : 'source-map',
		module: {
			rules: [
				{
					test: /\.tsx?$/,
					use: [
						{
							loader: 'ts-loader',
							options: {
								compilerOptions: {
									declaration: false,
								},
							},
						},
					],
				},
				{
					test: /\.(html|svelte)$/,
					use: {
						loader: 'svelte-loader',
						options: {
							dev: !isMinified,
							preprocess: sveltePreprocess({
								typescript: {
									tsconfigFile: path.resolve(
										__dirname,
										'..',
										'tsconfig.app.json'
									),
								},
							}),
						},
					},
				},
				{
					// required to prevent errors from Svelte on Webpack 5+, omit on Webpack 4
					test: /node_modules\/svelte\/.*\.mjs$/,
					resolve: {
						fullySpecified: false,
					},
				},
			],
		},
		node: false,
		optimization: {
			concatenateModules: true,
			moduleIds: 'natural',
			minimizer: isMinified
				? [
						new TerserPlugin({
							extractComments: false,
							terserOptions: {
								ecma: 2017,
								compress: {
									passes: 2,
								},
							},
						}),
				  ]
				: [],
		},
		plugins: [
			new webpack.BannerPlugin({
				banner: preparedHeaderText,
				raw: true,
			}),
			new webpack.DefinePlugin({
				LIBRARY_VERSION: JSON.stringify(LIBRARY_VERSION),
			}),
		],
	};

	return [
		Object.assign(
			{
				entry: {
					[LIBRARY_FILENAME]: path.resolve(mainRootPath, 'index.ts'),
				},
				externals: {
					// 'js-synthesizer': {
					// 	commonjs: 'js-synthesizer',
					// 	commonjs2: 'js-synthesizer',
					// 	amd: 'js-synthesizer',
					// 	root: 'JSSynth',
					// },
					// 'js-sequencer': {
					// 	commonjs: 'js-sequencer',
					// 	commonjs2: 'js-sequencer',
					// 	amd: 'js-sequencer',
					// 	root: 'JSSeq',
					// },
					// 'js-synthesizer': 'root JSSynth',
					'js-sequencer': 'root JSSeq',
				},
				output: {
					path: path.resolve(__dirname, '../dist'),
					filename: `[name]${suffix}.js`,
					// libraryTarget: 'umd',
					// library: {
					// 	root: LIBRARY_NAMESPACE,
					// 	amd: LIBRARY_NAMESPACE,
					// 	commonjs: LIBRARY_NAME,
					// },
					// globalObject: 'this',
				},
				resolve: {
					extensions: moduleExtensions,
					modules: [
						path.resolve(__dirname, '..', 'reference'),
						'node_modules',
					],
					alias: {
						svelte: path.resolve('node_modules', 'svelte'),
					},
					mainFields: ['svelte', 'browser', 'module', 'main'],
				},
			},
			webpackConfBase
		),
	];
};
