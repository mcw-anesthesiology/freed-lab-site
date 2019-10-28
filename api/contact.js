/** @format */
/* eslint-env node */

const knex = require('knex');
const { getClientIp } = require('request-ip');

const knexfile = require('../knexfile.js');
const config = knexfile[process.env.NODE_ENV || 'development'];
const db = knex(config);

const mailer = require('./mailer.js');
const gatsbyConfig = require('../gatsby-config.js');

const { MAIL_FROM } = process.env;

module.exports = async (req, res) => {
	try {
		const body = req.body;
		body.ip_address = getClientIp(req);
		body.created_at = new Date();

		await db('contact').insert(body);
		await sendNotifications(body);
		res.status(200);
	} catch (err) {
		console.error('Failed processing contact form submission', err);
		res.status(500);
	}
	res.send('');
};

async function sendNotifications(body) {
	return Promise.all(
		gatsbyConfig.siteMetadata.contactUsers.map(user =>
			mailer.sendMail({
				from: MAIL_FROM,
				to: user.email,
				replyTo: body.email,
				subject: body.subject || 'Contact form submission',
				text: `New submission from ${body.name}

				${body.body}
			`
			})
		)
	);
}
