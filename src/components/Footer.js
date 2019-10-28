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
					departmentWebsite
					mailingAddress
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

			<div className="contact">
				<a href={site.siteMetadata.departmentWebsite}>
					{site.siteMetadata.departmentWebsite}
				</a>
				<address>{site.siteMetadata.mailingAddress}</address>
			</div>
		</footer>
	);
}
