/** @format */

import React, { useState, useCallback } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import Img from 'gatsby-image';

import Dialog from '../components/Dialog.js';
import Hero from '../components/Hero.js';
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
							bioHtml
							image
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

	const [dialogMember, setDialogMember] = useState(null);

	const handleMemberClick = useCallback(
		member => event => {
			event.preventDefault();
			setDialogMember(member);
		},
		[setDialogMember]
	);

	return (
		<section id="team">
			<Hero
				fluid={data.heroImage.childImageSharp.fluid}
				imgStyle={{ objectPosition: 'center top' }}
			>
				<h2>People</h2>
			</Hero>
			<ul className="team-list">
				{teamMembers.map(m => (
					<TeamMember
						key={m.id}
						{...m}
						onClick={handleMemberClick(m)}
					/>
				))}
			</ul>

			{dialogMember && (
				<TeamMemberDialog
					{...dialogMember}
					onDismiss={() => {
						setDialogMember(null);
					}}
				/>
			)}
		</section>
	);
}

export function TeamMember({ name, postNominal, fields, onClick }) {
	return (
		<li className="team-list-item">
			<a href="#" className="team-member" onClick={onClick}>
				<Img fixed={fields.image.childImageSharp.fixed} />
				<span className="name accent-text">
					{name}{' '}
					{postNominal && postNominal.length > 0 && (
						<span className="post-nominal-titles">
							{postNominal.join(', ')}
						</span>
					)}
				</span>
			</a>
		</li>
	);
}

function TeamMemberDialog({
	name,
	postNominal,
	title,
	bioHtml,
	fields,
	onDismiss
}) {
	return (
		<Dialog
			className="team-member-dialog"
			aria-label={`${name} team member overview`}
			onDismiss={onDismiss}
		>
			<Img
				fixed={fields.image.childImageSharp.fixed}
				imgStyle={{ objectFit: 'cover' }}
			/>
			<span className="name accent-text">
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
		</Dialog>
	);
}
