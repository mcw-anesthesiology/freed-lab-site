/** @format */

import React, { useMemo } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';

import '../styles/publications.css';

const PUBLICATIONS_QUERY = gql`
	query PublicationsQuery($emails: [String], $limit: Int) {
		staff(emails: $emails) {
			publications(limit: $limit) {
				id
				url
				title
				pubDate
				citation
			}
		}
	}
`;

export default function Publications({ limit }) {
	const data = useStaticQuery(
		graphql`
			query {
				allTeamYaml {
					edges {
						node {
							id
							email
						}
					}
				}
			}
		`
	);
	const teamMembers = data.allTeamYaml.edges.map(e => e.node);
	const emails = teamMembers.map(m => m.email);

	const { data: publicationsData } = useQuery(PUBLICATIONS_QUERY, {
		variables: { emails, limit }
	});

	let publications = useMemo(() => {
		let map = new Map();

		if (publicationsData && publicationsData.staff) {
			for (const sm of publicationsData.staff) {
				for (const pub of sm.publications) {
					map.set(pub.id, pub);
				}
			}
		}

		const publications = Array.from(map.values());

		publications.sort((a, b) => {
			if (a.pubDate > b.pubDate) return -1;
			if (a.pubDate < b.pubDate) return 1;
			return 0;
		});

		publications.slice(0, limit);

		return publications;
	}, [publicationsData]);

	if (!publications.length) return null;

	return (
		<PublicationsList publications={publications} />
	);
}

export function PublicationsList({ publications }) {
	return (
		<ul className="publications-list">
			{publications.map(publication => (
				<PublicationItem key={publication.id} {...publication} />
			))}
		</ul>
	);
}

export function PublicationItem({ citation, url }) {
	return (
		<li>
			<a href={url} target="_blank">
				{citation}
			</a>
		</li>
	);
}
