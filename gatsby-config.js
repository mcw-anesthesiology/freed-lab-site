/** @format */
/* eslint-env node */

const postcssPresetEnv = require('postcss-preset-env');
const autoprefixer = require('autoprefixer');

module.exports = {
	siteMetadata: {
		title: `Gatsby Default Starter`,
		description: `Kick off your next, great Gatsby project with this default starter. This barebones starter ships with the main Gatsby configuration files you might need.`,
		author: `@gatsbyjs`
	},
	plugins: [
		`gatsby-plugin-react-helmet`,
		{
			resolve: `gatsby-source-filesystem`,
			options: {
				name: `images`,
				path: `${__dirname}/src/images`
			}
		},
		`gatsby-transformer-sharp`,
		`gatsby-plugin-sharp`,
		{
			resolve: `gatsby-plugin-manifest`,
			options: {
				name: `gatsby-starter-default`,
				short_name: `starter`,
				start_url: `/`,
				background_color: `#663399`,
				theme_color: `#663399`,
				display: `minimal-ui`
				// icon: `src/images/gatsby-icon.png` // This path is relative to the root of the site.
			}
		},
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
					}),
					autoprefixer()
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
			resolve: 'gatsby-plugin-copy-files',
			options: {
				source: `${__dirname}/src/images`,
				destination: '/images'
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
			resolve: 'gatsby-plugin-create-client-paths',
			options: {
				prefixes: [
					'/projects/*'
				]
			}
		},
		'gatsby-transformer-yaml',
		'add-team-html-bio'
	]
};
