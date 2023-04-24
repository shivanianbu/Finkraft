const express = require("express");
const router = express.Router();
const employees = require("../models/employeeSchema");

//Create Employee
router.post("/create", async (req, res) => {
  const { name, email, userId, age, mobile, work, add } = req.body;

  if (!name || !email || !userId || !age || !mobile || !work || !add) {
    res.status(400).json("Please fill the details");
  }

  try {
    const isExist = await employees.findOne({ email: email });

    if (isExist) {
      res.status(400).json("This user is already present");
    } else {
      const adduser = new employees({
        name,
        email,
        userId,
        age,
        mobile,
        work,
        add,
      });
      await adduser.save();
      res.status(201).json(adduser);
    }
  } catch (error) {
    res.status(400).json(error);
  }
});

// Get All Employee
router.get("/getallemployee", async (req, res) => {
  try {
    const allEmployees = await employees.find();
    res.status(201).json(allEmployees);
  } catch (error) {
    res.status(400).json(error);
  }
});

// Get Individual Employee by ID
router.get("/getemployee/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const employee = await employees.findById({ _id: id });
    res.status(201).json(employee);
  } catch (error) {
    res.status(400).json(error);
  }
});

// Update employee data
router.patch("/updateemployee/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const updatedEmployee = await employees.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    res.status(201).json(updatedEmployee);
  } catch (error) {
    res.status(400).json(error);
  }
});

// Delete Employee
router.delete("/deleteemployee/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const deleteEmployee = await employees.findByIdAndDelete({ _id: id });
    res.status(201).json(deleteEmployee);
  } catch (error) {
    res.status(400).json(error);
  }
});


//Search data with multiple fields
router.get("/searchemployee/:key", async (req, res) => {
  try {
    const { key } = req.params;
    const searchEmp = await employees.find({
      $or: [
        { name: { $regex: key } },
        { email: { $regex: key } },
        { userId: { $regex: key } },
        { work: { $regex: key } },
        { add: { $regex: key } },
      ],
    });
    res.status(201).json(searchEmp);
  } catch (error) {
    res.status(400).json(error);
  }
});

module.exports = router;
