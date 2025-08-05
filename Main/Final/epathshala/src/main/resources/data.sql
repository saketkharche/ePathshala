-- Clear all existing data first
DELETE FROM exam_answer;
DELETE FROM exam_attempt;
DELETE FROM exam_question;
DELETE FROM exam;
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
ALTER TABLE exam AUTO_INCREMENT = 1;
ALTER TABLE exam_question AUTO_INCREMENT = 1;
ALTER TABLE exam_attempt AUTO_INCREMENT = 1;
ALTER TABLE exam_answer AUTO_INCREMENT = 1;

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

-- Create Sample Exams (with future dates)
INSERT INTO exam (title, description, duration_minutes, start_time, end_time, total_marks, negative_marking, negative_marking_percentage, is_active, course_id, created_by, created_at, updated_at) VALUES 
('Mathematics Mid-Term', 'Covers algebra and calculus topics', 90, DATE_ADD(NOW(), INTERVAL 1 DAY), DATE_ADD(NOW(), INTERVAL 1 DAY + INTERVAL 90 MINUTE), 100, true, 25.0, true, 1, 2, NOW(), NOW()),
('Science Quiz', 'Basic physics concepts and formulas', 60, DATE_ADD(NOW(), INTERVAL 2 DAY), DATE_ADD(NOW(), INTERVAL 2 DAY + INTERVAL 60 MINUTE), 50, false, 0.0, true, 2, 3, NOW(), NOW()),
('English Literature Test', 'Shakespeare and modern literature', 75, DATE_ADD(NOW(), INTERVAL 3 DAY), DATE_ADD(NOW(), INTERVAL 3 DAY + INTERVAL 75 MINUTE), 75, true, 20.0, true, 3, 4, NOW(), NOW());

-- Create Sample Exam Questions
INSERT INTO exam_question (exam_id, question_text, option_a, option_b, option_c, option_d, correct_answer, marks, difficulty, topic) VALUES 
(1, 'What is the derivative of x²?', 'x', '2x', 'x²', '2x²', 'B', 4, 'Medium', 'Calculus'),
(1, 'Solve for x: 2x + 5 = 13', '3', '4', '5', '6', 'B', 4, 'Easy', 'Algebra'),
(1, 'What is the value of sin(90°)?', '0', '1', '-1', '0.5', 'B', 4, 'Easy', 'Trigonometry'),
(2, 'What is the SI unit of force?', 'Joule', 'Newton', 'Watt', 'Pascal', 'B', 3, 'Easy', 'Physics'),
(2, 'Which planet is closest to the Sun?', 'Venus', 'Mercury', 'Mars', 'Earth', 'B', 3, 'Easy', 'Astronomy'),
(3, 'Who wrote "Romeo and Juliet"?', 'Charles Dickens', 'William Shakespeare', 'Jane Austen', 'Mark Twain', 'B', 5, 'Medium', 'Literature');

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

-- Create Forum Categories
INSERT INTO forum_category (name, description, icon) VALUES 
('Academic', 'Academic discussions and questions', 'School'),
('Technology', 'Technology and computer science discussions', 'Computer'),
('General', 'General discussions and announcements', 'Chat');

-- Create Forum Threads
INSERT INTO forum_thread (title, content, author_name, author_id, category_id, is_pinned, is_locked, view_count, reply_count, created_at, updated_at, last_reply_at) VALUES 
('Welcome to ePathshala Forum!', 'Welcome everyone to our new forum! Feel free to ask questions and share your thoughts.', 'Admin User', 1, 1, true, false, 25, 3, NOW(), NOW(), NOW()),
('Math Homework Help', 'I need help with algebra problem #15 on page 45. Can anyone explain the solution?', 'Alice Johnson', 8, 1, false, false, 12, 2, NOW(), NOW(), NOW()),
('New Computer Lab Setup', 'The new computer lab is now open for students. Please read the guidelines before using.', 'John Smith', 2, 2, false, false, 8, 1, NOW(), NOW(), NOW()),
('School Event Announcement', 'Annual sports day will be held next month. All students are encouraged to participate.', 'Admin User', 1, 3, false, false, 15, 0, NOW(), NOW(), NOW());

-- Create Forum Replies
INSERT INTO forum_reply (content, author_name, author_id, thread_id, parent_reply_id, reply_number, created_at, updated_at) VALUES 
('Thanks for the welcome! Looking forward to participating in discussions.', 'Alice Johnson', 8, 1, NULL, 1, NOW(), NOW()),
('Great to be here! This forum will be very helpful for students.', 'Bob Smith', 9, 1, NULL, 2, NOW(), NOW()),
('Welcome everyone! Feel free to ask any questions.', 'John Smith', 2, 1, NULL, 3, NOW(), NOW()),
('I can help you with that algebra problem. Let me explain step by step...', 'John Smith', 2, 2, NULL, 1, NOW(), NOW()); 