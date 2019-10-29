/** @format */
/* eslint-env node */

const { GraphQLString } = require('gatsby/graphql');

const Remark = require('remark');
const html = require('remark-html');

const remark = new Remark()
	.use({
		settings: {
			commonmark: true,
			gfm: true
		}
	})
	.use(html);

function toHtml(markdown) {
	return new Promise((resolve, reject) => {
		remark.process(markdown, (err, file) => {
			if (err) {
				reject(err);
			}

			resolve(String(file));
		});
	});
}

exports.onCreateNode = async ({ node, actions }) => {
	if (node.internal.type === 'TeamYaml') {
		const image = node.image || 'placeholder.jpg';
		actions.createNodeField({
			node,
			name: 'image',
			value: `../images/team/${image}`
		});
	} else if (node.internal.type === 'MarkdownRemark') {
		if (node.frontmatter) {
			if (node.frontmatter.image) {
				actions.createNodeField({
					node,
					name: 'image',
					value: `../../${node.frontmatter.image}`
				});
			}
		}
	}
};

exports.setFieldsOnGraphQLNodeType = ({ type }) => {
	if (type.name === 'TeamYaml') {
		return new Promise(resolve => {
			return resolve({
				bioHtml: {
					type: GraphQLString,
					resolve(source) {
						return toHtml(source.bio);
					}
				}
			});
		});
	}
};
