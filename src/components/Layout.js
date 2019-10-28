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

export default function Layout({
	className,
	title,
	children,
	hero,
	heroImage,
	heroProps = {},
	headerContent
}) {
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
				fluid(maxWidth: 1920, quality: 90) {
					...GatsbyImageSharpFluid
				}
			}
		}
	`);

	if (heroImage === undefined) {
		heroImage = data.heroImage.childImageSharp.fluid;
	}

	return (
		<div id="layout" className={className}>
			{hero || (
				<Hero fluid={heroImage} {...heroProps}>
					<Header
						title={title || data.site.siteMetadata.title}
					>
						{headerContent}
					</Header>
				</Hero>
			)}
			<main className={className}>{children}</main>
			<Footer />
		</div>
	);
}
