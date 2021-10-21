/** @format */
/* eslint-env node */

const postcssPresetEnv = require('postcss-preset-env');
// const autoprefixer = require('autoprefixer');

module.exports = {
	siteMetadata: {
		title: 'Freed Lab',
		description:
			"The informational site for Dr. Julie Freed's Research Lab",
		author: 'Jacob Mischka <jmischka@mcw.edu>',
		contactUsers: [
			{
				name: 'Mary Schulz',
				email: 'maschulz@mcw.edu',
				phone: '414-955-5854'
			}
		],
		twitter: 'labfreed',
		departmentWebsite: 'https://www.mcw.edu/anesthesiology',
		mailingAddress: '8701 W. Watertown Plank Road, Milwaukee, WI',
		copyright: 'MCW Department of Anesthesiology'
	},
	plugins: [
		'gatsby-plugin-react-helmet',
		{
			resolve: 'gatsby-source-filesystem',
			options: {
				name: 'images',
				path: `${__dirname}/src/images`
			}
		},
		'gatsby-transformer-sharp',
		'gatsby-plugin-sharp',
		// {
		// 	resolve: `gatsby-plugin-manifest`,
		// 	options: {
		// 		name: 'Freed lab',
		// 		short_name: 'Freed lab',
		// 		start_url: '/',
		// 		background_color: '#EB6990',
		// 		theme_color: '#EB6990',
		// 		display: 'minimal-ui'
		// 	}
		// },
		// this (optional) plugin enables Progressive Web App + Offline functionality
		// To learn more, visit: https://gatsby.app/offline
		// 'gatsby-plugin-offline',
		{
			resolve: 'gatsby-plugin-postcss',
			options: {
				postCssPlugins: [
					postcssPresetEnv({
						stage: 2,
						features: {
							'nesting-rules': true
						}
					})
					// autoprefixer()
				]
			}
		},
		{
			resolve: 'gatsby-source-filesystem',
			options: {
				path: './src/data'
			}
		},
		{
			resolve: 'gatsby-transformer-remark',
			options: {
				plugins: [
					{
						resolve: 'gatsby-remark-images',
						options: {
							maxWidth: 500
						}
					}
				]
			}
		},
		{
			resolve: 'gatsby-plugin-react-svg',
			options: {
				rule: {
					include: /icons/,
					omitKeys: [
						'xmlns\\w+',
						'inkscape\\w+',
						'fitMargin\\w+',
						'rdf\\w+',
						'sodipodiDocname',
						'bottomLeftOrigin'
					]
				}
			}
		},
		'gatsby-transformer-yaml',
		'add-team-html-bio'
	]
};
