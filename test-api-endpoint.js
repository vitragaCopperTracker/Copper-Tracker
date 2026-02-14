const fetch = require('node-fetch');

async function testEndpoint() {
  try {
    console.log('Testing general-news API endpoint...\n');
    
    // Test local endpoint
    const response = await fetch('http://localhost:3000/api/general-news');
    console.log('Status:', response.status);
    console.log('Status Text:', response.statusText);
    
    if (response.ok) {
      const data = await response.json();
      console.log('\nData received:', data.length, 'records');
      if (data.length > 0) {
        console.log('\nFirst record:');
        console.log(JSON.stringify(data[0], null, 2));
      }
    } else {
      console.log('Error response:', await response.text());
    }
  } catch (error) {
    console.error('Error:', error.message);
    console.log('\nNote: Make sure the Next.js dev server is running on port 3000');
  }
}

testEndpoint();
