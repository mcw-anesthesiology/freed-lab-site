/** @format */

import React from 'react';
import { StaticQuery, graphql } from 'gatsby';

import Header from './Header.js';
import Footer from './Footer.js';
import Hero from './Hero.js';

import 'normalize.css';
import 'typeface-source-sans-pro';
import 'typeface-open-sans';
import '../styles/global.css';

export default function Layout({ hero, children }) {
	return (
		<StaticQuery
			query={graphql`
				query SiteTitleQuery {
					site {
						siteMetadata {
							title
						}
					}
				}
			`}
			render={data => (
				<div id="layout">
					<Header siteTitle={data.site.siteMetadata.title} />
					<main>
						{hero && <Hero fluid={hero} />}
						{children}
					</main>
					<Footer />
				</div>
			)}
		/>
	);
}
