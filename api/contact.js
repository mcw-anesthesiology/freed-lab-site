/** @format */
/* eslint-env node */

module.exports = (req, res) => {
	// TODO
	console.log('Hey!', req.body);

	res.status(200).send('Hey');
};
