/** @format */

import { Link } from 'gatsby';
import React from 'react';

import '../styles/header.css';

export default function Header({ children, title }) {
	return (
		<header id="site-header">
			{children}
			{title && <h1>{title}</h1>}
			<nav>
				<ul>
					<li>
						<HeaderLink to="#">Home</HeaderLink>
					</li>
					<li>
						<HeaderLink to="#projects">Projects</HeaderLink>
					</li>
					<li>
						<HeaderLink to="#team">Team</HeaderLink>
					</li>
					<li>
						<HeaderLink to="#contact">Contact</HeaderLink>
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
