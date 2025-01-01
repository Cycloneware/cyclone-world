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
        const usernameDisplay = user.email.split('@')[0];
        console.log(`${usernameDisplay} has connected to the game.`);

        startGame(usernameDisplay);
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
