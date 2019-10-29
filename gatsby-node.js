/** @format */
/* eslint-env node */

const path = require('path');
const { createFilePath } = require(`gatsby-source-filesystem`);

exports.onCreateNode = ({ node, getNode, actions }) => {
	const { createNodeField } = actions;
	if (node.internal.type === `MarkdownRemark`) {
		const slug = createFilePath({ node, getNode, basePath: 'projects' });
		const fullSlug = `/projects${slug}`;
		createNodeField({ node, name: 'slug', value: fullSlug });
		createNodeField({
			node,
			name: 'imageGlob',
			value: `projects${slug}*`
		});
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
							imageGlob
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
				id: project.id,
				imageGlob: project.fields.imageGlob
			}
		});
	}
};
