const firebaseConfig = {
  apiKey: "AIzaSyDkXFBIoBp-uPAolLdCUj3fWYmQH8G1yj8",
  authDomain: "studentauthapp-955d6.firebaseapp.com",
  projectId: "studentauthapp-955d6",
  storageBucket: "studentauthapp-955d6.firebasestorage.app",
  messagingSenderId: "647965367704",
  appId: "1:647965367704:web:45594499a12ed86c72dfed"
};

//This is the correct way for compat version (non-module HTML use)
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
