
const db = firebase.firestore();

document.getElementById("registerForm").addEventListener("submit", function (e) {
  e.preventDefault();

 const registerBtn = this.querySelector('button[type="submit"]');
  registerBtn.disabled = true;
  registerBtn.textContent = "Creating Account...";

  const fullName = document.getElementById("fullName").value;
  const residence = document.getElementById("residence").value;
  const phone = document.getElementById("phone").value;
  const level = document.getElementById("level").value;
  const sex = document.querySelector('input[name="sex"]:checked').value;
  const email = document.getElementById("registerEmail").value;
  const password = document.getElementById("registerPassword").value;

  auth.createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      return db.collection("users").doc(user.uid).set({
        fullName: fullName,
        residence: residence,
        phone: phone,
        levelOfStudy: level,
        sex: sex,
        email: email
      });
    })
    .then(() => {
      alert("Account created successfully!");
      window.location.href = "login.html";
    })
    .catch((error) => {
      alert("Error: " + error.message);
    });
});