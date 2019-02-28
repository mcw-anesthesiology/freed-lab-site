/** @format */

import React from 'react';
import { graphql } from 'gatsby';

import Layout from '../components/Layout.js';

export default function AttributionsPage({ data }) {
	return (
		<Layout>
			<h1>Attributions</h1>

			<ul>
				{data.site.siteMetadata.attributions.map(attribution => (
					<li key={attribution.link}>
						<a href={attribution.link}>
							{attribution.name} by {attribution.author}
						</a>
					</li>
				))}
			</ul>
		</Layout>
	);
}

export const query = graphql`
	query Attributionsquery {
		site {
			siteMetadata {
				attributions {
					name
					author
					link
				}
			}
		}
	}
`;
