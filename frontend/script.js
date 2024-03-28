// JavaScript for CRUD operations

document.addEventListener("DOMContentLoaded", function() {
    const baseURL = 'https://itmd544-03.onrender.com/api'; // Update this with the actual URL of your backend API

    // Function to create a new student
    const createStudent = async (formData) => {
        try {
            const response = await fetch(`${baseURL}/students`, {
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
            const response = await fetch(`${baseURL}/courses`, {
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
            const response = await fetch(`${baseURL}/enrollments`, {
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
            const response = await fetch(`${baseURL}/students`);
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
            const response = await fetch(`${baseURL}/students/${studentId}`);
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
            const response = await fetch(`${baseURL}/students/${studentId}`, {
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
            const response = await fetch(`${baseURL}/courses`);
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
            const response = await fetch(`${baseURL}/courses/${courseId}`);
            const data = await response.json();
            console.log('Course by ID:', data);
        } catch (error) {
            console.error('Error fetching course by ID:', error);
        }
    };

    // Function to update a course
    const updateCourse = async (courseId, formData) => {
        try {
            const response = await fetch(`${baseURL}/courses/${courseId}`, {
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
        const response = await fetch(`${baseURL}/courses/${courseId}`, {
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
        const response = await fetch(`${baseURL}/enrollments`);
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
        const response = await fetch(`${baseURL}/enrollments/${enrollmentId}`);
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

        const response = await fetch(`${baseURL}/enrollments/${enrollmentId}`, {
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
        const response = await fetch(`${baseURL}/enrollments/${enrollmentId}`, {
            method: 'DELETE',
        });
        console.log('Enrollment deleted:', response.status);
    } catch (error) {
        console.error('Error deleting enrollment:', error);
    }
};

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
            console.log('Delete button clicked');
            const id = event.target.dataset.id;
           const type = event.target.dataset.type;

                if (confirm('Are you sure you want to delete this record?')) {
                    if (type === 'Student') {
                        await deleteStudent(id);
                    } else if (type === 'Course') {
                        await deleteCourse(id);
                    } else if (type === 'Enrollment') {
                        await deleteEnrollment(id);
                    }

                    fetchAndDisplayStudents();
                    fetchAndDisplayCourses();
                    fetchAndDisplayEnrollments();
                }
            });
        });
    };

    addButtonsListeners(); // Call the function to add event listeners for update and delete buttons

    // Function to display students in the HTML table
    const displayStudents = (students) => {
        const tableBody = document.getElementById('studentsTableBody');
        tableBody.innerHTML = ''; // Clear table body before rendering

        students.forEach(student => {
            const row = document.createElement('tr');
            row.classList.add('student-row');

            // Populate table cells with student data
            row.innerHTML = `
                <td>${student.id}</td>
                <td><input type="text" class="name-input" value="${student.name}" /></td>
                <td><input type="text" class="email-input" value="${student.email}" /></td>
                <td><input type="date" class="dateOfBirth-input" value="${new Date(student.dateOfBirth).toISOString().split('T')[0]}" /></td>
                <td>${createButtons(student.id, 'Student')}</td>
            `;

            tableBody.appendChild(row);
        });
    };

    // Function to display courses in the HTML table
    const displayCourses = (courses) => {
        const tableBody = document.getElementById('coursesTableBody');
        tableBody.innerHTML = ''; // Clear table body before rendering

        courses.forEach(course => {
            const row = document.createElement('tr');
            row.classList.add('course-row');

            // Populate table cells with course data
            row.innerHTML = `
                <td>${course.id}</td>
                <td><input type="text" class="title-input" value="${course.title}" /></td>
                <td><input type="text" class="description-input" value="${course.description}" /></td>
                <td><input type="text" class="instructor-input" value="${course.instructor}" /></td>
                <td>${createButtons(course.id, 'Course')}</td>
            `;

            tableBody.appendChild(row);
        });
    };

    // Function to display enrollments in the HTML table
    const displayEnrollments = (enrollments) => {
        const tableBody = document.getElementById('enrollmentsTableBody');
        tableBody.innerHTML = ''; // Clear table body before rendering

        enrollments.forEach(enrollment => {
            const row = document.createElement('tr');
            row.classList.add('enrollment-row');

            // Populate table cells with enrollment data
            row.innerHTML = `
                <td>${enrollment.id}</td>
                <td><input type="text" class="studentId-input" value="${enrollment.studentId}" /></td>
                <td><input type="text" class="courseId-input" value="${enrollment.courseId}" /></td>
                <td><input type="date" class="enrollmentDate-input" value="${new Date(enrollment.enrollmentDate).toISOString().split('T')[0]}" /></td>
                <td><input type="text" class="grade-input" value="${enrollment.grade}" /></td>
                <td>${createButtons(enrollment.id, 'Enrollment')}</td>
            `;

            tableBody.appendChild(row);
        });
    };
});





   




