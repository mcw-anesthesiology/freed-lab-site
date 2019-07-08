/** @format */

import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';

import ContactAddress from './ContactAddress.js';

import '../styles/footer.css';

export default function Footer() {
	const { site } = useStaticQuery(graphql`
		query FooterContactQuery {
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
	`);

	return (
		<footer>
			<div>
				<p>Footer</p>
				<p>© Medical College of Wisconsin</p>
			</div>

			<div>
				{site.siteMetadata.contactUsers.map(contactUser => (
					<ContactAddress
						key={contactUser.email}
						user={contactUser}
					/>
				))}
			</div>
		</footer>
	);
}
