import express from "express";
import { Student } from "../models/studentModel.js";

const router = express.Router();

// Create a new student
router.post("/", async (req, res) => {
    try {
        const { Fname, Surname, Lastname, Email, AdmNo, Class, ParentName, DOB, ParentPhoneNo, MedicalCondition, ConditionDetails } = req.body;

        // Check if required fields are missing
        if (!Fname || !Surname || !Lastname || !Email || !AdmNo || !Class || !ParentName || !DOB || !ParentPhoneNo) {
            return res.status(400).send({ message: 'Fill all the required fields' });
        }

        // Check if the email already exists
        const existingStudent = await Student.findOne({ Email });
        if (existingStudent) {
            return res.status(400).send({ message: 'Email already exists. Please use a different Email.' });
        }

        const newStudent = {
            Fname,
            Surname,
            Lastname,
            Email,
            AdmNo,
            Class,
            ParentName,
            DOB,
            ParentPhoneNo,
            MedicalCondition,
            ConditionDetails,
        };

        const student = await Student.create(newStudent);
        return res.status(201).send(student);
    } catch (err) {
        console.error(err.message);
        return res.status(500).send({ message: err.message });
    }
});

// Get all students
router.get("/", async (req, res) => {
    try {
        const students = await Student.find({});
        return res.status(200).json({
            count: students.length,
            data: students,
        });
    } catch (err) {
        console.error(err.message);
        return res.status(500).send({ message: err.message });
    }
});

// Get a specific student by ID
router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const student = await Student.findById(id);

        if (!student) {
            return res.status(404).send({ message: 'Student not found' });
        }

        return res.status(200).json(student);
    } catch (err) {
        console.error(err.message);
        return res.status(500).send({ message: 'Error retrieving the data' });
    }
});

// Update a student by ID
// Update a student by ID
// Update a student by ID
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { Fname, Surname, Lastname, Email, AdmNo, Class, ParentName, DOB, ParentPhoneNo, MedicalCondition, ConditionDetails } = req.body;

        // Check if required fields are missing
        if (!Fname || !Surname || !Lastname || !Email || !AdmNo || !Class || !ParentName || !DOB || !ParentPhoneNo) {
            return res.status(400).send({ message: 'Fill all the required fields' });
        }

        // Find the student to update
        const studentToUpdate = await Student.findById(id);
        if (!studentToUpdate) {
            return res.status(404).send({ message: 'Student not found' });
        }

        // If the email is being updated, check for uniqueness
        if (studentToUpdate.Email !== Email) {
            const existingStudent = await Student.findOne({ Email });
            if (existingStudent) {
                return res.status(400).send({ message: 'Email already exists. Please use a different Email.' });
            }
        }

        // Update the student information
        const updatedStudent = await Student.findByIdAndUpdate(id, req.body, { new: true });

        return res.status(200).send({ message: 'Student updated successfully', data: updatedStudent });
    } catch (err) {
        console.error(err.message);
        return res.status(500).send({ message: err.message });
    }
});



// Delete a student by ID
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const student = await Student.findByIdAndDelete(id);

        if (!student) {
            return res.status(404).send({ message: 'Student not found' });
        }

        return res.status(200).send({ message: 'Student deleted successfully' });
    } catch (err) {
        console.error(err.message);
        return res.status(500).send({ message: err.message });
    }
});

export default router;
