// routes/enrollment.js
const express = require('express');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const router = express.Router();

// Create a new enrollment
router.post('/enrollments', async (req, res) => {
    const { studentId, courseId, enrollmentDate, grade } = req.body;
    try {
        const newEnrollment = await prisma.enrollment.create({
            data: {
                student_id: studentId,
                course_id: courseId,
                enrollment_date: new Date(enrollmentDate),
                grade
            }
        });
        res.json(newEnrollment);
    } catch (error) {
        console.error('Error creating enrollment:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Get all enrollments
router.get('/enrollments', async (req, res) => {
    try {
        const enrollments = await prisma.enrollment.findMany();
        res.json(enrollments);
    } catch (error) {
        console.error('Error fetching enrollments:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Get enrollment by ID
router.get('/enrollments/:id', async (req, res) => {
    const enrollmentId = parseInt(req.params.id);
    try {
        const enrollment = await prisma.enrollment.findUnique({
            where: { enrollment_id: enrollmentId },
        });
        if (!enrollment) {
            res.status(404).json({ error: 'Enrollment not found' });
        } else {
            res.json(enrollment);
        }
    } catch (error) {
        console.error('Error fetching enrollment:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Update enrollment
router.put('/enrollments/:id', async (req, res) => {
    const enrollmentId = parseInt(req.params.id);
    const { studentId, courseId, enrollmentDate, grade } = req.body;
    try {
        // Attempt to parse the enrollment date
        const parsedDate = new Date(enrollmentDate);
        if (isNaN(parsedDate.getTime())) {
            throw new Error(`Invalid date format for enrollment date: ${enrollmentDate}`);
        }

        // Update the enrollment with the parsed date
        const updatedEnrollment = await prisma.enrollment.update({
            where: { enrollment_id: enrollmentId },
            data: {
                student_id: studentId,
                course_id: courseId,
                enrollment_date: parsedDate,
                grade
            }
        });
        res.json(updatedEnrollment);
    } catch (error) {
        console.error('Error updating enrollment:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});



// Delete enrollment
router.delete('/enrollments/:id', async (req, res) => {
    const enrollmentId = parseInt(req.params.id);
    try {
        await prisma.enrollment.delete({
            where: { enrollment_id: enrollmentId },
        });
        res.status(204).end();
    } catch (error) {
        console.error('Error deleting enrollment:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
