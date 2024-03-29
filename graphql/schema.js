// graphql/schema.js
const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Student {
    student_id: Int!
    name: String!
    email: String!
    date_of_birth: String!
  }

  type Course {
    course_id: Int!
    title: String!
    description: String!
    instructor: String!
  }

  type Enrollment {
    enrollment_id: Int!
    student_id: Int!
    course_id: Int!
    enrollment_date: String!
    grade: String
  }

  type Query {
    students: [Student!]!
    courses: [Course!]!
    enrollments: [Enrollment!]!
    studentById(student_id: Int!): Student
    courseById(course_id: Int!): Course
    enrollmentById(enrollment_id: Int!): Enrollment
  }

  type Mutation {
    createStudent(name: String!, email: String!, date_of_birth: String!): Student!
    createCourse(title: String!, description: String!, instructor: String!): Course!
    createEnrollment(student_id: Int!, course_id: Int!, enrollment_date: String!, grade: String): Enrollment!
    updateStudent(student_id: Int!, name: String!, email: String!, date_of_birth: String!): Student!
    updateCourse(course_id: Int!, title: String!, description: String!, instructor: String!): Course!
    updateEnrollment(enrollment_id: Int!, student_id: Int!, course_id: Int!, enrollment_date: String!, grade: String): Enrollment!
    deleteStudent(student_id: Int!): Boolean!
    deleteCourse(course_id: Int!): Boolean!
    deleteEnrollment(enrollment_id: Int!): Boolean!
  }
`;

module.exports = typeDefs;
