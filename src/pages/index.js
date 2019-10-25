/** @format */

import React from 'react';
import { graphql } from 'gatsby';

import Layout from '../components/Layout.js';
import SEO from '../components/SEO.js';

import About from '../components/About.js';
import Projects from '../components/Projects.js';
import Team from '../components/Team.js';
import Contact from '../components/Contact.js';

import '../styles/home.css';

export default function IndexPage({ data }) {
	return (
		<Layout
			className="home"
			heroImage={data.heroImage.childImageSharp.fluid}
			headerContent={
				<img
					className="mcw-logo"
					src="/images/icons/mcw-logo-big-white.png"
					alt="MCW - knowledge changing life"
				/>
			}
		>
			<SEO title="Home" keywords={['Freed', 'Lab']} />

			<About />
			<Projects />
			<Team />
			<Contact />
		</Layout>
	);
}

export const query = graphql`
	query IndexQuery {
		site {
			siteMetadata {
				title
			}
		}
		heroImage: file(relativePath: { eq: "hero/freed-and-schulz.jpg" }) {
			childImageSharp {
				fluid(maxWidth: 1920) {
					...GatsbyImageSharpFluid
				}
			}
		}
	}
`;
