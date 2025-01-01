import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js";

// Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyCiz-65LelRGFWdgl8hHVNb5zzvkY2CGDA",
  authDomain: "cyclone-world-e5120.firebaseapp.com",
  projectId: "cyclone-world-e5120",
  storageBucket: "cyclone-world-e5120.firebasestorage.app",
  messagingSenderId: "671830912000",
  appId: "1:671830912000:web:2b2ad2a9f17746f9e5fce5",
  measurementId: "G-YPHXKY73MP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get the Firebase Auth instance
const auth = getAuth(app);

// Listen for auth state changes (user login/logout)
onAuthStateChanged(auth, (user) => {
  const usernameDisplay = document.getElementById("username-display");

  if (user) {
    // User is signed in
    console.log("User is signed in:", user);
    
    // Ensure the element exists before trying to set textContent
    if (usernameDisplay) {
      usernameDisplay.textContent = user.displayName || user.email;
    }
  } else {
    // No user is signed in
    console.log("No user is signed in");
    window.location.href = "index.html"; // Redirect to login screen if not logged in
  }
});

// Log out functionality
const logoutButton = document.getElementById('logout-btn');
logoutButton.addEventListener('click', () => {
  signOut(auth).then(() => {
    window.location.href = "index.html"; // Redirect to login screen after logging out
  }).catch((error) => {
    console.error("Error logging out:", error);
  });
});

// Game logic
function startGame(username) {
    const canvas = document.getElementById('game-canvas');
    const ctx = canvas.getContext('2d');

    const gameWidth = canvas.width;
    const gameHeight = canvas.height;

    // Avatar settings
    const avatar = {
        x: gameWidth / 2,
        y: gameHeight / 2,
        radius: 25,
        color: 'blue',
        username: username
    };

    // Draw the avatar
    function drawAvatar() {
        // Clear the canvas
        ctx.clearRect(0, 0, gameWidth, gameHeight);

        // Draw the circle
        ctx.beginPath();
        ctx.arc(avatar.x, avatar.y, avatar.radius, 0, Math.PI * 2);
        ctx.fillStyle = avatar.color;
        ctx.fill();
        ctx.closePath();

        // Draw the username
        ctx.font = '16px Arial';
        ctx.fillStyle = 'black';
        ctx.textAlign = 'center';
        ctx.fillText(avatar.username, avatar.x, avatar.y + avatar.radius + 20);
    }

    // Update avatar position
    function moveAvatar(direction) {
        const step = 10;

        switch (direction) {
            case 'up':
                if (avatar.y - avatar.radius - step >= 0) avatar.y -= step;
                break;
            case 'down':
                if (avatar.y + avatar.radius + step <= gameHeight) avatar.y += step;
                break;
            case 'left':
                if (avatar.x - avatar.radius - step >= 0) avatar.x -= step;
                break;
            case 'right':
                if (avatar.x + avatar.radius + step <= gameWidth) avatar.x += step;
                break;
        }
        drawAvatar();
    }

    // Listen for keyboard input
    document.addEventListener('keydown', (event) => {
        switch (event.key) {
            case 'ArrowUp':
                moveAvatar('up');
                break;
            case 'ArrowDown':
                moveAvatar('down');
                break;
            case 'ArrowLeft':
                moveAvatar('left');
                break;
            case 'ArrowRight':
                moveAvatar('right');
                break;
        }
    });

    // Initial draw
    drawAvatar();
}
