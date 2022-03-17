const express = require('express');
const router = express.Router();
const ObjectId = require('mongoose').Types.ObjectId;    

const { Employee } = require('../models/employee');


// Get All Employees
router.get('/', (req, res) => {
    Employee.find({}, (err, data) => {
        if(!err) {
            res.send(data);
        } else {
            console.log(err);
        }
    });
});


// Get Single Employee (First Way)

router.get('/employee/:name', (req, res) => {
    Employee.find({name:req.params.name}, (err, data) => {
        if(!err) {
            res.send(data);
        } else {
           console.log(err);
        }
    });
});



router.get('/employee1/:name', (req, res) => {
	var condition = { name:req.params.name };
Employee.find(condition).skip(1).limit(10).then(data => { 
    res.json(data)
})
});

// var condition = { cash: '5000' };
// Employee.find(condition).skip(1).limit(10).then(data => { 
//     res.json(data)
// })


// Get Single Employee (2nd Way)

// router.get('/api/employee/:id', (req, res) => {
//     if(!ObjectId.isValid(req.params.id))
//     return res.status(400).send(`No record With Given ID : ${req.params.id}`);

//     Employee.findById(req.params.id, (err, data) => {
//         if(!err) {
//             res.send(data);
//         } else {
//            console.log(err);
//         }
//     });
// });


// Save Employee
router.post('/employee/add', (req, res) => {
    const emp = new Employee({
        name: req.body.name,
        number: req.body.number,
        email: req.body.email
    });
    emp.save((err, data) => {
        if(!err) {
            // res.send(data);
            res.status(200).json({code: 200, message: 'Employee Added Successfully', addEmployee: data})
        } else {
           console.log(err);
        }
    });
});



// Update Employee

router.put('/employee/update/:id', (req, res) => {


    const emp = {
        name: req.body.name,
        number: req.body.number,
        email: req.body.email,
    };
    Employee.findByIdAndUpdate(req.params.id, { $set: emp }, { new: true }, (err, data) => {
        if(!err) {
            res.status(200).json({code: 200, message: 'Employee Updated Successfully', updateEmployee: data})
        } else {
            console.log(err);
        }
    });
});





// Delete Employee
router.delete('/employee/delete/:id', (req, res) => {

    Employee.findByIdAndRemove(req.params.id, (err, data) => {
        if(!err) {
            // res.send(data);
            res.status(204).send()
        } else {
            console.log(err);
        }
    });
});


module.exports = router;