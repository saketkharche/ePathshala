// Test script to check all APIs
const BASE_URL = 'http://localhost:8081';

async function testAPI(endpoint, method = 'GET', body = null) {
    try {
        const options = {
            method,
            headers: {
                'Content-Type': 'application/json',
            }
        };
        
        if (body) {
            options.body = JSON.stringify(body);
        }
        
        console.log(`Testing ${method} ${endpoint}...`);
        const response = await fetch(`${BASE_URL}${endpoint}`, options);
        console.log(`Status: ${response.status}`);
        
        if (response.ok) {
            const data = await response.json();
            console.log('Response:', data);
            return true;
        } else {
            const errorText = await response.text();
            console.log('Error:', errorText);
            return false;
        }
    } catch (error) {
        console.log('Network error:', error.message);
        return false;
    }
}

async function testAllAPIs() {
    console.log('🧪 Testing all APIs...\n');
    
    // Test basic endpoints
    await testAPI('/api/auth/test');
    await testAPI('/actuator/health');
    
    // Test authentication endpoints
    await testAPI('/api/auth/login', 'POST', {
        email: 'student1@epathshala.com',
        password: 'password'
    });
    
    // Test online classes endpoints (without auth for now)
    await testAPI('/api/student/online-classes/available');
    
    console.log('\n✅ API testing completed!');
}

testAllAPIs(); 