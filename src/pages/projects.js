/** @format */

import React from 'react';
import { graphql, Link } from 'gatsby';

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
		<div>
			<ul className="projects-list">
				{projects.map(project => (
					<ProjectListItem
						key={project.id}
						slug={project.fields.slug}
						image={project.frontmatter.image}
						title={project.frontmatter.title}
						excerpt={project.excerpt}
					/>
				))}
			</ul>
		</div>
	);
}

export function ProjectListItem({ title, slug, excerpt, image }) {
	return (
		<li className="project-list-item">
			<Link to={slug}>
				<h3>{title}</h3>
				<img src={image} alt="" />
				<div dangerouslySetInnerHTML={{ __html: excerpt }} />
			</Link>
		</li>
	);
}

export function Project({ slug, projects }) {
	const project = projects.find(p => p.fields.slug.includes(slug));

	return (
		<div>
			<h1>{project.frontmatter.title}</h1>
			<div dangerouslySetInnerHTML={{ __html: project.html }} />
		</div>
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
