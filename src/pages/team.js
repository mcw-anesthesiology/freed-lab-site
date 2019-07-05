/** @format */

import React from 'react';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';

import Layout from '../components/Layout.js';
import '../styles/team.css';

export default function Team({ data }) {
	const teamMembers = data.allTeamYaml.edges.map(e => e.node);

	return (
		<Layout title="Team" hero={data.heroImage.childImageSharp.fluid}>
			<ul className="team-list">
				{teamMembers.map(m => (
					<TeamMember key={m.id} {...m} />
				))}
			</ul>
		</Layout>
	);
}

export function TeamMember({ name, postNominal, title, bioHtml, fields }) {
	return (
		<li className="team-member">
			<Img fixed={fields.image.childImageSharp.fixed} />
			<span className="name">
				{name}{' '}
				{postNominal && postNominal.length > 0 && (
					<span className="post-nominal-titles">
						{postNominal.join(', ')}
					</span>
				)}
			</span>
			<span className="title">{title}</span>

			<div
				className="bio"
				dangerouslySetInnerHTML={{ __html: bioHtml }}
			/>
		</li>
	);
}

export const query = graphql`
	query {
		allTeamYaml {
			edges {
				node {
					id
					name
					postNominal
					title
					bioHtml
					image
					fields {
						image {
							childImageSharp {
								fixed(width: 150, height: 150, quality: 95) {
									...GatsbyImageSharpFixed
								}
							}
						}
					}
				}
			}
		}
		heroImage: file(relativePath: { eq: "hero/team.jpg" }) {
			...HeroImage
		}
	}
`;
