const express = require('express');
let router = express.Router();
let ObjectId = require('mongoose').Types.ObjectId;


// the schema 
var { Employee } = require('../models/employee');

// localhost:3000/employees/
// because we added the employees in server.js or index.js
//get all
router.get('/', (req, res) => {
  Employee.find((err, docs) => {
    if (!err) { res.send(docs); }
    else { console.log('Error in retriving Employees:' + JSON.stringify(err, undefined, 2)); }
  });
});

//get one
//route : http://localhost:3000/employees/id#
router.get('/:id', (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send(`No record with given id: ${req.params.id}`);
  Employee.findById(req.params.id, (err, doc) => {
    if (!err) { res.send(doc); }
    else { console.log('Error in retriving employee:' + JSON.stringify(err, undefined, 2));}
  })
});


//post
router.post('/', (req, res) => {
  var emp = new Employee({
    name: req.body.name,
    position: req.body.position,
    office: req.body.office,
    salary: req.body.salary,
  });
  emp.save((err, doc) => {
    if (!err) { res.send(doc); }
    else { console.log('Error in Employees Save:' + JSON.stringify(err, undefined, 2)); }
  });
});


router.put('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
    return res.status(400).send(`No record with given id: ${req.params.id}`);
    //else
  var emp = {
    name: req.body.name,
    position: req.body.position,
    office: req.body.office,
    salary: req.body.salary,
  };

  Employee.findByIdAndUpdate(req.params.id, { $set: emp }, { new: true }, (err, doc) => {
    if (!err) { res.send(doc); }
    else { console.log('Error in Updating employee:' + JSON.stringify(err, undefined, 2));}
  });
});



router.delete('/:id', (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send(`No record with given id: ${req.params.id}`);
  
  //else
  Employee.findByIdAndDelete(req.params.id, (err, doc) => {
    if (!err) { res.send(doc); }
    else { console.log('Error in Deleting employee:' + JSON.stringify(err, undefined, 2));}
  })
})

module.exports = router;


