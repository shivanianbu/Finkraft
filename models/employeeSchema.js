const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  userId: {
    type: String,
    required: true,
  },
  age: {
    type: String,
    required: true,
  },
  mobile: {
    type: String,
    required: true,
  },
  work: {
    type: String,
    required: true,
  },
  add: {
    type: String,
    required: true,
  },
});

const employees = new mongoose.model("users", employeeSchema);

module.exports = employees;
