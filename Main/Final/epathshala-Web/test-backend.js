// Test script to verify backend connectivity and authentication
// Run this in browser console or Node.js

async function testBackend() {
    console.log('🔍 Testing backend connectivity...');
    
    try {
        // Test 1: Health check
        console.log('\n1. Testing health endpoint...');
        const healthResponse = await fetch('http://localhost:8081/api/auth/status');
        console.log('Health status:', healthResponse.status);
        
        if (healthResponse.ok) {
            const healthData = await healthResponse.json();
            console.log('✅ Backend is running:', healthData);
        } else {
            console.log('❌ Backend health check failed');
            return;
        }
        
        // Test 2: Login endpoint
        console.log('\n2. Testing login endpoint...');
        const loginResponse = await fetch('http://localhost:8081/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: 'admin@test.com',
                password: 'admin123',
                role: 'ADMIN'
            })
        });
        
        console.log('Login status:', loginResponse.status);
        
        if (loginResponse.ok) {
            const loginData = await loginResponse.json();
            console.log('✅ Login successful:', {
                hasToken: !!loginData.token,
                role: loginData.role,
                userId: loginData.userId,
                name: loginData.name
            });
        } else {
            const errorData = await loginResponse.json().catch(() => ({ error: 'Unknown error' }));
            console.log('❌ Login failed:', errorData);
        }
        
    } catch (error) {
        console.log('❌ Network error:', error.message);
        console.log('💡 Make sure:');
        console.log('   - Backend server is running on port 8081');
        console.log('   - MySQL database is running');
        console.log('   - No firewall blocking the connection');
    }
}

// Test CORS
async function testCORS() {
    console.log('\n🔍 Testing CORS...');
    
    try {
        const response = await fetch('http://localhost:8081/api/auth/status', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        
        if (response.ok) {
            console.log('✅ CORS is working correctly');
        } else {
            console.log('❌ CORS issue detected');
        }
    } catch (error) {
        console.log('❌ CORS error:', error.message);
    }
}

// Test database connection
async function testDatabase() {
    console.log('\n🔍 Testing database connection...');
    
    try {
        const response = await fetch('http://localhost:8081/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: 'nonexistent@test.com',
                password: 'wrongpassword',
                role: 'ADMIN'
            })
        });
        
        const data = await response.json();
        
        if (data.error && data.error.includes('User not found')) {
            console.log('✅ Database is connected (user not found as expected)');
        } else if (data.error && data.error.includes('Bad credentials')) {
            console.log('✅ Database is connected (bad credentials as expected)');
        } else {
            console.log('❌ Database connection issue:', data);
        }
    } catch (error) {
        console.log('❌ Database test failed:', error.message);
    }
}

// Run all tests
async function runAllTests() {
    console.log('🚀 Starting backend tests...\n');
    
    await testBackend();
    await testCORS();
    await testDatabase();
    
    console.log('\n📋 Test Summary:');
    console.log('If you see ✅ marks, the backend is working correctly.');
    console.log('If you see ❌ marks, check the troubleshooting guide.');
}

// Export for Node.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { testBackend, testCORS, testDatabase, runAllTests };
}

// Auto-run in browser
if (typeof window !== 'undefined') {
    console.log('🌐 Running in browser - use runAllTests() to start testing');
    window.runAllTests = runAllTests;
    window.testBackend = testBackend;
    window.testCORS = testCORS;
    window.testDatabase = testDatabase;
}
