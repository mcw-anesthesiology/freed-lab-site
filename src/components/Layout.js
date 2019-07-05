/** @format */

import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import 'normalize.css';
import 'typeface-source-sans-pro';
import 'typeface-open-sans';
import '../styles/global.css';

import Header from './Header.js';
import Footer from './Footer.js';
import Hero from './Hero.js';

export default function Layout({ className, hero, title, children }) {
	const data = useStaticQuery(graphql`
		query SiteTitleQuery {
			site {
				siteMetadata {
					title
				}
			}
			heroImage: file(relativePath: { eq: "hero/freed-and-schulz.jpg" }) {
				...HeroImage
			}
		}

		fragment HeroImage on File {
			childImageSharp {
				fluid(maxWidth: 1920) {
					...GatsbyImageSharpFluid
				}
			}
		}
	`);
	if (hero === undefined) {
		hero = data.heroImage.childImageSharp.fluid;
	}

	return (
		<div id="layout">
			<Header siteTitle={data.site.siteMetadata.title} />
			{hero && <Hero fluid={hero}>{title && <h1>{title}</h1>}</Hero>}
			<main className={className}>{children}</main>
			<Footer />
		</div>
	);
}
