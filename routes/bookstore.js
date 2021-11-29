const express = require('express');
const router = express.Router();
const axios = require('axios');

// Search for books
router.get('/search', (req, res) => {
	let { term } = req.query;
	term = term.toLowerCase();
	axios
		.get(`https://api.itbook.store/1.0/search/${term}`)
		.then((data) =>
			res.render('searchResults', {
				total: data.data.total,
				books: data.data.books,
			}),
		)
		.catch((err) => res.render('error', { error: err }));
});

module.exports = router;
