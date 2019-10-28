/** @format */
/* eslint-env node */

exports.up = knex => {
	return knex.schema.alterTable('contact', table => {
		table.string('name');
	});
};

exports.down = knex => {
	return knex.schema.alterTable('contact', table => {
		table.dropColumn('name');
	});
};
