/** @format */

import React, { useMemo } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';

const PUBLICATIONS_QUERY = gql`
	query PublicationsQuery($emails: [String]) {
		staff(emails: $emails) {
			publications {
				id
				url
				title
				pubDate
				citation
			}
		}
	}
`;

export default function AboutSection() {
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
		variables: { emails }
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
			if (a.pubDate < b.pubDate) return -1;
			if (a.pubDate > b.pubDate) return 1;
			return 0;
		});

		return publications;
	}, [publicationsData]);

	if (!publications.length) return null;

	return (
		<section id="publications">
			<ul>
				{publications.map(publication => (
					<PublicationItem key={publication.id} {...publication} />
				))}
			</ul>
		</section>
	);
}

export function PublicationItem({ id, url, title, pubDate, citation }) {
	return <li>{citation}</li>;
}
