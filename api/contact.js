/** @format */
/* eslint-env node */

const knex = require('knex');
const { getClientIp } = require('request-ip');

const {
	DB_CLIENT = 'mysql',
	DB_HOST,
	DB_DATABASE,
	DB_USER,
	DB_PASS
} = process.env;

const db = knex({
	client: DB_CLIENT,
	connection: {
		host: DB_HOST,
		database: DB_DATABASE,
		user: DB_USER,
		password: DB_PASS
	}
});

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
