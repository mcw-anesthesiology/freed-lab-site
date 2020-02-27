/** @format */

import React from 'react';
import { Link, useStaticQuery, graphql } from 'gatsby';
import Img from 'gatsby-image';

import Hero from '../components/Hero.js';
import Publications from '../components/Publications.js';

import '../styles/team.css';

export default function Team() {
	const data = useStaticQuery(
		graphql`
			query {
				allTeamYaml {
					edges {
						node {
							id
							name
							postNominal
							title
							email
							image
							row
							fields {
								image {
									childImageSharp {
										fixed(
											width: 200
											height: 200
											quality: 95
										) {
											...GatsbyImageSharpFixed
										}
									}
								}
							}
						}
					}
				}
				heroImage: file(relativePath: { eq: "hero/DSC_2328.jpg" }) {
					childImageSharp {
						fluid(maxWidth: 1920, quality: 90) {
							...GatsbyImageSharpFluid
						}
					}
				}
			}
		`
	);
	const teamMembers = data.allTeamYaml.edges.map(e => e.node);

	const rowMap = new Map();

	for (const member of teamMembers) {
		let row = rowMap.get(member.row);
		if (!row) {
			row = [];
			rowMap.set(member.row, row);
		}

		row.push(member);
	}

	const rows = Array.from(rowMap.entries());

	return (
		<section id="team">
			<Hero
				fluid={data.heroImage.childImageSharp.fluid}
				imgStyle={{ objectPosition: 'center top' }}
			>
				<h2>People</h2>
			</Hero>
			{rows.map(([row, members]) => (
				<ul key={row} className="team-list">
					{members.map(m => (
						<TeamMember key={m.id} {...m} />
					))}
				</ul>
			))}

			<div className="publications">
				<h3>Recent publications</h3>
				<Publications limit={3} />

				<Link to="/publications">
					See all
				</Link>
			</div>
		</section>
	);
}

export function TeamMember({ name, postNominal, title, email, row, fields }) {
	return (
		<li className="team-list-item" style={{ gridRow: row }}>
			<Img fixed={fields.image.childImageSharp.fixed} />
			<span className="name accent-text">
				{name}{' '}
				{postNominal && postNominal.length > 0 && (
					<span className="post-nominal-titles">
						{postNominal.join(', ')}
					</span>
				)}
			</span>
			<span
				className="title"
				dangerouslySetInnerHTML={{ __html: title }}
			/>

			<span className="email">
				<a href={`mailto:${email}`}>{email}</a>
			</span>
		</li>
	);
}
