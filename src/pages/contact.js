/** @format */

import React from 'react';
import { graphql } from 'gatsby';

import Layout from '../components/Layout.js';

export default function ContactPage({ data }) {
	return (
		<Layout>
			<h1>Contact</h1>

			<p>If you have questions, please contact us!</p>

			{data.site.siteMetadata.contactUsers.map(contactUser => (
				<address key={contactUser.email}>
					{contactUser.name} <br />
					<a href={`mailto:${contactUser.email}`}>
						{contactUser.email}
					</a>{' '}
					<br />
					<a href={`tel:${contactUser.phone}`}>{contactUser.phone}</a>
				</address>
			))}
		</Layout>
	);
}

export const query = graphql`
	query ContactQuery {
		site {
			siteMetadata {
				contactUsers {
					name
					email
					phone
				}
			}
		}
	}
`;
