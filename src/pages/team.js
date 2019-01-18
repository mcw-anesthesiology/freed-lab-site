/** @format */

import React from 'react';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';

import Layout from '../components/Layout.js';

export default function Team({ data }) {
	const images = data.allFile.edges.map(e => e.node);
	const teamMembers = data.allTeamYaml.edges.map(e => {
		const member = {
			...e.node
		};

		if (member.image) {
			const node = images.find(
				i => member.image === `${i.name}.${i.extension}`
			);
			if (node) {
				member.fluid = node.childImageSharp.fluid;
			}
		}

		return member;
	});

	return (
		<Layout>
			<h1>Team</h1>

			<div>
				{teamMembers.map(m => (
					<TeamMember key={m.id} {...m} />
				))}
			</div>
			<pre>{JSON.stringify(data.allTeamYaml.edges)}</pre>
		</Layout>
	);
}

export function TeamMember({ name, postNominal, title, bio, image, fluid }) {
	return (
		<li>
			<span className="name">{name}</span>
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
					bio
					image
				}
			}
		}
		allFile(filter: { relativeDirectory: { eq: "team" } }) {
			edges {
				node {
					id
					name
					extension
					childImageSharp {
						fluid(maxWidth: 300) {
							...GatsbyImageSharpFluid
						}
					}
				}
			}
		}
	}
`;
