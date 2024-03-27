// routes/course.js
const express = require('express');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const router = express.Router();

// Create a new course
router.post('/courses', async (req, res) => {
    const { title, description, instructor } = req.body;
    try {
        const newCourse = await prisma.course.create({
            data: {
                title,
                description,
                instructor
            }
        });
        res.json(newCourse);
    } catch (error) {
        console.error('Error creating course:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Get all courses
router.get('/courses', async (req, res) => {
    try {
        const courses = await prisma.course.findMany();
        res.json(courses);
    } catch (error) {
        console.error('Error fetching courses:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Get course by ID
router.get('/courses/:id', async (req, res) => {
    const courseId = parseInt(req.params.id);
    try {
        const course = await prisma.course.findUnique({
            where: { course_id: courseId }, // Use course_id instead of id
        });
        if (!course) {
            res.status(404).json({ error: 'Course not found' });
        } else {
            res.json(course);
        }
    } catch (error) {
        console.error('Error fetching course:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


// Update course
router.put('/courses/:id', async (req, res) => {
    const courseId = parseInt(req.params.id);
    const { title, description, instructor } = req.body;
    try {
        const updatedCourse = await prisma.course.update({
            where: { course_id: courseId },
            data: {
                title,
                description,
                instructor
            }
        });
        res.json(updatedCourse);
    } catch (error) {
        console.error('Error updating course:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Delete course
router.delete('/courses/:id', async (req, res) => {
    const courseId = parseInt(req.params.id);
    try {
        await prisma.course.delete({
            where: { course_id: courseId },
        });
        res.status(204).end();
    } catch (error) {
        if (error.code === 'P2003') {
            // Handle foreign key constraint violation error
            res.status(400).json({ error: 'Cannot delete course because it is referenced by other records' });
        } else {
            // Handle other errors
            console.error('Error deleting course:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
});

module.exports = router;