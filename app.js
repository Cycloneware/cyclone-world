// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCiz-65LelRGFWdgl8hHVNb5zzvkY2CGDA",
    authDomain: "cyclone-world-e5120.firebaseapp.com",
    projectId: "cyclone-world-e5120",
    storageBucket: "cyclone-world-e5120.firebaseapp.com",
    messagingSenderId: "671830912000",
    appId: "1:671830912000:web:2b2ad2a9f17746f9e5fce5",
    measurementId: "G-YPHXKY73MP"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Firebase Auth instance
const auth = firebase.auth();

// Login functionality
const loginForm = document.getElementById('login-form');
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;

    auth.signInWithEmailAndPassword(username + "@cycloneworld.com", password)
        .then(() => {
            alert("Login successful!");
            window.location.href = "server-selection.html"; // Redirect to server selection page
        })
        .catch((error) => {
            alert(`Login failed: ${error.message}`);
        });
});

// Sign-up functionality
const signupForm = document.getElementById('signup-form');
signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.getElementById('signup-username').value;
    const password = document.getElementById('signup-password').value;

    auth.createUserWithEmailAndPassword(username + "@cycloneworld.com", password)
        .then(() => {
            alert("Sign-up successful! You can now log in.");
            document.getElementById('signup-screen').style.display = 'none';
            document.getElementById('login-screen').style.display = 'block';
        })
        .catch((error) => {
            alert(`Sign-up failed: ${error.message}`);
        });
});

// Navigation between login and sign-up screens
document.getElementById('go-to-signup').addEventListener('click', (e) => {
    e.preventDefault();
    document.getElementById('login-screen').style.display = 'none';
    document.getElementById('signup-screen').style.display = 'block';
});

document.getElementById('go-to-login').addEventListener('click', (e) => {
    e.preventDefault();
    document.getElementById('signup-screen').style.display = 'none';
    document.getElementById('login-screen').style.display = 'block';
});
