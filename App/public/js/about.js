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
    <h3>User Information</h3>
    <p><strong>Full Name:</strong> ${user.fullName}</p>
    <p><strong>Email:</strong> ${user.email}</p>
    <p><strong>Residence:</strong> ${user.residence}</p>
    <p><strong>Phone:</strong> ${user.phone}</p>
    <p><strong>Level of Study:</strong> ${user.level}</p>
    <p><strong>Sex:</strong> ${user.sex}</p>
  `;
});

function logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  alert('Logged out successfully');
  window.location.href = 'login.html';
}
