/** @format */

import React from 'react';

import Layout from '../components/Layout.js';
import Publications from '../components/Publications.js';

import '../styles/publications.css';

export default function PublicationsPage() {
	return (
		<Layout title="Publications" className="publications">
			<Publications />
		</Layout>
	);
}
