/** @format */

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
