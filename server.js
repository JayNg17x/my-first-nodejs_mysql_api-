const express = require('express');
const bodyParser = require('body-parser');

const app = express();


// Parse requests of Content-Type: application/json
app.use(bodyParser.json());

// Parse requests of Content-Type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// Simple route
app.get('/', (req, res) => {
	res.json({ message: 'Welcome to my application!' });
});


require('./routes/customer.route')(app);

// set port and listen on the server
app.listen(2001, () => {
	console.log('Server is running on port 2001...');
});