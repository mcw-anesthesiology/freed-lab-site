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
			<div></div>

			<div>
				<img
					className="mcw-logo"
					src="/images/icons/mcw-logo-big-white.png"
					alt="MCW - knowledge changing life"
				/>
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
