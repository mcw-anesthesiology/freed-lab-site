/* eslint-env node */

module.exports = {
	presets: [
		['@babel/env', {
			targets: {
				browsers: [
					'> 1%'
				]
			}
		}]
	],
	plugins: [
		'@babel/plugin-syntax-dynamic-import'
	]
};
