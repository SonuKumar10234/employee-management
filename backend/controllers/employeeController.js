const mysqlConnection = require('../config/connection');


// get all employee
exports.getAllEmployees = (req, res) => {
    const query = 'SELECT * FROM employee';
    mysqlConnection.query(query, (err, results) => {
        if(err){
            res.json({message: 'Error fetching employees', status: 500});
        }
        else{
            res.json({employees: results, status: 200});
        }
    })
}


// Create a new employee
exports.createEmployee = (req, res) => {
    
    const { firstName, lastName, email, phoneNumber, address } = req.body;
    const query = 'INSERT INTO employee (firstName, lastName, email, phoneNumber, address) VALUES (?, ?, ?, ?, ?)';
    mysqlConnection.query(query, [firstName, lastName, email, phoneNumber, address], (err, results) => {
        if (err) {
            res.json({message: 'Error creating employee', status: 500});
        } else {
            const newEmployee = {
                id: results.insertId,
                firstName,
                lastName,
                email,
                phoneNumber,
                address
            };
            res.json({employee: newEmployee, message: 'Employee added successfully', status: 201});
        }
    });


}

//update an employee
exports.updateEmployee = (req, res) => {
    const { firstName, lastName, email, phoneNumber, address } = req.body;
    const query = 'UPDATE employee SET firstName = ?, lastName = ?, email = ?, phoneNumber = ?, address = ? WHERE id = ?';
    mysqlConnection.query(query, [firstName, lastName, email, phoneNumber, address, req.params.id], (err, results) => {
        if (err) {
            res.json({message: 'Error updating employee', status: 500});
        } else if (results.affectedRows === 0) {
            res.json({message: 'Employee not found', status: 404});
        } else {
            res.json({message: 'Employee updated successfully', status: 200});
        }
    })
}


// delete an employee
exports.deleteEmployee = (req, res) => {
    const query = 'DELETE FROM employee WHERE id=?';
    mysqlConnection.query(query, [req.params.id], (err, results) => {
        if (err) {
            res.json({message: 'Error deleting employee', status: 500});
        } else if (results.affectedRows === 0) {
            res.json({message: 'Employee not found', status: 404});
        } else {
            res.json({message: 'Employee deleted successfully', status: 200});
        }
    })

}