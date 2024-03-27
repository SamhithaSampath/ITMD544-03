// JavaScript for CRUD operations

document.addEventListener("DOMContentLoaded", function() {
    // Function to create a new student
    const createStudent = async (formData) => {
        try {
            const response = await fetch('http://localhost:3000/api/students', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            const data = await response.json();
            console.log('New student created:', data);
        } catch (error) {
            console.error('Error creating student:', error);
        }
    };

    // Function to create a new course
    const createCourse = async (formData) => {
        try {
            const response = await fetch('http://localhost:3000/api/courses', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            const data = await response.json();
            console.log('New course created:', data);
        } catch (error) {
            console.error('Error creating course:', error);
        }
    };

    // Function to create a new enrollment
    const createEnrollment = async (formData) => {
        try {
            const response = await fetch('http://localhost:3000/api/enrollments', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            const data = await response.json();
            console.log('New enrollment created:', data);
        } catch (error) {
            console.error('Error creating enrollment:', error);
        }
    };

    // Function to add event listeners to the forms
    const addFormListeners = () => {
        // Student Form
        document.getElementById('studentForm').addEventListener('submit', async (event) => {
            event.preventDefault(); // Prevent the default form submission behavior
            const formData = new FormData(event.target);
            const studentData = {
                name: formData.get('name'),
                email: formData.get('email'),
                dateOfBirth: formData.get('dateOfBirth')
            };
            await createStudent(studentData); // Call the createStudent function
            // Fetch and display students again to update the list
            fetchAndDisplayStudents();
        });

        // Course Form
        document.getElementById('courseForm').addEventListener('submit', async (event) => {
            event.preventDefault(); // Prevent the default form submission behavior
            const formData = new FormData(event.target);
            const courseData = {
                title: formData.get('title'),
                description: formData.get('description'),
                instructor: formData.get('instructor')
            };
            await createCourse(courseData); // Call the createCourse function
            // Fetch and display courses again to update the list
            fetchAndDisplayCourses();
        });

        // Enrollment Form
        document.getElementById('enrollmentForm').addEventListener('submit', async (event) => {
            event.preventDefault(); // Prevent the default form submission behavior
            const formData = new FormData(event.target);

            // Convert string values to integers using parseInt() or Number()
            const studentId = parseInt(formData.get('studentId'));
            const courseId = parseInt(formData.get('courseId'));

            const enrollmentData = {
                studentId: studentId,
                courseId: courseId,
                enrollmentDate: formData.get('enrollmentDate'),
                grade: formData.get('grade')
            };
            await createEnrollment(enrollmentData); // Call the createEnrollment function
            // Fetch and display enrollments again to update the list
            fetchAndDisplayEnrollments();
        });

    };

    addFormListeners(); // Call the function to add form event listeners

    // Function to fetch all students and display them
    const fetchAndDisplayStudents = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/students');
            const data = await response.json();
            console.log('All students:', data);
            displayStudents(data); // Call function to display students
        } catch (error) {
            console.error('Error fetching students:', error);
        }
    };

    fetchAndDisplayStudents(); // Call the function to fetch and display students

    // Function to fetch a single student by ID
    const fetchStudentById = async (studentId) => {
        try {
            const response = await fetch(`http://localhost:3000/api/students/${studentId}`);
            const data = await response.json();
            console.log('Student by ID:', data);
        } catch (error) {
            console.error('Error fetching student by ID:', error);
        }
    };

    // Function to update a student
    const updateStudent = async (studentId, formData) => {
        try {
            console.log('Form Data:', formData); // Add this line for debugging
    
            const { name, email, dateOfBirth } = formData;
    
            // Validate if dateOfBirth is a valid date
            if (!Date.parse(dateOfBirth)) {
                throw new Error('Invalid date format for date of birth');
            }
    
            // Format dateOfBirth as YYYY-MM-DD
            const formattedDateOfBirth = new Date(dateOfBirth).toISOString().split('T')[0];
    
            console.log('Formatted date of birth:', formattedDateOfBirth);
    
            const updatedStudent = await prisma.student.update({
                where: {
                    student_id: studentId
                },
                data: {
                    name: name,
                    email: email,
                    date_of_birth: formattedDateOfBirth
                }
            });
    
            console.log('Updated student:', updatedStudent);
        } catch (error) {
            console.error('Error updating student:', error);
        }
    };
    


    // Function to delete a student
    const deleteStudent = async (studentId) => {
        try {
            const response = await fetch(`http://localhost:3000/api/students/${studentId}`, {
                method: 'DELETE',
            });
            console.log('Student deleted:', response.status);
        } catch (error) {
            console.error('Error deleting student:', error);
        }
    };


    // Function to fetch all courses and display them
    const fetchAndDisplayCourses = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/courses');
            const data = await response.json();
            console.log('All courses:', data);
            displayCourses(data); // Call function to display courses
        } catch (error) {
            console.error('Error fetching courses:', error);
        }
    };

    fetchAndDisplayCourses(); // Call the function to fetch and display courses

    // Function to fetch a single course by ID
    const fetchCourseById = async (courseId) => {
        try {
            const response = await fetch(`http://localhost:3000/api/courses/${courseId}`);
            const data = await response.json();
            console.log('Course by ID:', data);
        } catch (error) {
            console.error('Error fetching course by ID:', error);
        }
    };

    // Function to update a course
    const updateCourse = async (courseId, formData) => {
        try {
            const response = await fetch(`http://localhost:3000/api/courses/${courseId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            const data = await response.json();
            console.log('Updated course:', data);
        } catch (error) {
            console.error('Error updating course:', error);
        }
    };

    // Function to delete a course
    const deleteCourse = async (courseId) => {
        try {
            const response = await fetch(`http://localhost:3000/api/courses/${courseId}`, {
                method: 'DELETE',
            });
            console.log('Course deleted:', response.status);
        } catch (error) {
            console.error('Error deleting course:', error);
        }
    };

    // Function to fetch all enrollments and display them
    const fetchAndDisplayEnrollments = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/enrollments');
            const data = await response.json();
            console.log('All enrollments:', data);
            displayEnrollments(data); // Call function to display enrollments
        } catch (error) {
            console.error('Error fetching enrollments:', error);
        }
    };

    fetchAndDisplayEnrollments(); // Call the function to fetch and display enrollments

    // Function to fetch a single enrollment by ID
    const fetchEnrollmentById = async (enrollmentId) => {
        try {
            const response = await fetch(`http://localhost:3000/api/enrollments/${enrollmentId}`);
            const data = await response.json();
            console.log('Enrollment by ID:', data);
        } catch (error) {
            console.error('Error fetching enrollment by ID:', error);
        }
    };

    // Function to update an enrollment
    const updateEnrollment = async (enrollmentId, formData) => {
        try {
            const { studentId, courseId, enrollmentDate, grade } = formData;
            console.log('Enrollment Date:', enrollmentDate); // Add this line for debugging
    
            // Validate if enrollmentDate is a valid date
            if (!Date.parse(enrollmentDate)) {
                throw new Error('Invalid date format for enrollment date');
            }
    
            // Format enrollmentDate as YYYY-MM-DD
            const formattedEnrollmentDate = new Date(enrollmentDate).toISOString().split('T')[0];
    
            console.log('Formatted enrollment date:', formattedEnrollmentDate);
    
            const response = await fetch(`http://localhost:3000/api/enrollments/${enrollmentId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    studentId: studentId,
                    courseId: courseId,
                    enrollmentDate: formattedEnrollmentDate,
                    grade: grade
                }),
            });
            const data = await response.json();
            console.log('Updated enrollment:', data);
        } catch (error) {
            console.error('Error updating enrollment:', error);
        }
    };

    // Function to delete an enrollment
    const deleteEnrollment = async (enrollmentId) => {
        try {
            const response = await fetch(`http://localhost:3000/api/enrollments/${enrollmentId}`, {
                method: 'DELETE',
            });
            console.log('Enrollment deleted:', response.status);
        } catch (error) {
            console.error('Error deleting enrollment:', error);
        }
    };

    // Function to create buttons for update and delete operations
    //const createButtons = (id, type) => {
    //    const updateButton = `<button onclick="update${type}(${id})">Update</button>`;
    //    const deleteButton = `<button onclick="delete${type}(${id})">Delete</button>`;
    //    return `${updateButton} ${deleteButton}`;
    //};

    // Function to create buttons for update and delete operations
