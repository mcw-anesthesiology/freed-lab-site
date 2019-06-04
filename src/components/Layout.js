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

export default function Layout({ className, hero, children }) {
	const data = useStaticQuery(graphql`
		query SiteTitleQuery {
			site {
				siteMetadata {
					title
				}
			}
		}
	`);

	return (
		<div id="layout">
			<Header siteTitle={data.site.siteMetadata.title} />
			{hero && <Hero fluid={hero} />}
			<main className={className}>{children}</main>
			<Footer />
		</div>
	);
}
