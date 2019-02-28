/** @format */

import { Link } from 'gatsby';
import React from 'react';

import ContactIcon from '../images/icons/contact.svg';
import GoalsIcon from '../images/icons/goals.svg';
import ProjectsIcon from '../images/icons/projects.svg';
import TeamIcon from '../images/icons/team.svg';

import '../styles/header.css';

export default function Header({ siteTitle }) {
	return (
		<header>
			<HeaderLink to="/">{siteTitle}</HeaderLink>
			<nav>
				<ul>
					<li>
						<HeaderLink to="/goals">
							<GoalsIcon />
							Goals
						</HeaderLink>
					</li>
					<li>
						<HeaderLink to="/projects">
							<ProjectsIcon />
							Projects
						</HeaderLink>
					</li>
					<li>
						<HeaderLink to="/team">
							<TeamIcon />
							Team
						</HeaderLink>
					</li>
					<li>
						<HeaderLink to="/contact">
							<ContactIcon />
							Contact
						</HeaderLink>
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
