const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const { mongoose } = require('./db.js');
//to use the get request that we have created
let employeeController = require('./controllers/employeeController.js');

const app = express();
app.use(bodyParser.json());

//to allow any request from any port# or domine

app.use(cors({ origin: 'http://localhost:4200' }));


app.listen(3000, () => console.log('Server started at port: 3000'));


// here we added /employees to the router
app.use('/employees', employeeController);