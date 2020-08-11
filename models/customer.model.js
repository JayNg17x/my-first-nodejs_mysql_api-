const db = require('./db');

// Constructor
const Customer = function(customer) {
	this.email = customer.email;
	this.name = customer.name;
	this.active = customer.active;
};

Customer.create = (newCustomer, result) => {
	db.query('INSERT INTO Customer SET ?', newCustomer, (err, res) => {
		if(err) {
			console.error('ERROR: query failed!', err);
			result(err, null);
			return;
		}
		console.log('Created customer:', { id: res.insertId, ...newCustomer });
		result(null, { id: res.insertId, ...newCustomer });
	});
};


Customer.findById = (customerId, result) => {
	db.query(`SELECT * FROM Customer WHERE id = ${customerId}`, (err, res) => {
		if(err) {
			console.error('ERROR: query failed!', err);
			result(err, null);
			return;
		}

		if(res.length) {
			console.log(`Found customer ${res[0]}`);
			result(null, res[0]);
			return;
		}

		// Not found customer with the id 
		result({kind: 'id not exists'}, null);
	});
};


Customer.getAll = (result) => {
	db.query(`SELECT * FROM Customer`, (err, res) => {
		if(err) {
			console.error('ERROR: query failed!', err);
			result(err, null);
			return;
		}

		console.log(`Customers: ${res}`);
		result(null, res);
	});
};


Customer.updateById = (id, customer, result) => {
	db.query(
		`UPDATE Customer SET email = ?, name = ?, active = ? WHERE id = ?`,
		 [customer.email, customer.name, customer.active, id],
		 (err, res) => {
		 	if(err) {
		 		console.error('ERROR: query failed!', err);
		 		result(err, null);
		 		return;
		 	}

		 	// If id not exists
		 	if(res.affectedRows === 0) {
		 		result({kind: 'id not exists'}, null);
		 		return;
		 	}

		 	console.log('Updated Customer: ', {id: id, ...customer});
		 	result(null, {id: id, ...customer});
		 });
};


Customer.remove = (customerId,  result) => {
	db.query(`DELETE FROM Customer WHERE id = ?`, customerId, (err, res) => {
		if(err) {
			console.error('ERROR: query failed!', err);
			result(err, null);
			return;
		}

		if(res.affectedRows === 0) {
			result({kind: 'id not exists'}, null);
			return;
		}

		console.log(`Delete customer with id ${customerId}`);
		result(null, res);
	});
};


Customer.removeAll = (result) => {
	db.query(`DELETE FROM Customer`, (err, res) => {
		if(err) {
			console.error('ERROR: query failed!', err);
			result(err, null);
			return;
		}

		console.log(`Deleted ${res.affectedRows} from Customer`);
		result(null, res);
	});
};


module.exports = Customer;