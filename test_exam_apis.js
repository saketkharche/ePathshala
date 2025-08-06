// Test script for Exam APIs
const axios = require('axios');

const BASE_URL = 'http://localhost:8081';

// Test data
const testCredentials = {
  student: {
    email: 'student1@epathshala.com',
    password: 'admin123'
  },
  teacher: {
    email: 'teacher1@epathshala.com', 
    password: 'admin123'
  }
};

let studentToken = '';
let teacherToken = '';

async function login(email, password, role) {
  try {
    console.log(`Attempting login for: ${email} with role: ${role}`);
    const response = await axios.post(`${BASE_URL}/api/auth/login`, {
      email,
      password,
      role
    });
    console.log(`✅ Login successful for: ${email}`);
    return response.data.token;
  } catch (error) {
    console.error(`❌ Login failed for ${email}:`, error.response?.data || error.message);
    return null;
  }
}

async function testStudentExams() {
  console.log('\n=== Testing Student Exam APIs ===');
  
  if (!studentToken) {
    console.error('❌ No student token available');
    return;
  }
  
  // Test get available exams
  try {
    console.log('Calling /api/student/exams/available...');
    const response = await axios.get(`${BASE_URL}/api/student/exams/available`, {
      headers: { Authorization: `Bearer ${studentToken}` }
    });
    console.log('✅ GET /api/student/exams/available - SUCCESS');
    console.log('Found exams:', response.data.length);
    console.log('Exam data:', JSON.stringify(response.data, null, 2));
  } catch (error) {
    console.error('❌ GET /api/student/exams/available - FAILED');
    console.error('Status:', error.response?.status);
    console.error('Error:', error.response?.data || error.message);
    if (error.response?.data) {
      console.error('Response data:', JSON.stringify(error.response.data, null, 2));
    }
  }
}

async function testTeacherExams() {
  console.log('\n=== Testing Teacher Exam APIs ===');
  
  if (!teacherToken) {
    console.error('❌ No teacher token available');
    return;
  }
  
  // Test get faculty exams
  try {
    console.log('Calling /api/faculty/exams...');
    const response = await axios.get(`${BASE_URL}/api/faculty/exams`, {
      headers: { Authorization: `Bearer ${teacherToken}` }
    });
    console.log('✅ GET /api/faculty/exams - SUCCESS');
    console.log('Found exams:', response.data.length);
    console.log('Exam data:', JSON.stringify(response.data, null, 2));
  } catch (error) {
    console.error('❌ GET /api/faculty/exams - FAILED');
    console.error('Status:', error.response?.status);
    console.error('Error:', error.response?.data || error.message);
    if (error.response?.data) {
      console.error('Response data:', JSON.stringify(error.response.data, null, 2));
    }
  }
}

async function runTests() {
  console.log('🔐 Logging in as student...');
  studentToken = await login(testCredentials.student.email, testCredentials.student.password, 'STUDENT');
  
  console.log('🔐 Logging in as teacher...');
  teacherToken = await login(testCredentials.teacher.email, testCredentials.teacher.password, 'TEACHER');
  
  if (!studentToken) {
    console.error('❌ Student login failed');
    return;
  }
  
  if (!teacherToken) {
    console.error('❌ Teacher login failed');
    return;
  }
  
  console.log('✅ Login successful');
  
  await testStudentExams();
  await testTeacherExams();
  
  console.log('\n=== Test Complete ===');
}

runTests().catch(console.error); 