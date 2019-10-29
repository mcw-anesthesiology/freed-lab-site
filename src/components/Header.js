/** @format */

import { Link } from 'gatsby';
import React from 'react';

import '../styles/header.css';

export default function Header({ children, title }) {
	return (
		<header id="site-header">
			{title && <h1>{title}</h1>}
			{children}
		</header>
	);
}

function isActive({ isCurrent }) {
	return isCurrent ? { className: 'active' } : null;
}

export function HeaderLink(props) {
	return <Link getProps={isActive} {...props} />;
}
