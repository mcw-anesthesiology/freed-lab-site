/** @format */

import React from 'react';
import { Link, useStaticQuery, graphql } from 'gatsby';
import Image from 'gatsby-image';

import '../styles/footer.css';

export default function Footer() {
	const { site: { siteMetadata: meta }, mcwLogo } = useStaticQuery(graphql`
		query FooterContactQuery {
			site {
				siteMetadata {
					departmentWebsite
					mailingAddress
					copyright
				}
			}
			mcwLogo: file(
				relativePath: { eq: "icons/mcw-logo-big-white.png" }
			) {
				childImageSharp {
					fixed(width: 180) {
						...GatsbyImageSharpFixed
					}
				}
			}
		}
	`);

	return (
		<footer>
			<div></div>

			<div className="logo-container">
				<Image
					className="mcw-logo"
					fixed={mcwLogo.childImageSharp.fixed}
					alt="MCW - knowledge changing life"
				/>
			</div>

			<div className="contact">
				<div>
					<a
						href={meta.departmentWebsite}
						dangerouslySetInnerHTML={{
							__html: meta.departmentWebsite.replace('https://', '').replace(
								'/',
								'/<wbr>'
							)
						}}
					></a>
					<address>{meta.mailingAddress}</address>
				</div>
				<span className="copyright">
					© {meta.copyright}
				</span>
			</div>
		</footer>
	);
}