const createButtons = (id, type) => {
    const updateButton = `<button class="update-btn" data-id="${id}" data-type="${type}">Update</button>`;
    const deleteButton = `<button class="delete-btn" data-id="${id}" data-type="${type}">Delete</button>`;
    return `${updateButton} ${deleteButton}`;
};

// Add event listeners for update and delete buttons
const addButtonsListeners = () => {
    document.querySelectorAll('.update-btn').forEach(button => {
        button.addEventListener('click', async (event) => {
            console.log('Update button clicked');
            const id = event.target.dataset.id;
            const type = event.target.dataset.type;

            const row = event.target.closest('.student-row, .course-row, .enrollment-row');
            
            // Check if the row element exists
            if (row) {
                // Get form data
                const formData = {
                    name: row.querySelector('.name-input').value,
                    email: row.querySelector('.email-input').value,
                    dateOfBirth: row.querySelector('.dateOfBirth-input').value
                };

                // Format dateOfBirth to ISO 8601 format
                const formattedDateOfBirth = new Date(formData.dateOfBirth).toISOString();
                formData.dateOfBirth = formattedDateOfBirth;

                if (type === 'Student') {
                    await updateStudent(id, formData);
                } else if (type === 'Course') {
                    await updateCourse(id, formData);
                } else if (type === 'Enrollment') {
                    await updateEnrollment(id, formData);
                }

                fetchAndDisplayStudents();
                fetchAndDisplayCourses();
                fetchAndDisplayEnrollments();
            } else {
                console.error('Row element not found.');
            }
        });
    });
    
    document.querySelectorAll('.delete-btn').forEach(button => {
        button.addEventListener('click', async (event) => {
            console.log('Delete button clicked'); // Add this line for debugging
            const id = event.target.dataset.id;
            const type = event.target.dataset.type;
            console.log('ID:', id, 'Type:', type); // Add this line for debugging
            if (type === 'Student') {
                // Call the function to delete student
                await deleteStudent(id);
            } else if (type === 'Course') {
                // Call the function to delete course
                await deleteCourse(id);
            } else if (type === 'Enrollment') {
                // Call the function to delete enrollment
                await deleteEnrollment(id);
            }
            // After deleting, re-fetch and display the data
            fetchAndDisplayStudents();
            fetchAndDisplayCourses();
            fetchAndDisplayEnrollments();
        });
    });
};

