// Use the current domain instead of hardcoded localhost
const API_URL = `${window.location.origin}/api/auth`;

document.getElementById('registerForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const fullName = document.getElementById('fullName').value;
  const residence = document.getElementById('residence').value;
  const phone = document.getElementById('phone').value;
  const level = document.getElementById('level').value;
  const sex = document.querySelector('input[name="sex"]:checked').value;
  const email = document.getElementById('registerEmail').value;
  const password = document.getElementById('registerPassword').value;

  try {
    const response = await fetch(`${API_URL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        fullName,
        residence,
        phone,
        level,
        sex,
        email,
        password
      }),
    });

    const data = await response.json();

    if (data.success) {
      // Store token in localStorage
      localStorage.setItem('token', data.data.token);
      localStorage.setItem('user', JSON.stringify(data.data));
      
      alert('Registration successful!');
      window.location.href = 'about.html';
    } else {
      alert(data.message || 'Registration failed');
    }
  } catch (error) {
    console.error('Error:', error);
    alert('An error occurred during registration');
  }
});
