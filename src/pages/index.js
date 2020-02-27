/** @format */

import React, { Fragment } from 'react';
import { graphql, Link } from 'gatsby';
import Image from 'gatsby-image';

import Layout from '../components/Layout.js';
import Hero from '../components/Hero.js';
import Header from '../components/Header.js';

import About from '../components/About.js';
import Projects from '../components/Projects.js';
import Team from '../components/Team.js';
import Contact from '../components/Contact.js';

import '../styles/home.css';

export default function IndexPage({ data }) {
	return (
		<Layout
			title={data.site.siteMetadata.title}
			className="home"
			hero={
				<Hero
					fluid={data.heroImage.childImageSharp.fluid}
					imgStyle={{
						objectPosition: 'left top'
					}}
				>
					<Fragment>
						<Image
							className="mcw-logo"
							fixed={data.mcwLogo.childImageSharp.fixed}
							alt="MCW - knowledge changing life"
						/>
						<Header>
							<h1>{data.site.siteMetadata.title}</h1>
							<nav>
								<ul>
									<li>
										<a href="#">Home</a>
									</li>
									<li>
										<a href="#projects">Projects</a>
									</li>
									<li>
										<a href="#team">Team</a>
									</li>
									<li>
										<a href="#contact">Contact</a>
									</li>
								</ul>
							</nav>
						</Header>
					</Fragment>
				</Hero>
			}
		>
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
		mcwLogo: file(relativePath: { eq: "icons/mcw-logo-big-white.png" }) {
			childImageSharp {
				fixed(height: 100) {
					...GatsbyImageSharpFixed
				}
			}
		}
		heroImage: file(relativePath: { eq: "hero/heart-cropped.jpg" }) {
			childImageSharp {
				fluid(maxWidth: 1920, quality: 90, cropFocus: NORTHWEST) {
					...GatsbyImageSharpFluid
				}
			}
		}
	}
`;
