const mongoose = require('mongoose');


// Schema 
let Employee = mongoose.model('Employee', {
  name: { type: String },
  position: { type: String },
  office: { type: String },
  salary: { type: Number }
});



module.exports = { Employee };
// since it is the same it also can be just {Employee: Employee}