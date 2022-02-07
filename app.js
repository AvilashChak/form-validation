
const url = require('url');
const util = require('util');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

const formProcess = require('./mylib/process-form.js');

const app = express();

// set views
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// parse application
app.use(bodyParser.urlencoded({ extended: false }));

// set static path
app.use('/static', express.static('views/public'));


app.get(['/', '/index', '/index.html'], (req, res) => {

	const request = req.url;

	if ( request === '/index' || request === '/index.html' ) {
		res.redirect(301, '/').end();
	}

	res.status(200);
	res.setHeader('Content-Type', 'text/html;charset=utf-8');

	res.render('index', {
		title: 'Pug Template Project',
		heading: 'Home Page',
		menuItemActive: 'home'

	});

	res.end();

});

app.get('/form-1', (req, res) => {

	res.status(200);
	res.setHeader('Content-Type', 'text/html;charset=utf-8');

	res.render('form-tmpl', {
		title: 'Form-1 Page',
		heading: 'Form-1 Page',
		menuItemActive: 'form-1',
		loadForm: 'form-1',
		formSubmit: 0

	});

	res.end();

});

app.post('/form-1', (req, res) => {

	const pageData = {

		title: 'Form-1 Page',
		heading: 'Form-1 Page',
		menuItemActive: 'form-1',
		loadForm: 'form-1',
		formSubmit: 1,
		errorMessage: null,
		formData: {}

	};

	res.status(200);
	res.setHeader('Content-Type', 'text/html;charset=utf-8');

	// form process
	const yourName = req.body.yourName.trim();

	let errorMessage = '';

	// check error
	if (yourName === '') {

		errorMessage = 'Required';
	}

	else if (yourName.length < 4) {

		errorMessage = 'Invalid name, it should be atleast 4 characters long';
	}

	if (errorMessage) {

		pageData.title = 'Form-1 error',
		pageData.heading = 'Form-1 submission failed',
		pageData.errorMessage = errorMessage;

	}

	else {

		pageData.formData.yourName = yourName;
	}

	res.render('form-tmpl', pageData);
	res.end();

});

app.get('/form-2', (req, res) => {

	res.status(200);
	res.setHeader('Content-Type', 'text/html;charset=utf-8');

	res.render('form-tmpl', {
		title: 'Form-2 Page',
		heading: 'Form-2 Page',
		menuItemActive: 'form-2',
		loadForm: 'form-2',
		form: formProcess.validation(null)

	});

	res.end();

});

app.post('/form-2', (req, res) => {

	const form = formProcess.validation(req.body);

	const pageData = {
		title: 'SignUp Success',
		heading: 'SignUp Success',
		menuItemActive: 'form-2',
		loadForm: 'form-2',
		form: form
	}

	// check error
	if (form.errorStatus) {

		pageData.title = 'Error - SignUp Failed';
		pageData.heading = 'Error - SignUp Failed';

	}

	res.status(200);
	res.setHeader('Content-Type', 'text/html;charset=utf-8');

	res.render('form-tmpl', pageData);

	res.end();

});




//handling non matching request from the client
app.use( (req, res, next) => res.status(404).send(`<h2>404 page not found</h2>`) );

app.listen(8080, () => console.log('Server running at port 8080'));