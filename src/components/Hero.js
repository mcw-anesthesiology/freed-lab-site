/** @format */

import React from 'react';
import Img from 'gatsby-image';

export default function Hero({ children, ...imgProps }) {
	return (
		<div className="hero">
			<Img {...imgProps} />
			<div className="hero-content">{children}</div>
		</div>
	);
}
