/** @format */

import React from 'react';
import Img from 'gatsby-image';

export default function Hero({ fluid, children }) {
	return (
		<div className="hero">
			<Img fluid={fluid} />
			{children}
		</div>
	);
}
