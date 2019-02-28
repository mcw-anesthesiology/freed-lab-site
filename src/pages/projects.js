/** @format */

import React from 'react';
import { Router, Link } from '@reach/router';
import { graphql } from 'gatsby';

import Layout from '../components/Layout.js';

import '../styles/projects.css';

export default function Projects({ data }) {
	const projects = data.allMarkdownRemark.edges.map(e => e.node);

	return (
		<Layout>
			<Router basepath="projects">
				<ProjectsList path="/" projects={projects} />
				<Project path="/:slug" projects={projects} />
			</Router>
		</Layout>
	);
}

export function ProjectsList({ projects }) {
	return (
		<div>
			<h1>Projects</h1>

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
		allMarkdownRemark(
			filter: { fileAbsolutePath: { regex: "/data/projects/" } }
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
					html
					excerpt
				}
			}
		}
	}
`;
