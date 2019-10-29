import React from 'react';
import { Dialog as ReachDialog } from '@reach/dialog';

export default function Dialog({
	className,
	onDismiss,
	children,
	...dialogProps
}) {
	return (
		<ReachDialog
			className={`dialog ${className}`}
			onDismiss={onDismiss}
			{...dialogProps}
		>
			<button
				type="button"
				className="close-button"
				onClick={onDismiss}
				aria-label="Dismiss"
			>
				<span aria-hidden>&times;</span>
			</button>

			{children}
		</ReachDialog>
	);
}
