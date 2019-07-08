/** @format */

import React, { Fragment } from 'react';
import { graphql, Link } from 'gatsby';
import Image from 'gatsby-image';

import Layout from '../components/Layout.js';

import '../styles/projects.css';

export default function Projects({ data }) {
	const projects = data.projects.edges.map(e => e.node);

	return (
		<Layout title="Projects">
			<ProjectsList projects={projects} />
		</Layout>
	);
}

export function ProjectsList({ projects }) {
	return (
		<section className="projects-list">
			{projects.map((project, index) => (
				<Fragment key={project.id}>
					<ProjectListItem
						slug={project.fields.slug}
						image={project.fields.image?.childImageSharp?.fixed}
						title={project.frontmatter.title}
						html={project.html}
					/>
					{index < projects.length - 1 && <hr />}
				</Fragment>
			))}
		</section>
	);
}

export function ProjectListItem({ title, slug, html, image }) {
	return (
		<article className="project-list-item">
			<h3>
				<Link to={slug}>{title}</Link>
			</h3>
			{image && <Image fixed={image} alt="" />}
			<div dangerouslySetInnerHTML={{ __html: html }} />
		</article>
	);
}

export const query = graphql`
	query {
		projects: allMarkdownRemark(
			filter: { fileAbsolutePath: { regex: "/data/projects/" } }
			sort: { fields: [frontmatter___order], order: ASC }
		) {
			edges {
				node {
					id
					fields {
						slug
					}
					frontmatter {
						title
					}
					fields {
						image {
							childImageSharp {
								fixed(width: 150, height: 150, quality: 95) {
									...GatsbyImageSharpFixed
								}
							}
						}
					}
					html
				}
			}
		}
	}
`;
