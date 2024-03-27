// routes/student.js
const express = require('express');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const router = express.Router();

// Create a new student
router.post('/students', async (req, res) => {
    const { name, email, dateOfBirth } = req.body;
    try {
        const newStudent = await prisma.student.create({
            data: {
                name,
                email,
                date_of_birth: new Date(dateOfBirth)
            }
        });
        res.json(newStudent);
    } catch (error) {
        console.error('Error creating student:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Get all students
router.get('/students', async (req, res) => {
    try {
        const students = await prisma.student.findMany();
        res.json(students);
    } catch (error) {
        console.error('Error fetching students:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Get student by ID
router.get('/students/:id', async (req, res) => {
    const studentId = parseInt(req.params.id);
    try {
        const student = await prisma.student.findUnique({
            where: { student_id: studentId }, // Corrected field name
        });
        if (!student) {
            res.status(404).json({ error: 'Student not found' });
        } else {
            res.json(student);
        }
    } catch (error) {
        console.error('Error fetching student:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


// Update student
router.put('/students/:id', async (req, res) => {
    const studentId = parseInt(req.params.id);
    const { name, email, dateOfBirth } = req.body;
    try {
        // Check if dateOfBirth is a valid date string
        if (!isNaN(Date.parse(dateOfBirth))) {
            const updatedStudent = await prisma.student.update({
                where: { student_id: studentId },
                data: {
                    name,
                    email,
                    date_of_birth: new Date(dateOfBirth)
                }
            });
            res.json(updatedStudent);
        } else {
            // If dateOfBirth is not a valid date string, return a 400 Bad Request response
            res.status(400).json({ error: 'Invalid date format for dateOfBirth' });
        }
    } catch (error) {
        console.error('Error updating student:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


// Delete student
router.delete('/students/:id', async (req, res) => {
    const studentId = parseInt(req.params.id);
    try {
        await prisma.student.delete({
            where: { student_id: studentId }, // Corrected field name to match the Prisma model
        });
        res.status(204).end();
    } catch (error) {
        console.error('Error deleting student:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


module.exports = router;
