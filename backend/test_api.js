async function test() {
  try {
    // 1. Signup a test user
    const r1 = Math.random().toString(36).substring(7);
    const res1 = await fetch('http://localhost:5000/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: `testuser_${r1}`,
        email: `test${r1}@example.com`,
        password: 'password123'
      })
    });
    const data1 = await res1.json();
    if (!res1.ok) throw new Error(JSON.stringify(data1));
    console.log('Signup successful:', data1);
    
    // Login to get token
    const res2 = await fetch('http://localhost:5000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: `test${r1}@example.com`,
        password: 'password123'
      })
    });
    const data2 = await res2.json();
    if (!res2.ok) throw new Error(JSON.stringify(data2));
    const token = data2.token;
    console.log('Login successful, token received');
    
    // 2. Create a post
    const formData = new FormData();
    formData.append('content', 'Hello World!');

    const res3 = await fetch('http://localhost:5000/api/posts', {
      method: 'POST',
      headers: { 
        'Authorization': `Bearer ${token}` 
        // Note: Do not set Content-Type for FormData, fetch does it automatically
      },
      body: formData
    });
    const data3 = await res3.json();
    if (!res3.ok) throw new Error(JSON.stringify(data3));
    const post = data3;
    console.log('Post created:', post);
    
    // 3. Like the post
    const res4 = await fetch(`http://localhost:5000/api/posts/${post._id}/like`, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${token}` }
    });
    const data4 = await res4.json();
    if (!res4.ok) throw new Error(JSON.stringify(data4));
    console.log('Post liked:', data4.likes);
    
    // 4. Comment on the post
    const res5 = await fetch(`http://localhost:5000/api/posts/${post._id}/comment`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` 
      },
      body: JSON.stringify({ text: 'Nice post!' })
    });
    const data5 = await res5.json();
    if (!res5.ok) throw new Error(JSON.stringify(data5));
    console.log('Post commented:', data5.comments);
    
  } catch (err) {
    console.error('Error:', err.message);
  }
}

test();
