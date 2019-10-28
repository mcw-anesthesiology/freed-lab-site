/** @format */

import React from 'react';
import { useStaticQuery, graphql, Link } from 'gatsby';

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
						}
						frontmatter {
							title
							image
						}
					}
				}
			}
		}
	`);

	const projects = data.projects.edges.map(e => e.node);

	return (
		<section className="projects">
			<section>
				<h2>Projects</h2>
				<p>Words</p>
			</section>
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
					slug={project.fields.slug}
					image={project.frontmatter.image}
					title={project.frontmatter.title}
					html={project.html}
				/>
			))}
		</ul>
	);
}

export function ProjectListItem({ title, slug, image }) {
	return (
		<li className="project-list-item" style={{ backgroundImage: `url(${image})` }}>
			<Link to={slug}>
				<span>
					{title}
				</span>
			</Link>
		</li>
	);
}
