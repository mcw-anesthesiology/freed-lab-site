/** @format */

import React, { useState, useCallback } from 'react';
import Image from 'gatsby-image';

import Dialog from './Dialog.js';

import '../styles/images-list.css';

export default function ImagesList({ images, getMeta }) {
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
								alt={getMeta(node)?.alt}
							/>
						</a>
					</li>
				))}
			</ul>

			{focusedImage && (
				<FocusedImageDialog
					image={focusedImage}
					{...getMeta(focusedImage)}
					onDismiss={() => {
						setFocusedImage(null);
					}}
				/>
			)}
		</div>
	);
}

function FocusedImageDialog({ image, src, alt, caption, ...props }) {
	return (
		<Dialog
			className="focused-image-dialog"
			aria-label={`Focused image: ${alt}`}
			{...props}
		>
			<figure>
				<Image fluid={image.childImageSharp.fluid} alt={alt} />
				{caption && (
					<figcaption>{caption}</figcaption>
				)}
			</figure>
		</Dialog>
	);
}
