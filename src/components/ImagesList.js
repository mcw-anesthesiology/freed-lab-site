/** @format */

import React, { useState, useCallback } from 'react';
import Image from 'gatsby-image';

import Dialog from './Dialog.js';

import '../styles/images-list.css';

export default function ImagesList({ images, getAlt }) {
	const [focusedImage, setFocusedImage] = useState(null);
	const handleItemClick = useCallback(
		image => event => {
			event.preventDefault();
			setFocusedImage(image);
		},
		[setFocusedImage]
	);

	return (
		<div className="images-list">
			<span>Click to enlarge:</span>
			<ul>
				{images.map(node => (
					<li key={node.id}>
						<a href="#" onClick={handleItemClick(node)}>
							<Image
								fluid={node.childImageSharp.fluid}
								alt={getAlt(node)}
							/>
						</a>
					</li>
				))}
			</ul>

			{focusedImage && (
				<Dialog aria-label={getAlt(focusedImage)} onDismiss={() => { setFocusedImage(null); }}>
					<Image fluid={focusedImage.childImageSharp.fluid} alt={getAlt(focusedImage)} />
				</Dialog>
			)}
		</div>
	);
}
