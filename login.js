document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  auth.signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      alert("Login successful!");
      // Redirect to dashboard or protected page
      window.location.href = "about.html"
    })
    .catch((error) => {
      alert("Login failed: " + error.message);
    });
});
