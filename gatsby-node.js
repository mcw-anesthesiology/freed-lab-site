/** @format */
/* eslint-env node */

const path = require('path');
const { createFilePath } = require(`gatsby-source-filesystem`);

exports.onCreateNode = ({ node, getNode, actions }) => {
	const { createNodeField } = actions;
	if (node.internal.type === `MarkdownRemark`) {
		const slug = createFilePath({ node, getNode, basePath: 'projects' });
		createNodeField({ node, name: 'slug', value: `/projects${slug}` });
	}
};

exports.createPages = async ({ graphql, actions }) => {
	const { createPage } = actions;

	const result = await graphql(`
		{
			allMarkdownRemark {
				edges {
					node {
						id
						fields {
							slug
						}
					}
				}
			}
		}
	`);

	for (const { node: project } of result.data.allMarkdownRemark.edges) {
		createPage({
			path: project.fields.slug,
			component: path.resolve('./src/templates/project.js'),
			context: {
				id: project.id
			}
		});
	}
};
