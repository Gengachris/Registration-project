// Use the current domain instead of hardcoded localhost
const API_URL = `${window.location.origin}/api/auth`;

document.getElementById('loginForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = document.getElementById('loginEmail').value;
  const password = document.getElementById('loginPassword').value;

  try {
    const response = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password
      }),
    });

    const data = await response.json();

    if (data.success) {
      // Store token in localStorage
      localStorage.setItem('token', data.data.token);
      localStorage.setItem('user', JSON.stringify(data.data));
      
      alert('Login successful!');
      window.location.href = 'about.html';
    } else {
      alert(data.message || 'Login failed');
    }
  } catch (error) {
    console.error('Error:', error);
    alert('An error occurred during login');
  }
});
