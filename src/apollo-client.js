/** @format */
/* global process */

import React from 'react';
import {
	ApolloClient,
	ApolloProvider,
	HttpLink,
	InMemoryCache
} from '@apollo/client';
import fetch from 'isomorphic-fetch';

export const staffClient = new ApolloClient({
	cache: new InMemoryCache(),
	link: new HttpLink({
		uri: process.env.GATSBY_STAFF_ENDPOINT || process.env.STAFF_ENDPOINT
	}),
	fetch
});

export const wrapRootElement = ({ element }) => (
	<ApolloProvider client={staffClient}>{element}</ApolloProvider>
);
