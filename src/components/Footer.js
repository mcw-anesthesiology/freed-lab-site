/** @format */

import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import Image from 'gatsby-image';

import '../styles/footer.css';

export default function Footer() {
	const data = useStaticQuery(graphql`
		query FooterContactQuery {
			site {
				siteMetadata {
					departmentWebsite
					mailingAddress
				}
			}
			mcwLogo: file(
				relativePath: { eq: "icons/mcw-logo-big-white.png" }
			) {
				childImageSharp {
					fixed(width: 100) {
						...GatsbyImageSharpFixed
					}
				}
			}
		}
	`);

	return (
		<footer>
			<div></div>

			<div>
				<Image
					className="mcw-logo"
					fixed={data.mcwLogo.childImageSharp.fixed}
					alt="MCW - knowledge changing life"
				/>
			</div>

			<div className="contact">
				<a
					href={data.site.siteMetadata.departmentWebsite}
					dangerouslySetInnerHTML={{
						__html: data.site.siteMetadata.departmentWebsite.replace(
							'/',
							'/<wbr>'
						)
					}}
				></a>
				<address>{data.site.siteMetadata.mailingAddress}</address>
			</div>
		</footer>
	);
}
