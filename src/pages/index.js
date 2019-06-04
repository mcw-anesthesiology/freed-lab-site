/** @format */

import React from 'react';
import { Link, graphql } from 'gatsby';

import Layout from '../components/Layout.js';
import SEO from '../components/SEO.js';

import ContactIcon from '../images/icons/contact.svg';
import GoalsIcon from '../images/icons/goals.svg';
import ProjectsIcon from '../images/icons/projects.svg';
import TeamIcon from '../images/icons/team.svg';

import '../styles/home.css';

export default function IndexPage({ data }) {
	return (
		<Layout className="home" hero={data.heroImage.childImageSharp.fluid}>
			<SEO title="Home" keywords={['Freed', 'Lab']} />
			<h1>Home</h1>
			<section>
				<nav>
					<ul>
						<li>
							<Link to="/goals">
								<GoalsIcon />
								Goals
							</Link>
						</li>
						<li>
							<Link to="/projects">
								<ProjectsIcon />
								Projects
							</Link>
						</li>
						<li>
							<Link to="/team">
								<TeamIcon />
								Team
							</Link>
						</li>
						<li>
							<Link to="/contact">
								<ContactIcon />
								Contact
							</Link>
						</li>
					</ul>
				</nav>
			</section>
		</Layout>
	);
}

export const query = graphql`
	query IndexQuery {
		heroImage: file(relativePath: { eq: "hero/freed-and-schulz.jpg" }) {
			childImageSharp {
				fluid(maxWidth: 1920) {
					...GatsbyImageSharpFluid
				}
			}
		}
	}
`;
