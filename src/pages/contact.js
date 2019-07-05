/** @format */

import React from 'react';
import { graphql } from 'gatsby';

import Layout from '../components/Layout.js';

import '../styles/contact.css';

export default function ContactPage({ data }) {
	return (
		<Layout title="Contact">
			<p>If you have questions, please contact us!</p>

			<form onSubmit={handleSubmit}>
				<label>
					Your email
					<input
						type="email"
						name="email"
						placeholder="you@example.com"
					/>
				</label>

				<label>
					Subject
					<input type="text" name="subject" required />
				</label>

				<label>
					Body
					<textarea name="body" rows="5" required></textarea>
				</label>

				<button type="submit">Submit</button>
			</form>

			{data.site.siteMetadata.contactUsers.map(contactUser => (
				<address key={contactUser.email}>
					{contactUser.name} <br />
					<a href={`mailto:${contactUser.email}`}>
						{contactUser.email}
					</a>{' '}
					<br />
					<a href={`tel:${contactUser.phone}`}>{contactUser.phone}</a>
				</address>
			))}
		</Layout>
	);
}

function handleSubmit(event) {
	event.preventDefault();

	fetch('/api/contact', {
		method: 'POST',
		body: new FormData(event.target)
	})
		.then(r => {
			if (r.ok) {
				alert('Cool!');
			} else {
				throw Error(r.status);
			}
		})
		.catch(err => {
			console.error(err);
		});
}

export const query = graphql`
	query ContactQuery {
		site {
			siteMetadata {
				contactUsers {
					name
					email
					phone
				}
			}
		}
	}
`;
