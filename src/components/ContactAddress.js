/** @format */

import React from 'react';

export default function ContactAddress({ user }) {
	return (
		<address>
			{user.name} <br />
			<a href={`mailto:${user.email}`}>{user.email}</a> <br />
			<a href={`tel:${user.phone}`}>{user.phone}</a>
		</address>
	);
}
