/** @format */
/* global process */

import React, { Fragment, useReducer, useCallback } from 'react';
import { graphql } from 'gatsby';
import Loading from 'react-loading';

import Layout from '../components/Layout.js';
import ContactAddress from '../components/ContactAddress.js';

import '../styles/contact.css';

function submitReducer(state, action) {
	switch (action) {
		case 'submit':
			return {
				...state,
				submitting: true
			};
		case 'success':
			return {
				submitting: false,
				successful: true
			};
		case 'failure':
			return {
				submitting: false,
				successful: false
			};
		case 'reset':
		default:
			return {
				submitting: false,
				successful: null
			};
	}
}

export default function ContactPage({ data }) {
	const [{ submitting, successful: submitted }, dispatch] = useReducer(
		submitReducer,
		{ submitting: false, successful: null }
	);

	const handleSubmit = useCallback(async event => {
		event.preventDefault();

		dispatch('submit');

		try {
			await submitContact();
			dispatch('success');
		} catch (err) {
			console.error(err);
			dispatch('failure');
		}
	});

	const handleReset = useCallback(() => {
		dispatch('reset');
	});

	return (
		<Layout title="Contact" className="contact-page">
			<p className="lead">If you have questions please contact us!</p>

			<form
				className={submitted === false ? 'unsuccessful' : null}
				disabled={submitting}
				onSubmit={handleSubmit}
				onReset={handleReset}
			>
				{submitted ? (
					<Fragment>
						<div className="growing-container"></div>
						<p>
							Thanks for reaching out, someone will respond as
							soon as possible.
						</p>
						<div className="growing-container"></div>
						<button type="reset">Reset</button>
					</Fragment>
				) : (
					<Fragment>
						<label>
							Your email
							<input
								type="email"
								name="email"
								placeholder="you@example.com"
								readOnly={submitting}
							/>
						</label>

						<label>
							Subject
							<input
								type="text"
								name="subject"
								readOnly={submitting}
								required
							/>
						</label>

						<label>
							Body
							<textarea
								name="body"
								rows="5"
								readOnly={submitting}
								required
							></textarea>
						</label>

						<div className="growing-container">
							{submitting && <Loading color="#ccc" />}
						</div>

						<button type="submit" disabled={submitting}>
							Submit
						</button>
					</Fragment>
				)}
			</form>

			{data.site.siteMetadata.contactUsers.map(contactUser => (
				<ContactAddress key={contactUser.email} user={contactUser} />
			))}
		</Layout>
	);
}

async function submitContact() {
	if (process.env.NODE_ENV === 'development') {
		return new Promise(resolve => {
			setTimeout(() => {
				resolve();
			}, 1000);
		});
	}

	const response = await fetch('/api/contact', {
		method: 'POST',
		body: new FormData(event.target)
	});

	if (!response.ok) {
		throw new Error(response.status);
	}
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
