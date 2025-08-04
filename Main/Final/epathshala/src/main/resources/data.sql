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
('I can help you with that algebra problem. Let me explain step by step...', 'John Smith', 2, 2, NULL, 1, NOW(), NOW()),

-- Create Sample Online Classes
INSERT INTO online_class (title, subject, description, scheduled_time, duration, max_participants, current_participants, room_id, meeting_url, status, teacher_id, created_at, updated_at) VALUES 
('Advanced Mathematics Session', 'Mathematics', 'Advanced algebra and calculus concepts for Class 10A students', NOW() + INTERVAL 1 HOUR, 60, 30, 5, 'math-advanced-2024', 'https://meet.jit.si/math-advanced-2024', 'active', 1, NOW(), NOW()),
('Science Lab Discussion', 'Science', 'Interactive science lab session covering physics experiments', NOW() + INTERVAL 2 HOUR, 45, 25, 3, 'science-lab-2024', 'https://meet.jit.si/science-lab-2024', 'scheduled', 2, NOW(), NOW()),
('English Literature Class', 'English', 'Discussion on Shakespeare and modern literature', NOW() + INTERVAL 3 HOUR, 90, 35, 8, 'english-lit-2024', 'https://meet.jit.si/english-lit-2024', 'scheduled', 3, NOW(), NOW()),
('Computer Science Workshop', 'Computer Science', 'Programming fundamentals and coding practice', NOW() - INTERVAL 1 HOUR, 75, 20, 15, 'cs-workshop-2024', 'https://meet.jit.si/cs-workshop-2024', 'completed', 1, NOW(), NOW()),
('Mathematics Review Session', 'Mathematics', 'Quick review of important topics before exams', NOW() + INTERVAL 30 MINUTE, 30, 40, 12, 'math-review-2024', 'https://meet.jit.si/math-review-2024', 'active', 1, NOW(), NOW()),
('Science Quiz Session', 'Science', 'Interactive quiz on biology and chemistry topics', NOW() + INTERVAL 4 HOUR, 60, 30, 6, 'science-quiz-2024', 'https://meet.jit.si/science-quiz-2024', 'scheduled', 2, NOW(), NOW());
('Thank you so much for the explanation! It makes sense now.', 'Alice Johnson', 8, 2, 4, 2, NOW(), NOW()),
('The computer lab guidelines are posted on the notice board. Please check them.', 'Sarah Johnson', 3, 3, NULL, 1, NOW(), NOW());

-- Create Sample Notifications
INSERT INTO notification (title, content, type, priority, sender_id, recipient_id, is_read, is_global, target_role, created_at, expires_at, action_url, action_text) VALUES 
('Welcome to ePathshala', 'Welcome to our new learning platform!', 'ANNOUNCEMENT', 'HIGH', 1, NULL, false, true, 'ALL', NOW(), DATE_ADD(NOW(), INTERVAL 30 DAY), '/announcements', 'View Announcement'),
('New Assignment Posted', 'Math homework has been assigned. Due date: 7 days', 'ASSIGNMENT', 'MEDIUM', 2, 8, false, false, 'STUDENT', NOW(), DATE_ADD(NOW(), INTERVAL 7 DAY), '/assignments', 'View Assignment'),
('Forum Reply Notification', 'Someone replied to your thread "Math Homework Help"', 'FORUM_REPLY', 'LOW', 2, 8, false, false, 'STUDENT', NOW(), DATE_ADD(NOW(), INTERVAL 7 DAY), '/forum/thread/2', 'View Reply'); 