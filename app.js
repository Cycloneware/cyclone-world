// Import Firebase configuration and initialize
const firebaseConfig = {
    apiKey: "AIzaSyCiz-65LelRGFWdgl8hHVNb5zzvkY2CGDA",
    authDomain: "cyclone-world-e5120.firebaseapp.com",
    projectId: "cyclone-world-e5120",
    storageBucket: "cyclone-world-e5120.firebasestorage.app",
    messagingSenderId: "671830912000",
    appId: "1:671830912000:web:2b2ad2a9f17746f9e5fce5",
    measurementId: "G-YPHXKY73MP"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

// Switch between login and signup
const loginScreen = document.getElementById('login-screen');
const signupScreen = document.getElementById('signup-screen');
document.getElementById('go-to-signup').addEventListener('click', () => {
    loginScreen.style.display = 'none';
    signupScreen.style.display = 'block';
});
document.getElementById('go-to-login').addEventListener('click', () => {
    signupScreen.style.display = 'none';
    loginScreen.style.display = 'block';
});

// Handle login
document.getElementById('login-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;

    auth.signInWithEmailAndPassword(username + '@cycloneworld.com', password)
        .then(() => {
            alert('Logged in successfully!');
            // Redirect to game or dashboard
        })
        .catch((error) => alert(`Error: ${error.message}`));
});

// Handle sign-up
document.getElementById('signup-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.getElementById('signup-username').value;
    const password = document.getElementById('signup-password').value;

    auth.createUserWithEmailAndPassword(username + '@cycloneworld.com', password)
        .then(() => {
            alert('Account created successfully!');
            // Redirect to login or dashboard
        })
        .catch((error) => alert(`Error: ${error.message}`));
});
