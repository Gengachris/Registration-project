// Check if user is logged in
window.addEventListener('DOMContentLoaded', () => {
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user'));

  if (!token || !user) {
    alert('Please login first');
    window.location.href = 'login.html';
    return;
  }

  // Display user information
  const userInfo = document.getElementById('userInfo');
  userInfo.innerHTML = `
    <h3>Welcome, ${user.fullName}!</h3>
    <p><strong>Email:</strong> ${user.email}</p>
    <p><strong>Level of Study:</strong> ${user.level}</p>
  `;
});

function goBack() {
  window.location.href = 'about.html';
}

function logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  alert('Logged out successfully');
  window.location.href = 'login.html';
}
