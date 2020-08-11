const Customer = require('../models/customer.model');

// Create and save new customer
exports.create = (req, res) => {
	if(!req.body) {
		res.status(404).send({
			message: 'Content can not be empty.'
		});
	}

	const customer = {
		email: req.body.email,
		name: req.body.name,
		active: req.body.active
	};

	Customer.create(customer, (err, data) => {
		if(err) {
			res.status(500).send({
				message: 
					err.message || 'Some error occured while creating new user.'
			});
		} else {
			res.send(data);
		}
	});
};


// Retrieve all customers from database
exports.findAll = (req, res) => {
	Customer.getAll((err, data) => {
		if(err) {
			res.status(500).send({
				message: 
					err.message || 'Some error occured while retrieving user info'
			});
		} else {
			res.send(data);
		}
	});
};


// Find a single customer with customerId
exports.findOne = (req, res) => {
	Customer.findById(req.params.customerId, (err, data) => {
		if(err) {
			if(err.kind === 'id not exists') {
				res.status(404).send({
					message: `Not found user with id ${req.params.customerId}`
				});
			} else {
				res.status(500).send({
					message: `Error retrieving with id ${req.params.customerId}`
				});
			}
		} else {
			res.send(data);
		}
	});
};


// Update a customer identified by customerId in the request 
exports.update = (req, res) => {
	// Validate 
	if(!req.body) {
		res.status(404).send({
			message: 'Content can not be empty!'
		});
	} 

	Customer.updateById(
		req.params.customerId, 
		new Customer(req.body),
		(err, data) => {
			if(err) {
				if(err.kind == 'id not exists') {
					res.status(404).send({
						message: `Not found user with id ${req.params.customerId}.`
					});
				} else {
					res.status(500).send({
						message: `Error updating with id ${req.params.customerId}.`
					});
				}
			} else {
				res.send(data);
			}
		});
};


// Delete a customer with the specified customerId in the request
exports.delete = (req, res) => {
	Customer.remove(req.params.customerId, (err, data) => {
		if(err) {
			if(err.kind === 'id not exists') {
				res.status(404).send({
					message: `Not found user with ${req.params.customerId}.`
				});
				
			} else {
				res.status(500).send({
					message: `Error removing user with id ${req.params.customerId}.`
				});
			}
		} else {
			res.send({ message: `Customer was deleted successfully ${data}` });
		}
	});
};	


// Delete all customer from database
exports.deleteAll = (req, res) => {	
	Customer.removeAll((err, data) => {
		if(err) {
			res.status(500).send({
				message: err.message || 'Some error occured while removing all users.'
			});
		} else {
			res.send({ message: `All customers were deleted successfully!` });
		}
	})
};


