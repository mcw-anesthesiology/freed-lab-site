/** @format */

import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';

import Hero from './Hero.js';

import '../styles/about.css';

export default function AboutSection() {
	const data = useStaticQuery(graphql`
		query {
			heroImage: file(relativePath: { eq: "hero/DSC_7948 BW.jpg" }) {
				...HeroImage
			}
		}
	`);

	return (
		<section id="about" className="about main-section-right">
			<Hero fluid={data.heroImage.childImageSharp.fluid}>
				<h2>About the lab</h2>
				<div>
					<p>
						Cardiovascular disease is the leading cause of death in
						the world. The microvasculature, which is consists of
						the small, peripheral blood vessels, is responsible for
						orchestrating adjustments in vascular tone to match
						local tissue perfusion with oxygen demand. Microvascular
						dysfunction precedes and is predictive of cardiovascular
						disease. Therefore, thorough understanding of the
						microvasculature is important in preventing and treating
						cardiovascular disease.
					</p>
				</div>
			</Hero>
		</section>
	);
}
