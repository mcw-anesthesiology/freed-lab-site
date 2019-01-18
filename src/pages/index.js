/** @format */

import React from 'react';

import Layout from '../components/Layout.js';
import SEO from '../components/SEO.js';

const IndexPage = () => (
	<Layout>
		<SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
		<h1>Home</h1>
	</Layout>
);

export default IndexPage;
