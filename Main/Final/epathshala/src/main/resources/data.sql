-- Clear all existing data first
DELETE FROM attendance;
DELETE FROM grade;
DELETE FROM assignment;
DELETE FROM leave_request;
DELETE FROM student;
DELETE FROM parent;
DELETE FROM teacher;
DELETE FROM user;

-- Reset auto-increment counters
ALTER TABLE user AUTO_INCREMENT = 1;
ALTER TABLE student AUTO_INCREMENT = 1;
ALTER TABLE teacher AUTO_INCREMENT = 1;
ALTER TABLE parent AUTO_INCREMENT = 1;
ALTER TABLE attendance AUTO_INCREMENT = 1;
ALTER TABLE grade AUTO_INCREMENT = 1;
ALTER TABLE assignment AUTO_INCREMENT = 1;
ALTER TABLE leave_request AUTO_INCREMENT = 1;

-- Create Admin User
INSERT INTO user (name, email, password, role) VALUES 
('Admin User', 'admin@epathshala.com', '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9lBOsl7iKTVEFDa', 'ADMIN');

-- Create Teachers
INSERT INTO user (name, email, password, role) VALUES 
('John Smith', 'teacher1@epathshala.com', '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9lBOsl7iKTVEFDa', 'TEACHER'),
('Sarah Johnson', 'teacher2@epathshala.com', '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9lBOsl7iKTVEFDa', 'TEACHER'),
('Mike Wilson', 'teacher3@epathshala.com', '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9lBOsl7iKTVEFDa', 'TEACHER');

INSERT INTO teacher (user_id, subject, assigned_class) VALUES 
(2, 'Mathematics', 'Class 10A'),
(3, 'Science', 'Class 10B'),
(4, 'English', 'Class 9A');

-- Create Parents
INSERT INTO user (name, email, password, role) VALUES 
('Robert Johnson', 'parent1@epathshala.com', '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9lBOsl7iKTVEFDa', 'PARENT'),
('Mary Williams', 'parent2@epathshala.com', '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9lBOsl7iKTVEFDa', 'PARENT'),
('David Brown', 'parent3@epathshala.com', '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9lBOsl7iKTVEFDa', 'PARENT');

INSERT INTO parent (user_id) VALUES 
(5), (6), (7);

-- Create Students
INSERT INTO user (name, email, password, role) VALUES 
('Alice Johnson', 'student1@epathshala.com', '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9lBOsl7iKTVEFDa', 'STUDENT'),
('Bob Smith', 'student2@epathshala.com', '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9lBOsl7iKTVEFDa', 'STUDENT'),
('Charlie Brown', 'student3@epathshala.com', '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9lBOsl7iKTVEFDa', 'STUDENT');

INSERT INTO student (user_id, student_class, parent_id) VALUES 
(8, 'Class 10A', 1),
(9, 'Class 10B', 2),
(10, 'Class 9A', 3);

-- Create Sample Attendance Records
INSERT INTO attendance (student_id, date, status, marked_by_id) VALUES 
(1, CURDATE() - INTERVAL 4 DAY, 'Present', 1),
(1, CURDATE() - INTERVAL 3 DAY, 'Absent', 1),
(1, CURDATE() - INTERVAL 2 DAY, 'Present', 1),
(1, CURDATE() - INTERVAL 1 DAY, 'Present', 1),
(1, CURDATE(), 'Absent', 1);

-- Create Sample Grades
INSERT INTO grade (student_id, subject, marks, teacher_id) VALUES 
(1, 'Mathematics', 92.5, 1),
(1, 'Science', 88.0, 1),
(1, 'English', 95.5, 1);

-- Create Sample Assignments
INSERT INTO assignment (title, subject, class_name, due_date, teacher_id) VALUES 
('Math Homework', 'Mathematics', 'Class 10A', CURDATE() + INTERVAL 7 DAY, 1),
('Science Project', 'Science', 'Class 10A', CURDATE() + INTERVAL 10 DAY, 1),
('English Essay', 'English', 'Class 10A', CURDATE() + INTERVAL 5 DAY, 1);

-- Create Sample Leave Requests
INSERT INTO leave_request (student_id, reason, from_date, to_date, teacher_approval, parent_approval, status) VALUES 
(1, 'Medical appointment', CURDATE() + INTERVAL 1 DAY, CURDATE() + INTERVAL 2 DAY, 'Pending', 'Pending', 'Pending'),
(1, 'Family function', CURDATE() + INTERVAL 3 DAY, CURDATE() + INTERVAL 4 DAY, 'Pending', 'Pending', 'Pending'),
(1, 'Personal emergency', CURDATE() + INTERVAL 5 DAY, CURDATE() + INTERVAL 6 DAY, 'Pending', 'Pending', 'Pending'); 