const fetch = require('node-fetch');

const BASE_URL = 'http://localhost:8081';
const BEARER_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJzdHVkZW50MUBlcGF0aHNoYWxhLmNvbSIsInJvbGUiOiJTVFVERU5UIiwiZXhwIjoxNzU0MDc2ODI0LCJpYXQiOjE3NTQwNDA4MjR9.8UUu9hG9jXcDcTDVcNK9Mg1_F4OKD2RiMsYHi7O53fg';

const headers = {
  'Authorization': `Bearer ${BEARER_TOKEN}`,
  'Content-Type': 'application/json'
};

async function testEndpoint(endpoint, description) {
  try {
    console.log(`\n🔍 Testing: ${description}`);
    console.log(`URL: ${BASE_URL}${endpoint}`);
    
    const response = await fetch(`${BASE_URL}${endpoint}`, { headers });
    const data = await response.json();
    
    console.log(`Status: ${response.status}`);
    console.log(`Response:`, JSON.stringify(data, null, 2));
    
    if (response.ok) {
      console.log('✅ SUCCESS');
    } else {
      console.log('❌ FAILED');
    }
  } catch (error) {
    console.log(`❌ ERROR: ${error.message}`);
  }
}

async function runTests() {
  console.log('🚀 Testing Student Endpoints with Bearer Token');
  console.log('=' .repeat(50));
  
  // Test basic endpoints
  await testEndpoint('/api/student/test-db', 'Database Test');
  await testEndpoint('/api/student/test-auth', 'Authentication Test');
  await testEndpoint('/api/student/debug/database', 'Debug Database');
  
  // Test data endpoints
  await testEndpoint('/api/student/attendance/1', 'Get Attendance (User ID 1)');
  await testEndpoint('/api/student/grades/1', 'Get Grades (User ID 1)');
  await testEndpoint('/api/student/assignments/Class%2010A', 'Get Assignments (Class 10A)');
  await testEndpoint('/api/student/leave/1', 'Get Leave Status (User ID 1)');
  
  console.log('\n🎯 Tests completed!');
}

runTests(); 