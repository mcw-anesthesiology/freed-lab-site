/** @format */

import React from 'react';
import { Link, graphql } from 'gatsby';

import Layout from '../components/Layout.js';
import SEO from '../components/SEO.js';

import ContactIcon from '../images/icons/contact.svg';
import ProjectsIcon from '../images/icons/projects.svg';
import TeamIcon from '../images/icons/team.svg';

import '../styles/home.css';

export default function IndexPage({ data }) {
	return (
		<Layout
			className="home"
			hero={data.heroImage.childImageSharp.fluid}
			title="Home"
		>
			<SEO title="Home" keywords={['Freed', 'Lab']} />
			<section>
				<p>
					Cardiovascular disease is the leading cause of death in the
					world. The microvasculature, which is consists of the small,
					peripheral blood vessels, is responsible for orchestrating
					adjustments in vascular tone to match local tissue perfusion
					with oxygen demand. Microvascular dysfunction precedes and
					is predictive of cardiovascular disease. Therefore, thorough
					understanding of the microvasculature is important in
					preventing and treating cardiovascular disease.
				</p>
				<nav>
					<ul>
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
