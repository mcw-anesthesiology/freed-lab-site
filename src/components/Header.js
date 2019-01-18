/** @format */

import { Link } from 'gatsby';
import React from 'react';

export default function Header({ siteTitle }) {
	return (
		<header>
			<Link to="/">{siteTitle}</Link>
			<nav>
				<ul>
					<li>
						<Link to="/goals">Goals</Link>
					</li>
				</ul>
			</nav>
		</header>
	);
}
