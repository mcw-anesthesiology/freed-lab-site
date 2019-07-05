/** @format */

import React from 'react';
import { graphql } from 'gatsby';

import Layout from '../components/Layout.js';

import '../styles/projects.css';

export default function Project({ data }) {
	const project = data.allMarkdownRemark.edges[0].node;

	return (
		<Layout title={project.frontmatter.title}>
			<div dangerouslySetInnerHTML={{ __html: project.html }} />
		</Layout>
	);
}

export const query = graphql`
	query ProjectQuery($id: String) {
		allMarkdownRemark(filter: { id: { eq: $id } }) {
			edges {
				node {
					frontmatter {
						title
						image
						order
					}
					html
					excerpt
				}
			}
		}
	}
`;
