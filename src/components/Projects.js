/** @format */

import React from 'react';
import { useStaticQuery, graphql, Link } from 'gatsby';

import Hero from './Hero.js';

import '../styles/projects.css';

export default function Projects() {
	const data = useStaticQuery(graphql`
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
							image {
								childImageSharp {
									fluid(cropFocus: CENTER, grayscale: true) {
										...GatsbyImageSharpFluid
									}
								}
							}
						}
						frontmatter {
							title
							image
							imageStyles {
								objectPosition
							}
						}
					}
				}
			}
		}
	`);

	const projects = data.projects.edges.map(e => e.node);

	return (
		<section id="projects">
			<header>
				<h2>Projects</h2>
				<p>Words</p>
			</header>
			<ProjectsList projects={projects} />
		</section>
	);
}

export function ProjectsList({ projects }) {
	return (
		<ul className="projects-list">
			{projects.map(project => (
				<ProjectListItem
					key={project.id}
					html={project.html}
					{...project.frontmatter}
					{...project.fields}
				/>
			))}
		</ul>
	);
}

const IMAGE_STYLE_DEFAULTS = {
	objectPosition: 'center',
	objectFit: 'cover'
};

export function ProjectListItem({ title, slug, image, imageStyles }) {
	if (!imageStyles) {
		imageStyles = {};
	}

	for (const [prop, val] of Object.entries(IMAGE_STYLE_DEFAULTS)) {
		if (!imageStyles[prop]) {
			imageStyles[prop] = val;
		}
	}

	return (
		<li className="project-list-item">
			<Hero fluid={image.childImageSharp.fluid} imgStyle={imageStyles}>
				<Link to={slug}>
					<span>{title}</span>
				</Link>
			</Hero>
		</li>
	);
}
