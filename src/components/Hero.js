/** @format */

import React from 'react';
import Img from 'gatsby-image';

export default function Hero({ fluid }) {
	return (
		<div className="hero">
			<Img fluid={fluid} />
		</div>
	);
}