// Call the function to add event listeners for buttons
addButtonsListeners();




// Function to display students on the UI
const displayStudents = (students) => {
    const studentList = document.getElementById('studentList');
    studentList.innerHTML = ''; // Clear existing content
    students.forEach(student => {
        const studentItem = document.createElement('div');
        studentItem.textContent = `ID: ${student.student_id}, Name: ${student.name}, Email: ${student.email}, Date of Birth: ${student.date_of_birth}`;
        
        // Create buttons for update and delete operations
        const buttons = createButtons(student.student_id, 'Student'); // Create buttons
        studentItem.innerHTML += buttons; // Append buttons to student item

        studentList.appendChild(studentItem);
    });
    addButtonsListeners();
};

// Function to display courses on the UI
const displayCourses = (courses) => {
    const courseList = document.getElementById('courseList');
    courseList.innerHTML = ''; // Clear existing content
    courses.forEach(course => {
        const courseItem = document.createElement('div');
        courseItem.textContent = `ID: ${course.course_id}, Title: ${course.title}, Description: ${course.description}, Instructor: ${course.instructor}`;
        
        // Create buttons for update and delete operations
        const buttons = createButtons(course.course_id, 'Course'); // Create buttons
        courseItem.innerHTML += buttons; // Append buttons to course item

        courseList.appendChild(courseItem);
    });
    addButtonsListeners();
};

// Function to display enrollments on the UI
const displayEnrollments = (enrollments) => {
    const enrollmentList = document.getElementById('enrollmentList');
    enrollmentList.innerHTML = ''; // Clear existing content
    enrollments.forEach(enrollment => {
        const enrollmentItem = document.createElement('div');
        enrollmentItem.textContent = `ID: ${enrollment.enrollment_id}, Student ID: ${enrollment.student_id}, Course ID: ${enrollment.course_id}, Enrollment Date: ${enrollment.enrollment_date}, Grade: ${enrollment.grade}`;
        
        // Create buttons for update and delete operations
        const buttons = createButtons(enrollment.enrollment_id, 'Enrollment'); // Create buttons
        enrollmentItem.innerHTML += buttons; // Append buttons to enrollment item

        enrollmentList.appendChild(enrollmentItem);
    });
    addButtonsListeners();
};

});





   




