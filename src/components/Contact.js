/** @format */
/* global process */

import React, { Fragment, useReducer, useCallback } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import Loading from 'react-loading';
import { serialize } from 'formee';

import Hero from './Hero.js';

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

export default function Contact() {
	const data = useStaticQuery(graphql`
		query ContactQuery {
			heroImage: file(relativePath: { eq: "hero/DSC_7920 BW.jpg" }) {
				...HeroImage
			}
		}
	`);

	const [{ submitting, successful: submitted }, dispatch] = useReducer(
		submitReducer,
		{ submitting: false, successful: null }
	);

	const handleSubmit = useCallback(async event => {
		event.preventDefault();

		dispatch('submit');

		try {
			await submitContact(event);
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
		<section id="contact">
			<Hero fluid={data.heroImage.childImageSharp.fluid}>
				<header>
					<h2>Contact</h2>
				</header>
			</Hero>
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
							Name
							<input
								type="text"
								name="name"
								readOnly={submitting}
								required
							/>
						</label>

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
							How can we help you?
							<textarea
								name="body"
								rows="5"
								readOnly={submitting}
								required
							></textarea>
						</label>

						<div className="form-controls">
							{submitting ? (
								<Loading color="#ccc" />
							) : (
								<button
									type="submit"
									className="button primary left-align"
									disabled={submitting}
								>
									Submit
								</button>
							)}
						</div>
					</Fragment>
				)}
			</form>
		</section>
	);
}

async function submitContact(event) {
	if (process.env.NODE_ENV === 'development') {
		return new Promise(resolve => {
			setTimeout(() => {
				resolve();
			}, 1000);
		});
	}

	const response = await fetch('/api/contact', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(serialize(event.target))
	});

	if (!response.ok) {
		throw new Error(response.status);
	}
}
