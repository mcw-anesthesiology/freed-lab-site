/** @format */

import { Link } from 'gatsby';
import React from 'react';

import '../styles/header.css';

export default function Header({ siteTitle }) {
	return (
		<header>
			<HeaderLink to="/">{siteTitle}</HeaderLink>
			<nav>
				<ul>
					<li>
						<HeaderLink to="/goals">Goals</HeaderLink>
					</li>
					<li>
						<HeaderLink to="/projects">Projects</HeaderLink>
					</li>
					<li>
						<HeaderLink to="/team">Team</HeaderLink>
					</li>
				</ul>
			</nav>
		</header>
	);
}

function isActive({ isCurrent }) {
	return isCurrent ? { className: 'active' } : null;
}

export function HeaderLink(props) {
	return <Link getProps={isActive} {...props} />;
}
