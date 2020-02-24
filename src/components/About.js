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
						Cardiovascular disease remains the leading cause of
						death in the United States.
					</p>
					<p>
						Our lab primarily focuses on the role that sphingolipids
						have in the development, or prevention of, microvascular
						endothelial dysfunction, which occurs before the
						development of coronary artery disease (CAD). Elevated
						plasma levels of ceramide, a prototypical sphingolipid,
						is now considered an independent risk factor for major
						adverse cardiovascular events in otherwise healthy
						people. Our team aims to understand how these lipids are
						regulated within the endothelium of the human
						microvasculature. We study these mechanisms in human
						microvessels by utilizing discarded surgical specimens
						from patients diagnosed with CAD, and those with only
						0-1 Framingham risk factors for cardiovascular disease
						as healthy controls. 
					</p>
				</div>
			</Hero>
		</section>
	);
}
