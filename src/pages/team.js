/** @format */

import React from 'react';
import { graphql } from 'gatsby';

import Layout from '../components/Layout.js';
import '../styles/team.css';

export default function Team({ data }) {
	const teamMembers = data.allTeamYaml.edges.map(e => e.node);

	return (
		<Layout>
			<h1>Team</h1>

			<ul className="team-list">
				{teamMembers.map(m => (
					<TeamMember key={m.id} {...m} />
				))}
			</ul>
		</Layout>
	);
}

export function TeamMember({ name, postNominal, title, bioHtml, image }) {
	const imgSrc = `/images/team/${image || 'placeholder.jpg'}`;

	return (
		<li className="team-member">
			<img src={imgSrc} alt="" width="150" />
			<span className="name">
				{name}
				{' '}
				{postNominal && postNominal.length > 0 && (
					<span className="post-nominal-titles">
						{postNominal.join(', ')}
					</span>
				)}
			</span>
			<span className="title">{title}</span>

			<div className="bio" dangerouslySetInnerHTML={{__html: bioHtml}}></div>
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
				}
			}
		}
	}
`;
