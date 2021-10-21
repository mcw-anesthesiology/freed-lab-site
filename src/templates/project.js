/** @format */

import React, { useCallback } from 'react';
import { graphql, Link } from 'gatsby';
import Image from 'gatsby-image';

import Layout from '../components/Layout.js';
import ImagesList from '../components/ImagesList.js';

import '../styles/project.css';

export default function Project({ data }) {
	const images = data.allFile.edges.map((e) => e.node);
	const project = data.allMarkdownRemark.edges[0].node;

	const getMeta = useCallback(
		(node) =>
			project.frontmatter.images.find((o) =>
				node.relativePath.includes(o.src)
			),
		[project]
	);

	return (
		<Layout
			className="project"
			title={project.frontmatter.title}
			heroImage={project.fields.image.childImageSharp.fluid}
			backNav={
				<nav>
					<Link to="/#projects">Back to projects</Link>
				</nav>
			}
		>
			<article>
				{(project.frontmatter.lead ||
					project.frontmatter.leadImage) && (
					<div className="lead">
						{project.frontmatter.leadImage && (
							<Image
								fluid={
									project.fields.leadImage.childImageSharp
										.fluid
								}
								alt={project.frontmatter.leadImageAlt}
							/>
						)}
						{project.frontmatter.lead && (
							<p>{project.frontmatter.lead}</p>
						)}
					</div>
				)}

				<div dangerouslySetInnerHTML={{ __html: project.html }} />
			</article>

			{images && images.length > 0 && (
				<ImagesList images={images} getMeta={getMeta} />
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
							caption
						}
						lead
						# leadImage
						# leadImageAlt
					}
					fields {
						image {
							...HeroImage
						}
						# leadImage {
						#	...HeroImage
						# }
					}
					html
					excerpt
				}
			}
		}
	}
`;
