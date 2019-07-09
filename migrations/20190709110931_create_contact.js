/** @format */
/* eslint-env node */

exports.up = knex => {
	return knex.schema.createTable('contact', table => {
		table.increments('id');
		table.string('email');
		table.string('subject');
		table.string('body').notNullable();
		table.string('ip_address').notNullable();
		table.datetime('created_at').notNullable();
	});
};

exports.down = knex => {
	return knex.schema.dropTableIfExists('contact');
};
