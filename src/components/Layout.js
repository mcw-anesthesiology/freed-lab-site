/** @format */

import React from 'react';
import { useStaticQuery, graphql, Link } from 'gatsby';
import { Location } from '@reach/router';
import { Helmet } from 'react-helmet';

import 'normalize.css';
import '@reach/dialog/styles.css';

import '../styles/global.css';

import SEO from './SEO.js';
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
	headerContent,
	backNav
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
			<SEO title={title} lang="en" keywords={['Freed', 'Lab']} />
			<Helmet>
				<link
					rel="stylesheet"
					href="https://use.typekit.net/uzs1okq.css"
				/>
			</Helmet>

			{hero || (
				<Hero fluid={heroImage} {...heroProps}>
					<Header title={title || data.site.siteMetadata.title}>
						{headerContent}
					</Header>
				</Hero>
			)}
			{backNav || (
				<Location>
					{({ location }) =>
						location.pathname !== '/' && (
							<nav>
								<Link to="/">Back home</Link>
							</nav>
						)
					}
				</Location>
			)}
			<main className={className}>{children}</main>
			<Footer />
		</div>
	);
}
