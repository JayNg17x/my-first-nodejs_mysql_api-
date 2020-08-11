module.exports = app => {
	const customers = require('../controllers/customer.controller');

	// Create a new customer
	app.post('/customers', customers.create);

	// Retrieve all customer
	app.get('/customers', customers.findAll);

	// Retrieve single customer with id
	app.get('/customers/:customerId', customers.findOne);

	// Retrieve customer info with customer id
	app.put('/customers/:customerId', customers.update);

	// Delete single customer with customer id
	app.delete('/customers/:customerId', customers.delete);

	// Delete all of customers
	app.delete('/customers', customers.deleteAll);
}







