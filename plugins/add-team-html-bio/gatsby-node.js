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
