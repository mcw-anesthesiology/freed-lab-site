/** @format */

import React, { useCallback } from 'react';
import { graphql, Link } from 'gatsby';

import Layout from '../components/Layout.js';
import ImagesList from '../components/ImagesList.js';

import '../styles/project.css';

export default function Project({ data }) {
	const images = data.allFile.edges.map(e => e.node);
	const project = data.allMarkdownRemark.edges[0].node;

	const getAlt = useCallback(
		node => {
			const obj = project.frontmatter.images.find(o =>
				node.relativePath.includes(o.src)
			);

			if (obj) {
				return obj.alt;
			}
		},
		[project]
	);

	return (
		<Layout
			className="project"
			title={project.frontmatter.title}
			heroImage={project.fields.image.childImageSharp.fluid}
		>
			<div dangerouslySetInnerHTML={{ __html: project.html }} />

			{images && images.length > 0 && (
				<ImagesList images={images} getAlt={getAlt} />
			)}

			<div className="back-container">
				<Link to="/#projects" className="button comfy">
					Back to projects
				</Link>
			</div>
		</Layout>
	);
}

export const query = graphql`
	query ProjectQuery($id: String, $imageGlob: String) {
		allFile(filter: { relativePath: { glob: $imageGlob } }) {
			edges {
				node {
					id
					relativePath
					...HeroImage
				}
			}
		}
		allMarkdownRemark(filter: { id: { eq: $id } }) {
			edges {
				node {
					frontmatter {
						title
						images {
							src
							alt
						}
					}
					fields {
						image {
							...HeroImage
						}
					}
					html
					excerpt
				}
			}
		}
	}
`;
