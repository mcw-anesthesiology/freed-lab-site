/** @format */

import React from 'react';

import Layout from '../components/Layout.js';
import SEO from '../components/SEO.js';

export default function IndexPage() {
	return (
		<Layout>
			<SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
			<h1>Home</h1>
		</Layout>
	);
}
