// graphql/resolvers.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
// Define resolver functions
const resolvers = {
  Query: {
    students: async () => {
      return await prisma.student.findMany();
    },
    courses: async () => {
      return await prisma.course.findMany();
    },
    enrollments: async () => {
      return await prisma.enrollment.findMany();
    },
  },
  Mutation: {
    createStudent: async (_, { name, email, date_of_birth }) => {
      return await prisma.student.create({
        data: { name, email, date_of_birth }
      });
    },
    createCourse: async (_, { title, description, instructor }) => {
      return await prisma.course.create({
        data: { title, description, instructor }
      });
    },
    createEnrollment: async (_, { student_id, course_id, enrollment_date, grade }) => {
      return await prisma.enrollment.create({
        data: { student_id, course_id, enrollment_date, grade }
      });
    },
    updateStudent: async (_, { student_id, name, email, date_of_birth }) => {
      return await prisma.student.update({
        where: { student_id },
        data: { name, email, date_of_birth }
      });
    },
    updateCourse: async (_, { course_id, title, description, instructor }) => {
      return await prisma.course.update({
        where: { course_id },
        data: { title, description, instructor }
      });
    },
    updateEnrollment: async (_, { enrollment_id, student_id, course_id, enrollment_date, grade }) => {
      return await prisma.enrollment.update({
        where: { enrollment_id },
        data: { student_id, course_id, enrollment_date, grade }
      });
    },
    deleteStudent: async (_, { student_id }) => {
      await prisma.student.delete({
        where: { student_id }
      });
      return true;
    },
    deleteCourse: async (_, { course_id }) => {
      await prisma.course.delete({
        where: { course_id }
      });
      return true;
    },
    deleteEnrollment: async (_, { enrollment_id }) => {
      await prisma.enrollment.delete({
        where: { enrollment_id }
      });
      return true;
    },
  },
};                                                                                                                                                                                                                       
module.exports = resolvers;                                                                                                                                                                                                                     module.exports = resolvers;                                                                                                                                                                                                                      module.exports = resolvers;
