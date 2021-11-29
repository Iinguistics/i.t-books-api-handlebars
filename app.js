const express = require('express');
const app = express();
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const path = require('path');
const axios = require('axios');

// Handlebars
app.set('view engine', 'handlebars');
app.engine('handlebars', exphbs.engine({ defaultLayout: 'main' }));

// Body Parser
app.use(express.urlencoded({ extended: false }));

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/api', require('./routes/bookstore'));

// Index route
app.get('/', (req, res) =>
	axios
		.get('https://api.itbook.store/1.0/new')
		.then((data) =>
			res.render('index', {
				books: data.data.books,
			}),
		)
		.catch((err) => res.render('error', { error: err })),
);

// Get book
app.get('/details/:isbn', (req, res) => {
	const isbn = req.params.isbn;
	axios
		.get(`https://api.itbook.store/1.0/books/${isbn}`)
		.then((data) =>
			res.render('bookDetails', {
				book: data.data,
			}),
		)
		.catch((err) => res.render('error', { error: err }));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server started on port ${PORT}`));
