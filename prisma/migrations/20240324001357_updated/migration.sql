-- CreateTable
CREATE TABLE "Student" (
    "student_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "date_of_birth" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Course" (
    "course_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "instructor" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Enrollment" (
    "enrollment_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "student_id" INTEGER NOT NULL,
    "course_id" INTEGER NOT NULL,
    "enrollment_date" DATETIME NOT NULL,
    "grade" TEXT,
    CONSTRAINT "Enrollment_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "Student" ("student_id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Enrollment_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "Course" ("course_id") ON DELETE RESTRICT ON UPDATE CASCADE
);
