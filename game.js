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

// Check if user is logged in
auth.onAuthStateChanged((user) => {
    if (user) {
        // Display username under avatar
        const usernameDisplay = document.getElementById('username-display');
        const username = user.email.split('@')[0]; // Extract username from email
        usernameDisplay.textContent = username;

        console.log(`${username} has connected to the game.`);
    } else {
        // Redirect to login if no user is logged in
        window.location.href = "index.html";
    }
});

// Log out functionality
const logoutButton = document.getElementById('logout-btn');
logoutButton.addEventListener('click', () => {
    auth.signOut().then(() => {
        alert("You have logged out.");
        window.location.href = "index.html";
    });
});

// Avatar movement logic
const avatarContainer = document.getElementById('user-avatar-container');
const gameArea = document.getElementById('game-area');

// Initial position of the avatar
let avatarPosition = {
    x: gameArea.offsetWidth / 2 - avatarContainer.offsetWidth / 2,
    y: gameArea.offsetHeight / 2 - avatarContainer.offsetHeight / 2
};

// Set the initial position
avatarContainer.style.left = `${avatarPosition.x}px`;
avatarContainer.style.top = `${avatarPosition.y}px`;

// Handle arrow key movement
document.addEventListener('keydown', (event) => {
    const step = 10; // Movement speed

    switch (event.key) {
        case "ArrowUp":
            avatarPosition.y = Math.max(0, avatarPosition.y - step);
            break;
        case "ArrowDown":
            avatarPosition.y = Math.min(
                gameArea.offsetHeight - avatarContainer.offsetHeight,
                avatarPosition.y + step
            );
            break;
        case "ArrowLeft":
            avatarPosition.x = Math.max(0, avatarPosition.x - step);
            break;
        case "ArrowRight":
            avatarPosition.x = Math.min(
                gameArea.offsetWidth - avatarContainer.offsetWidth,
                avatarPosition.x + step
            );
            break;
    }

    // Update avatar position
    avatarContainer.style.left = `${avatarPosition.x}px`;
    avatarContainer.style.top = `${avatarPosition.y}px`;
});
